import { NextRequest, NextResponse } from "next/server";

const SLUGS = [
    "gh/Majersingh/staticwebsitegenerator",
    "github/Majersingh/staticwebsitegenerator",
];

async function tryFetch(url: string, token: string) {
    try {
        const res = await fetch(url, {
            headers: {
                "Circle-Token": token,
                "Accept": "application/json"
            }
        });
        if (!res.ok) {
            console.log(`Failed: ${url} - Status: ${res.status}`);
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error(`Error: ${url}`, error);
        return null;
    }
}

async function fetchLogOutput(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) return "";
        return await res.text();
    } catch {
        return "";
    }
}

export async function GET(req: NextRequest) {
    const pipelineId = req.nextUrl.searchParams.get("pipelineId");
    const token = process.env.CIRCLECI_TOKEN;

    if (!pipelineId || !token) {
        return NextResponse.json({
            success: false,
            error: "Missing pipelineId or CIRCLECI_TOKEN"
        });
    }

    // 1️⃣ GET WORKFLOW
    const workflowList = await tryFetch(
        `https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`,
        token
    );

    if (!workflowList?.items?.length) {
        return NextResponse.json({
            success: false,
            error: "No workflow found"
        });
    }

    const workflow = workflowList.items[0];
    const workflowId = workflow.id;

    // 2️⃣ GET JOBS
    const jobsData = await tryFetch(
        `https://circleci.com/api/v2/workflow/${workflowId}/job`,
        token
    );

    if (!jobsData?.items?.length) {
        return NextResponse.json({
            success: false,
            error: "No jobs found"
        });
    }

    // 3️⃣ FETCH LOGS FOR EACH JOB USING V1.1 API
    const processedJobs = await Promise.all(
        jobsData.items.map(async (job: any) => {
            const jobWithLogs: any = {
                ...job,
                steps: [],
                fullLogs: "",
                stepDetails: [],
                fetchStatus: "pending",
            };

            if (job.status === "not_run" || job.status === "queued") {
                jobWithLogs.fetchStatus = "not_started";
                return jobWithLogs;
            }

            for (const slug of SLUGS) {
                const v1JobUrl = `https://circleci.com/api/v1.1/project/${slug}/${job.job_number}`;
                console.log(`Fetching v1.1 job data: ${v1JobUrl}`);

                const v1JobData = await tryFetch(v1JobUrl, token);

                if (!v1JobData || !v1JobData.steps) {
                    console.log(`No v1.1 data for ${slug}`);
                    continue;
                }

                jobWithLogs.steps = v1JobData.steps;
                let fullLogsText = "";
                const stepDetailsArray = [];

                for (const step of v1JobData.steps) {
                    const stepDetail: any = {
                        name: step.name,
                        status: step.status,
                        actions: [],
                        logs: "",
                    };

                    if (!step.actions?.length) continue;

                    for (const action of step.actions) {
                        const actionDetail: any = {
                            name: action.name,
                            status: action.status,
                            type: action.type,
                            output: "",
                        };

                        if (action.output_url) {
                            console.log(`Fetching logs from: ${action.output_url}`);
                            const logText = await fetchLogOutput(action.output_url);
                            actionDetail.output = logText;
                            stepDetail.logs += logText;
                            fullLogsText += logText;
                        } else if (action.status === "running") {
                            actionDetail.output = "[Step still running...]";
                        }

                        stepDetail.actions.push(actionDetail);
                    }

                    stepDetailsArray.push(stepDetail);
                }

                jobWithLogs.fullLogs = fullLogsText;
                jobWithLogs.stepDetails = stepDetailsArray;
                jobWithLogs.fetchStatus = "success";

                break;
            }

            if (jobWithLogs.fetchStatus === "pending") {
                jobWithLogs.fetchStatus = "failed";
            }

            return jobWithLogs;
        })
    );

    return NextResponse.json({
        success: true,
        pipelineId,
        workflowId,
        workflow: {
            id: workflow.id,
            name: workflow.name,
            status: workflow.status,
            created_at: workflow.created_at,
            stopped_at: workflow.stopped_at,
        },
        jobs: processedJobs,
    });
}
