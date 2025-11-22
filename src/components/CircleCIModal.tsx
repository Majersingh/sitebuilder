"use client";

import useCircleProgress from "../hooks/useCircleProgress";

export default function CircleCIModal({ pipelineId, onClose }: { pipelineId: string; onClose: () => void }) {
    const { workflow, jobs, loading, completed } = useCircleProgress(pipelineId);

    if (!pipelineId) return null;

    const stateColor = (status: string) => {
        if (status === "running") return "text-yellow-400";
        if (status === "success") return "text-green-400";
        if (status === "failed") return "text-red-400";
        return "text-gray-400";
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-black text-green-400 rounded-xl p-4 w-[600px] max-h-[80vh] overflow-auto font-mono">
                <h2 className="text-lg mb-2">
                    🚀 Deploying Site (Workflow #{workflow?.pipeline_number})
                </h2>

                {loading && <p>Loading workflow…</p>}

                {!loading && (
                    <div>
                        <div className="mb-4">
                            <p>Status: <span className={stateColor(workflow?.status)}>{workflow?.status}</span></p>
                            <p>Started: {workflow?.created_at}</p>
                        </div>

                        <p className="text-yellow-300 underline mb-2">Steps:</p>

                        {jobs.map((job) => (
                            <div key={job.id} className="mb-2">
                                <span className={stateColor(job.status)}>●</span> {job.name} — {job.status}
                            </div>
                        ))}

                        {completed && (
                            <div className="mt-4 p-3 rounded-lg bg-green-700/30 text-green-200">
                                🎉 Deployment Completed Successfully!
                            </div>
                        )}

                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
