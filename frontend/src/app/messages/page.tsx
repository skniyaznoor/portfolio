"use client";

import Navigation from '@/components/layout/Navigation';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function Page() {
    return (
        <main className="flex min-h-screen bg-[var(--background)]">
            <Navigation />

            <div className="flex-1 xl:ml-64 ml-20 flex items-center justify-center p-4">
                <div className="relative flex flex-col items-center max-w-md text-center">

                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-[var(--accent)] blur-3xl opacity-20 animate-pulse rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-[var(--accent)]/30 rounded-full animate-ping [animation-duration:3s]"></div>
                        <div className="absolute inset-0 border border-[var(--accent)]/50 rounded-full animate-ping [animation-duration:5s] [animation-delay:1s]"></div>

                        <div className="relative w-32 h-32 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center shadow-2xl">
                            <MessageSquare className="w-12 h-12 text-[var(--accent)]" />

                            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-500 animate-bounce" />
                        </div>
                    </div>

                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Messages
                        </h1>
                        <p className="text-lg text-[var(--secondary)] font-medium max-w-[280px] mx-auto leading-relaxed">
                            This feature will be <span className="text-[var(--accent)]">up soon</span>
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--secondary)]/60">
                            Development In Progress
                        </span>
                    </div>

                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full -z-10"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
                </div>
            </div>
        </main>
    );
}
