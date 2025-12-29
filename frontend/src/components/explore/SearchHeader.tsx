"use client";

import React from 'react';
import { Search } from 'lucide-react';

const filters = [
    "All", "Art", "Fashion", "Travel", "Food", "Nature", "Architecture", "Technology", "Sports", "Music"
];

export default function SearchHeader() {
    return (
        <div className="sticky top-0 z-10 bg-[var(--background)] pb-4 pt-2">
            {/* Search Bar */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-[var(--secondary)]" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[var(--card)] text-[var(--foreground)] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[var(--border)] placeholder-[var(--secondary)]"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${index === 0
                                ? "bg-[var(--foreground)] text-[var(--background)]"
                                : "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--border)]"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
