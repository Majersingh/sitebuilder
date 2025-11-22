"use client";

import { useEffect, useState } from "react";

export default function useCircleProgress(pipelineId: string | null) {
    const [loading, setLoading] = useState(true);
    const [workflow, setWorkflow] = useState<any>(null);
    const [jobs, setJobs] = useState<any[]>([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (!pipelineId) return;

        const interval = setInterval(async () => {
            const res = await fetch(`/api/circleci/status?pipelineId=${pipelineId}`);
            const data = await res.json();
            console.log(data)

            if (data.success) {
                setWorkflow(data.workflow);
                setJobs(data.jobs);

                if (data.workflow.status === "success" || data.workflow.status === "failed") {
                    setCompleted(true);
                    clearInterval(interval);
                }
            }
            setLoading(false);
        }, 5000);

        return () => clearInterval(interval);
    }, [pipelineId]);

    return { workflow, jobs, loading, completed };
}
