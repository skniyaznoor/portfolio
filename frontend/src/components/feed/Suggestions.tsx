"use client";

import React from 'react';
import { profile } from '@/data/portfolio';

const suggestions = [
    { name: 'React.js', role: 'Frontend Framework', image: 'https://api.dicebear.com/7.x/icons/svg?seed=react' },
    { name: 'Next.js', role: 'Fullstack Framework', image: 'https://api.dicebear.com/7.x/icons/svg?seed=nextjs' },
    { name: 'Tailwind CSS', role: 'Styling', image: 'https://api.dicebear.com/7.x/icons/svg?seed=tailwind' },
    { name: 'Laravel', role: 'Backend Framework', image: 'https://api.dicebear.com/7.x/icons/svg?seed=laravel' },
];

export default function Suggestions() {
    return (
        <div className="hidden lg:block w-80 p-8 space-y-6">
            {/* User Profile */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={`/${profile.avatar}`} alt={profile.username} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <p className="font-semibold text-sm text-[var(--foreground)]">{profile.username}</p>
                        <p className="text-[var(--secondary)] text-sm">{profile.name}</p>
                    </div>
                </div>
                <button className="text-[var(--accent)] text-xs font-semibold hover:text-[var(--foreground)] transition-colors">Switch</button>
            </div>

            {/* Suggestions Header */}
            <div className="flex items-center justify-between">
                <p className="text-[var(--secondary)] font-semibold text-sm">Suggested for you</p>
                <button className="text-[var(--foreground)] text-xs font-semibold hover:text-[var(--secondary)] transition-colors">See All</button>
            </div>

            {/* Suggestions List */}
            <div className="space-y-4">
                {suggestions.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full bg-[var(--card)] p-1" />
                            <div>
                                <p className="font-semibold text-sm text-[var(--foreground)]">{item.name}</p>
                                <p className="text-[var(--secondary)] text-xs">{item.role}</p>
                            </div>
                        </div>
                        <button className="text-[var(--accent)] text-xs font-semibold hover:text-[var(--foreground)] transition-colors">Follow</button>
                    </div>
                ))}
            </div>

            {/* Footer Links */}
            <div className="text-[var(--secondary)] text-xs space-y-4">
                <p className="flex flex-wrap gap-x-2">
                    <span>About</span><span>Help</span><span>Press</span><span>API</span><span>Jobs</span><span>Privacy</span><span>Terms</span>
                </p>
                <p>© 2025 PORTFOLIO FROM NIYAZ</p>
            </div>
        </div>
    );
}
