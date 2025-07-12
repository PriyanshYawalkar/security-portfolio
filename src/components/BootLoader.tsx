"use client";

import { useEffect, useState } from "react";

const bootLines = [
    "[  OK  ] Mounted /boot",
    "[  OK  ] Started Network Manager",
    "[  OK  ] Reached target Graphical Interface",
    "[  OK  ] Started User Login Management",
    "[  OK  ] Started Hostname Service",
    "[  OK  ] Mounted /home",
    "[ WARN ] Firewall bypassed",
    "[  OK  ] Started System Logging Service",
    "[ERROR] Unauthorized access detected... ignoring.",
    "[  OK  ] Started Authorization Manager",
    "[  OK  ] Decrypting root password...",
    "[  OK  ] Access granted.",
    "[  OK  ] Starting Priyansh Portfolio...",
    "[  OK  ] fsociety:// loaded successfully.",
    "[  OK  ] Welcome back, hacker.",
    "   ____                 _           _ _   ",
    "  / ___| ___   ___   __| | ___  ___(_) |_ ",
    " | |  _ / _ \\ / _ \\ / _` |/ _ \\/ __| | __|",
    " | |_| | (_) | (_) | (_| |  __/ (__| | |_ ",
    "  \\____|\\___/ \\___/ \\__,_|\\___|\\___|_|\\__|",
    "         Welcome to the terminal     ",
];

function getRandomDelay() {
    return 80 + Math.random() * 100; // much faster
}

export default function BootLoader({ onFinish }: { onFinish: () => void }) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (lineIndex >= bootLines.length) {
            setTimeout(() => {
                setDone(true);
                onFinish();
            }, 400); // faster finish
            return;
        }
        if (charIndex < bootLines[lineIndex].length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + bootLines[lineIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 3 + Math.random() * 7); // much faster per char
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setVisibleLines((prev) => [...prev, bootLines[lineIndex]]);
                setCurrentLine("");
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, getRandomDelay());
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex]);

    if (done) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black text-green-500 font-mono text-sm px-6 py-8"
            style={{ boxShadow: "inset 0 0 80px #00ff0033" }}>
            {visibleLines.map((line, idx) => (
                <div key={idx} className="animate-pulse">{line}</div>
            ))}
            {currentLine && <div className="animate-pulse">{currentLine}<span className="animate-ping">_</span></div>}
            {!currentLine && <div className="animate-ping text-green-600 mt-4">_</div>}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 3px, #00ff0011 4px, transparent 6px)"
            }} />
        </div>
    );
}
