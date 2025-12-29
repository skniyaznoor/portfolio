"use client";

import React from 'react';
import Image from 'next/image';
import { X, Heart, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
    project: {
        id: number;
        title: string;
        type: string;
        description: string;
        fullDescription?: string;
        image: string;
        tags: string[];
        likes: number;
        comments: number;
        date: string;
        link?: string;
    } | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white hover:opacity-70 z-50">
                <X className="w-8 h-8" />
            </button>

            <div
                className="bg-[var(--background)] w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section - Left Side */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative bg-black">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                    <div className="absolute bottom-4 left-4 text-white md:hidden">
                        <h2 className="text-2xl font-bold">{project.title}</h2>
                        <p className="text-sm opacity-90">{project.type}</p>
                    </div>
                </div>

                {/* Content Section - Right Side */}
                <div className="w-full md:w-1/2 h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-[var(--border)] hidden md:block">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--foreground)]">{project.title}</h2>
                                <p className="text-[var(--secondary)] font-medium">{project.type}</p>
                            </div>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    View Project
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Scrollable Details */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-[var(--card)] border border-[var(--border)] rounded-full text-xs font-semibold text-[var(--secondary)] flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="prose prose-base dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--foreground)] 
                            prose-p:text-[var(--secondary)] prose-p:leading-relaxed 
                            prose-li:text-[var(--secondary)] 
                            prose-strong:text-[var(--foreground)] prose-strong:font-bold
                            prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline">
                            <ReactMarkdown>
                                {project.fullDescription || project.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
