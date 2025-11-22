"use client";

import { useEffect, useRef, useState } from "react";

export default function useTerminalLogs(jobs: any[]) {
    const [logs, setLogs] = useState<string[]>([]);
    const terminalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const newLogs: string[] = [];

        jobs.forEach((job) => {
            if (!job.fullLogs) return;

            const lines = job.fullLogs.split("\n");

            lines.forEach((line: string) => {
                if (line.trim() !== "") newLogs.push(line);
            });
        });

        setLogs(newLogs);
    }, [jobs]);

    // Auto-scroll
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return { logs, terminalRef };
}
