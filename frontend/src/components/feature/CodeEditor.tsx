'use client';

import React, { useState, useEffect } from 'react';
import { Code2, FileCode, GitBranch, Package } from 'lucide-react';

interface CodeFile {
    id: number;
    name: string;
    lines: string[];
    icon: 'code' | 'file' | 'git' | 'package';
    language: string;
    delay: number;
}

interface CodeEditorProps {
    files?: CodeFile[];
    title?: string;
}

export default function CodeEditor({
    files,
    title = 'Code Preview'
}: CodeEditorProps) {
    const defaultFiles: CodeFile[] = [
        {
            id: 1,
            name: 'App.tsx',
            icon: 'code',
            language: 'typescript',
            delay: 0,
            lines: [
                'import React from "react";',
                'import { Header } from "./components";',
                '',
                'export default function App() {',
                '  return (',
                '    <div className="app">',
                '      <Header title="Portfolio" />',
                '    </div>',
                '  );',
                '}',
            ],
        },
        {
            id: 2,
            name: 'api.ts',
            icon: 'file',
            language: 'typescript',
            delay: 8000,
            lines: [
                'export async function fetchData() {',
                '  const response = await fetch("/api");',
                '  return response.json();',
                '}',
                '',
                'export const config = {',
                '  baseURL: process.env.API_URL,',
                '};',
            ],
        },
        {
            id: 3,
            name: 'package.json',
            icon: 'package',
            language: 'json',
            delay: 16000,
            lines: [
                '{',
                '  "name": "portfolio",',
                '  "version": "1.0.0",',
                '  "dependencies": {',
                '    "react": "^18.0.0",',
                '    "next": "^14.0.0"',
                '  }',
                '}',
            ],
        },
    ];

    const fileList = files || defaultFiles;
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const getIcon = (iconName: string) => {
        const iconProps = { className: 'w-4 h-4' };
        switch (iconName) {
            case 'code': return <Code2 {...iconProps} />;
            case 'file': return <FileCode {...iconProps} />;
            case 'git': return <GitBranch {...iconProps} />;
            case 'package': return <Package {...iconProps} />;
            default: return <Code2 {...iconProps} />;
        }
    };

    useEffect(() => {
        const activeFile = fileList[activeFileIndex];
        const lines = activeFile.lines;

        if (lineIndex < lines.length) {
            const line = lines[lineIndex];

            if (charIndex < line.length) {
                const timeout = setTimeout(() => {
                    setCurrentLine(prev => prev + line[charIndex]);
                    setCharIndex(charIndex + 1);
                }, 30);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setDisplayedLines(prev => [...prev, currentLine]);
                    setCurrentLine('');
                    setCharIndex(0);
                    setLineIndex(lineIndex + 1);
                }, 200);
                return () => clearTimeout(timeout);
            }
        } else {
            const timeout = setTimeout(() => {
                const nextIndex = (activeFileIndex + 1) % fileList.length;
                setActiveFileIndex(nextIndex);
                setDisplayedLines([]);
                setCurrentLine('');
                setLineIndex(0);
                setCharIndex(0);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex, activeFileIndex]);

    const activeFile = fileList[activeFileIndex];

    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-800">
            {/* Editor Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex items-center gap-2 ml-4">
                    {fileList.map((file, index) => (
                        <div
                            key={file.id}
                            className={`flex items-center gap-2 px-3 py-1 rounded-t text-xs transition-all ${index === activeFileIndex
                                ? 'bg-[#1e1e1e] text-white'
                                : 'bg-[#2d2d2d] text-gray-500'
                                }`}
                        >
                            <span className="text-blue-400">{getIcon(file.icon)}</span>
                            <span>{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
                <div className="space-y-1">
                    {displayedLines.map((line, index) => (
                        <div key={index} className="flex">
                            <span className="text-gray-600 select-none mr-4 text-right w-8">
                                {index + 1}
                            </span>
                            <pre className="text-gray-300 whitespace-pre-wrap">
                                {highlightLine(line)}
                            </pre>
                        </div>
                    ))}
                    {currentLine && (
                        <div className="flex">
                            <span className="text-gray-600 select-none mr-4 text-right w-8">
                                {displayedLines.length + 1}
                            </span>
                            <pre className="text-gray-300 whitespace-pre-wrap">
                                {highlightLine(currentLine)}
                                <span className="animate-pulse text-white">▌</span>
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-4">
                    <span>✓ {activeFile.language}</span>
                    <span>Ln {displayedLines.length + 1}</span>
                </div>
                <span className="text-white/80">{title}</span>
            </div>
        </div>
    );
}

function highlightLine(line: string) {
    const keywords = /\b(import|export|from|const|let|var|function|return|async|await|if|else)\b/g;
    const types = /\b(React|fetch|process|env)\b/g;
    const strings = /"([^"]*)"/g;
    const numbers = /\b(\d+)\b/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    const matches: Array<{ index: number; length: number; type: string; text: string }> = [];

    // Collect all matches
    while ((match = keywords.exec(line)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'keyword', text: match[0] });
    }
    keywords.lastIndex = 0;

    while ((match = types.exec(line)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'type', text: match[0] });
    }
    types.lastIndex = 0;

    while ((match = strings.exec(line)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'string', text: match[0] });
    }
    strings.lastIndex = 0;

    while ((match = numbers.exec(line)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'number', text: match[0] });
    }

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Build parts array
    matches.forEach((m, i) => {
        if (m.index > lastIndex) {
            parts.push(<span key={`text-${i}`}>{line.slice(lastIndex, m.index)}</span>);
        }

        const style =
            m.type === 'keyword' ? { color: '#c586c0' } :
                m.type === 'type' ? { color: '#4ec9b0' } :
                    m.type === 'string' ? { color: '#ce9178' } :
                        m.type === 'number' ? { color: '#b5cea8' } : {};

        parts.push(<span key={`${m.type}-${i}`} style={style}>{m.text}</span>);
        lastIndex = m.index + m.length;
    });

    if (lastIndex < line.length) {
        parts.push(<span key="text-end">{line.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : line;
}
