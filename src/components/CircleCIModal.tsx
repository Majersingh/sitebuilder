"use client";

import useCircleProgress from "../hooks/useCircleProgress";
import useTerminalLogs from "../hooks/useTerminalLogs";
import { useState } from "react";

let deploymentUrls: string | null = null;
export default function CircleCIModal({
    pipelineId,
    onClose,
}: {
    pipelineId: string;
    onClose: () => void;
}) {
    const { workflow, jobs, loading, completed, error } = useCircleProgress(pipelineId);
    const { logs, terminalRef } = useTerminalLogs(jobs);

    const stateColor = (status: string) => {
        if (!status) return "text-gray-300";
        if (status === "running") return "text-yellow-400";
        if (status === "success") return "text-green-400";
        if (status === "failed") return "text-red-400";
        if (status === "canceled") return "text-gray-500";
        return "text-gray-300";
    };

    if (!pipelineId) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-[#0d0d0d] text-green-400 rounded-xl p-5 w-[850px] max-h-[85vh] overflow-auto font-mono border border-green-700/40 shadow-xl">
                <h2 className="text-lg mb-4">
                    ⚙️ CI Deployment — Pipeline: <span className="text-yellow-300">{pipelineId}</span>
                </h2>

                {error && (
                    <div className="p-3 bg-red-900/30 text-red-300 rounded mb-4">
                        ❌ {error}
                    </div>
                )}

                {/* Workflow info */}
                {workflow && (
                    <div className="mb-4">
                        <p>
                            Status:{" "}
                            <span className={stateColor(workflow.status)}>{workflow.status}</span>
                        </p>
                        <p>Started: {workflow.created_at}</p>
                    </div>
                )}

                {/* Jobs + step status */}
                <div className="mb-4">
                    <p className="text-yellow-300 underline mb-2">Jobs:</p>

                    {jobs.map((job) => (
                        <div key={job.id} className="mb-3">
                            <p className="flex items-center gap-2">
                                <span className={stateColor(job.status)}>●</span>
                                {job.name} — {job.status}
                            </p>

                            {/* Show step names */}
                            {job.steps?.items && (
                                <div className="ml-5">
                                    {job.steps.items.map((step: any, i: number) => (
                                        <div key={i} className="text-sm text-blue-300">
                                            → {step.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Terminal Output */}
                <p className="text-yellow-300 underline mb-2">Live Logs:</p>

                <div
                    ref={terminalRef}
                    className="bg-black/70 border border-green-700/50 rounded p-3 h-[280px] overflow-auto text-sm"
                >
                    {logs.length === 0 && (
                        <p className="text-gray-400 italic">Waiting for logs...</p>
                    )}

                    {logs.map((line, idx) => {
                        console.log(extractNetlifyUrls(line))
                        deploymentUrls = extractNetlifyUrls(line).productionUrl
                        return (
                            <div key={idx} className="whitespace-pre-wrap">
                                {line.includes("error") || line.includes("ERROR") ? (
                                    <span className="text-red-400">{line}</span>
                                ) : (

                                    <span className="text-green-300">{line}</span>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Completed message */}
                {completed && (
                    <div className="mt-4 p-3 bg-green-900/20 text-green-300 border border-green-700 rounded">
                        🎉 Deployment Status — {workflow?.status.toUpperCase()}
                        {deploymentUrls && <>Link :<a className="text-blue-400" href={deploymentUrls} target="_blank" rel="noopener noreferrer">{deploymentUrls}</a></>}
                    </div>
                )}

                <button
                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

function extractNetlifyUrls(fullLogs: string) {
    const prodUrlMatch = fullLogs.match(/Deployed to production URL:\s+(https:\/\/[^\s]+)/i);
    const uniqueUrlMatch = fullLogs.match(/Unique deploy URL:\s+(https:\/\/[^\s]+)/i);

    return {
        productionUrl: prodUrlMatch ? prodUrlMatch[1].trim() : null,
        uniqueUrl: uniqueUrlMatch ? uniqueUrlMatch[1].trim() : null,
    };
}
