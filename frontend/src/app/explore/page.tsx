"use client";

import React, { useState, useMemo } from 'react';
import Navigation from '@/components/layout/Navigation';
import SearchHeader from '@/components/explore/SearchHeader';
import ExploreGrid from '@/components/explore/ExploreGrid';
import { explorePosts } from '@/data/portfolio';

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);

    const filteredPosts = useMemo(() => {
        return explorePosts.filter(post => {
            const matchesSearch = post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesFilter = activeFilters.includes("All") ||
                activeFilters.some(filter => post.tags.some(tag => tag.toLowerCase() === filter.toLowerCase()));

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilters]);

    const handleFilterChange = (filter: string) => {
        setActiveFilters(prev => {
            if (filter === "All") return ["All"];

            const newFilters = prev.filter(f => f !== "All");
            if (newFilters.includes(filter)) {
                const updated = newFilters.filter(f => f !== filter);
                return updated.length === 0 ? ["All"] : updated;
            } else {
                return [...newFilters, filter];
            }
        });
    };

    return (
        <main className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20">
                <div className="max-w-5xl mx-auto px-4 w-full">
                    <SearchHeader
                        onSearch={setSearchQuery}
                        onFilter={handleFilterChange}
                        activeFilters={activeFilters}
                    />
                    <ExploreGrid posts={filteredPosts} />
                </div>
            </div>
        </main>
    );
}
