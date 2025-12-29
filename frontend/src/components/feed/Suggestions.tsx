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
                    <img src={profile.avatar} alt={profile.username} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-semibold text-sm">{profile.username}</p>
                        <p className="text-[#a8a8a8] text-sm">{profile.name}</p>
                    </div>
                </div>
                <button className="text-[#0095f6] text-xs font-semibold hover:text-white transition-colors">Switch</button>
            </div>

            {/* Suggestions Header */}
            <div className="flex items-center justify-between">
                <p className="text-[#a8a8a8] font-semibold text-sm">Suggested for you</p>
                <button className="text-white text-xs font-semibold hover:text-[#a8a8a8] transition-colors">See All</button>
            </div>

            {/* Suggestions List */}
            <div className="space-y-4">
                {suggestions.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full bg-[#1a1a1a] p-1" />
                            <div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-[#a8a8a8] text-xs">{item.role}</p>
                            </div>
                        </div>
                        <button className="text-[#0095f6] text-xs font-semibold hover:text-white transition-colors">Follow</button>
                    </div>
                ))}
            </div>

            {/* Footer Links */}
            <div className="text-[#737373] text-xs space-y-4">
                <p className="flex flex-wrap gap-x-2">
                    <span>About</span><span>Help</span><span>Press</span><span>API</span><span>Jobs</span><span>Privacy</span><span>Terms</span>
                </p>
                <p>© 2025 PORTFOLIO FROM NIYAZ</p>
            </div>
        </div>
    );
}
