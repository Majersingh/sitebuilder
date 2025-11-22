"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingTextProps {
    sequence: (string | number)[];
    className?: string;
    repeat?: number;
}

export default function TypingText({
    sequence,
    className = "",
    repeat = Infinity
}: TypingTextProps) {
    return (
        <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={50}
            className={className}
            repeat={repeat}
        />
    );
}
