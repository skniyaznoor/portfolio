"use client";

import React from 'react';
import { stories } from '@/data/portfolio';

export default function Stories() {
    return (
        <div className="flex gap-4 overflow-x-auto py-4 no-scrollbar">
            {stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
                    <div className="story-ring p-[2px] rounded-full group-hover:scale-105 transition-transform duration-200">
                        <div className="story-inner">
                            <img
                                src={story.image}
                                alt={story.label}
                                className="w-16 h-16 rounded-full object-cover border-2 border-black"
                            />
                        </div>
                    </div>
                    <span className="text-xs text-[#a8a8a8] group-hover:text-white transition-colors">{story.label}</span>
                </div>
            ))}
        </div>
    );
}
