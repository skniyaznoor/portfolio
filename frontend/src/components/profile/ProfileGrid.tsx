"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Grid, Bookmark, UserSquare, Layers, Loader2 } from 'lucide-react';
import { projects, explorePosts, stories } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

type Tab = 'posts' | 'projects' | 'techstack';

export default function ProfileGrid() {
    const [activeTab, setActiveTab] = useState<Tab>('projects');
    const [visibleTechStackCount, setVisibleTechStackCount] = useState(9);
    const [visibleProjectCount, setVisibleProjectCount] = useState(9);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [activeTab, visibleProjectCount, visibleTechStackCount]);

    const handleLoadMore = () => {
        if (isLoading) return;

        if (activeTab === 'projects' && visibleProjectCount < projects.length) {
            setIsLoading(true);
            setTimeout(() => {
                setVisibleProjectCount(prev => prev + 6);
                setIsLoading(false);
            }, 500);
        } else if (activeTab === 'techstack' && visibleTechStackCount < stories.length) {
            setIsLoading(true);
            setTimeout(() => {
                setVisibleTechStackCount(prev => prev + 6);
                setIsLoading(false);
            }, 500);
        }
    };

    const hasMore = activeTab === 'projects'
        ? visibleProjectCount < projects.length
        : visibleTechStackCount < stories.length;

    return (
        <div className="max-w-[935px] mx-auto px-4">
            {/* Tabs */}
            <div className="border-t border-[var(--border)] mt-10 mb-4">
                <div className="flex justify-center gap-12 text-xs font-semibold tracking-widest text-[var(--secondary)]">
                    {/* <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex items-center gap-2 py-4 border-t -mt-px transition-colors ${activeTab === 'posts'
                            ? "border-[var(--foreground)] text-[var(--foreground)]"
                            : "border-transparent hover:text-[var(--foreground)]"
                            }`}
                    >
                        <Grid className="w-3 h-3" />
                        POSTS
                    </button> */}
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 py-4 border-t -mt-px transition-colors ${activeTab === 'projects'
                            ? "border-[var(--foreground)] text-[var(--foreground)]"
                            : "border-transparent hover:text-[var(--foreground)]"
                            }`}
                    >
                        <Bookmark className="w-3 h-3" />
                        PROJECTS
                    </button>
                    <button
                        onClick={() => setActiveTab('techstack')}
                        className={`flex items-center gap-2 py-4 border-t -mt-px transition-colors ${activeTab === 'techstack'
                            ? "border-[var(--foreground)] text-[var(--foreground)]"
                            : "border-transparent hover:text-[var(--foreground)]"
                            }`}
                    >
                        <Layers className="w-3 h-3" />
                        TECHSTACK
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-4 pb-20">
                {/* {activeTab === 'posts' && explorePosts.map((post) => (
                    <div key={post.id} className="relative aspect-square group cursor-pointer bg-[var(--card)]">
                        <Image
                            src={post.image}
                            alt="Post"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                            <div className="flex items-center gap-2">
                                <Heart className="w-6 h-6 fill-white" />
                                <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-6 h-6 fill-white" />
                                <span>{post.comments}</span>
                            </div>
                        </div>
                    </div>
                ))} */}

                {activeTab === 'projects' && (
                    <div className="col-span-3">
                        <div className="grid grid-cols-3 gap-1 md:gap-4">
                            {projects.slice(0, visibleProjectCount).map((project) => (
                                <div
                                    key={project.id}
                                    className="relative aspect-square group cursor-pointer bg-[var(--card)]"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                                        <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                                        <p className="text-xs text-gray-300 mb-2">{project.type}</p>
                                        {/* <div className="flex gap-2 text-sm">
                                            <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-white" /> {project.likes}</span>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'techstack' && (
                    <div className="col-span-3">
                        <div className="grid grid-cols-3 gap-1 md:gap-4">
                            {stories.slice(0, visibleTechStackCount).map((tech) => (
                                <div key={tech.id} className="relative aspect-square group cursor-pointer bg-[var(--card)] flex flex-col items-center justify-center p-4 border border-[var(--border)]">
                                    <div className="relative w-16 h-16 md:w-24 md:h-24 mb-4">
                                        <img
                                            src={tech.image}
                                            alt={tech.label}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="font-semibold text-[var(--foreground)]">{tech.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Infinite Scroll Sentinel */}
            {hasMore && (
                <div
                    ref={loadMoreRef}
                    className="h-20 flex items-center justify-center mb-10"
                >
                    {isLoading && (
                        <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
                    )}
                </div>
            )}

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}


