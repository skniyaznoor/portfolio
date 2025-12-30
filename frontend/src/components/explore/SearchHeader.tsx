"use client";

import React from 'react';
import { Search } from 'lucide-react';

const filters = [
    "All", "Next.js", "Node.js", "Laravel", "Python", "Django", "React", "Graphql", "Docker", "Tailwind", "TypeScript"
];

interface SearchHeaderProps {
    onSearch: (query: string) => void;
    onFilter: (filter: string) => void;
    activeFilters: string[];
}

export default function SearchHeader({ onSearch, onFilter, activeFilters }: SearchHeaderProps) {
    return (
        <div className="sticky top-0 z-10 bg-[var(--background)] pb-4 pt-2">
            {/* Search Bar */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-[var(--secondary)]" />
                </div>
                <input
                    type="text"
                    placeholder="Search titles, descriptions, or tech..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-[var(--card)] text-[var(--foreground)] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[var(--border)] placeholder-[var(--secondary)]"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => onFilter(filter)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeFilters.includes(filter)
                            ? "bg-[var(--foreground)] text-[var(--background)] scale-105 shadow-md"
                            : "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--border)] hover:scale-105"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
