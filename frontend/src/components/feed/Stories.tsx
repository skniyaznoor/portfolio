"use client";

import React, { useState, useRef, useEffect } from 'react';
import { feedStories } from '@/data/portfolio';
import StoryModal from './StoryModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Stories() {
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <>
            <div className="relative group">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[var(--background)] border border-[var(--border)] shadow-lg text-[var(--foreground)] hover:bg-[var(--card)] transition-all hover:scale-110 hidden md:flex"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-1 overflow-x-auto py-4 no-scrollbar scroll-smooth px-4"
                >
                    {feedStories.map((story, index) => (
                        <div
                            key={story.id}
                            onClick={() => setSelectedStoryIndex(index)}
                            className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group px-2"
                        >
                            <div className="story-ring p-[2px] rounded-full group-hover:scale-105 transition-transform duration-200">
                                <div className="bg-[var(--background)] rounded-full p-[2px]">
                                    <img
                                        src={story.image}
                                        alt={story.label}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[var(--background)]"
                                    />
                                </div>
                            </div>
                            <span className="text-[11px] text-[var(--secondary)] group-hover:text-[var(--foreground)] transition-colors max-w-[75px] truncate text-center font-medium">
                                {story.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[var(--background)] border border-[var(--border)] shadow-lg text-[var(--foreground)] hover:bg-[var(--card)] transition-all hover:scale-110 hidden md:flex"
                    >
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            {selectedStoryIndex !== null && (
                <StoryModal
                    stories={feedStories}
                    initialIndex={selectedStoryIndex}
                    onClose={() => setSelectedStoryIndex(null)}
                />
            )}
        </>
    );
}
