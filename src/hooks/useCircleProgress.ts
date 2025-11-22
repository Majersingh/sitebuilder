"use client";

import { useEffect, useState } from "react";

export default function useCircleProgress(pipelineId: string | null) {
    const [loading, setLoading] = useState(true);
    const [workflow, setWorkflow] = useState<any>(null);
    const [jobs, setJobs] = useState<any[]>([]);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0); // forces re-render on every poll

    useEffect(() => {
        if (!pipelineId) return;

        let interval: any;

        const fetchStatus = async () => {
            try {
                const res = await fetch(
                    `/api/circleci/status?pipelineId=${pipelineId}`,
                    { cache: "no-store" }
                );

                const data = await res.json();
                console.log("[CI STATUS]", data);

                if (!data.success) {
                    setError(data.error || "Error fetching CI status");
                    return;
                }

                // FORCE RE-RENDER even if output is same (react optimization fix)
                setTick((t) => t + 1);

                // Clone objects to break shallow equality (important!)
                setWorkflow({ ...data.workflow });
                setJobs(JSON.parse(JSON.stringify(data.jobs)));

                const status = data.workflow?.status;

                if (["success", "failed", "canceled", "error"].includes(status)) {
                    setCompleted(true);
                    clearInterval(interval);
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Network error");
            }
        };

        fetchStatus();
        interval = setInterval(fetchStatus, 2500);

        return () => clearInterval(interval);
    }, [pipelineId]);

    // tick is exposed so UI updates every poll
    return { workflow, jobs, loading, completed, error, tick };
}
