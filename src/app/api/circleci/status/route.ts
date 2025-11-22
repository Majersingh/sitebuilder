import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const pipelineId = req.nextUrl.searchParams.get("pipelineId");
    const CIRCLECI_TOKEN = process.env.CIRCLECI_TOKEN!;

    if (!pipelineId) {
        return NextResponse.json({ success: false, error: "Missing pipelineId" });
    }

    // 1️⃣ Get workflows for this pipeline (because workflowId != pipelineId)
    const workflowListRes = await fetch(
        `https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`,
        {
            headers: { "Circle-Token": CIRCLECI_TOKEN }
        }
    );

    const workflowList = await workflowListRes.json();

    if (!workflowList.items || workflowList.items.length === 0) {
        return NextResponse.json({
            success: false,
            error: "No workflows found for this pipeline",
        });
    }

    // Always take first workflow (CircleCI usually has only one)
    const workflowId = workflowList.items[0].id;

    // 2️⃣ Get workflow details
    const workflowRes = await fetch(
        `https://circleci.com/api/v2/workflow/${workflowId}`,
        {
            headers: { "Circle-Token": CIRCLECI_TOKEN }
        }
    );

    const workflow = await workflowRes.json();

    // 3️⃣ Get jobs inside workflow
    const jobsRes = await fetch(
        `https://circleci.com/api/v2/workflow/${workflowId}/job`,
        {
            headers: { "Circle-Token": CIRCLECI_TOKEN }
        }
    );

    const jobs = await jobsRes.json();

    return NextResponse.json({
        success: true,
        pipelineId,
        workflowId,
        workflow,
        jobs: jobs.items || [],
    });
}
