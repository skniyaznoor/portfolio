"use client";

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import SearchContainer from '@/components/search/SearchContainer';

export default function SearchPage() {
    return (
        <main className="flex min-h-screen bg-[var(--background)]">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20 flex justify-center overflow-y-auto">
                <SearchContainer />
            </div>
        </main>
    );
}
