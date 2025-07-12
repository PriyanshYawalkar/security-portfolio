"use client";

import { useEffect, useRef, useState } from "react";

const commands: Record<string, string | string[]> = {
    help: [
        "Available commands:",
        "whoami        → Show your identity",
        "skills        → List of skills",
        "projects      → Projects you've built",
        "certs         → Your certifications",
        "contact       → Contact details",
        "clear         → Clear the terminal",
    ],
    whoami: "Security Researcher | Red Team | CTF Enthusiast | Bug Bounty Hunter",
    skills: [
        "- Web App Security",
        "- Network Pentesting",
        "- OWASP Top 10",
        "- Burp Suite, Nmap, Wireshark",
        "- Python, Bash, JavaScript",
    ],
    projects: [
        "- ZeroTrace [github.com/priyanshyawalkar/zerotrace]",
        "- NmapX [github.com/priyanshyawalkar/nmapx]",
        "- Resume Analyzer [github.com/priyanshyawalkar/resume-analyzer]",
    ],
    certs: [
        "- CEH",
        "- eJPT (INE)",
    ],
    contact: [
        "Email   → yawalkarpriyansh@gmail.com",
        "GitHub  → github.com/priyanshyawalkar",
        "Twitter → @priyansh",
    ],
};

const projectDescriptions: Record<string, string> = {
    zerotrace: "ZeroTrace is a CTF created in one day for the GDG.",
    nmapx: "NmapX is an advanced network scanner with a user-friendly interface.",
    ResumeAnalyzer: "Resume Analyzer helps you analyze and improve your resume using AI.",
};

export default function Terminal() {
    const [lines, setLines] = useState<string[]>(["Type 'help' to get started."]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const terminalRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        const command = cmd.trim().toLowerCase();

        if (command === "clear") {
            setLines([]);
            return;
        }

        if (command.startsWith("cat ")) {
            const project = command.slice(4).trim();
            if (projectDescriptions[project]) {
                setLines((prev) => [...prev, `$ ${command}`, projectDescriptions[project]]);
            } else {
                setLines((prev) => [...prev, `$ ${command}`, "Project not found."]);
            }
            return;
        }

        // Support 'cd <section>' commands
        if (command.startsWith("cd ")) {
            const section = command.slice(3).trim();
            if (commands[section]) {
                const output = commands[section];
                if (Array.isArray(output)) {
                    setLines((prev) => [...prev, `$ ${command}`, ...output]);
                } else {
                    setLines((prev) => [...prev, `$ ${command}`, output]);
                }
            } else {
                setLines((prev) => [...prev, `$ ${command}`, "Section not found. Type 'help'."]);
            }
            return;
        }

        const output = commands[command];

        if (!output) {
            setLines((prev) => [...prev, `$ ${command}`, "Command not found. Type 'help'."]);
        } else if (Array.isArray(output)) {
            setLines((prev) => [...prev, `$ ${command}`, ...output]);
        } else {
            setLines((prev) => [...prev, `$ ${command}`, output]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setHistory((prev) => [...prev, input]);
            setHistoryIndex(-1);
            handleCommand(input);
            setInput("");
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = Math.max(0, historyIndex === -1 ? history.length - 1 : historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1 && historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    useEffect(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [lines]);

    return (
        <div
            className="h-full w-full overflow-y-auto px-4 py-2 text-sm"
            ref={terminalRef}
        >
            {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
            ))}

            <div className="flex">
                <span className="text-green-400">root@portfolio:~$</span>
                <input
                    className="bg-transparent text-green-300 ml-2 outline-none w-full"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
