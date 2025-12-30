"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
    id: number;
    label: string;
    image: string;
    description: string;
}

interface StoryModalProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

const STORY_DURATION = 10000;

export default function StoryModal({ stories, initialIndex, onClose }: StoryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);

    const nextStory = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    }, [currentIndex, stories.length, onClose]);

    const prevStory = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    }, [currentIndex]);

    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);

            setProgress(newProgress);

            if (newProgress >= 100) {
                nextStory();
            }
        }, 30);

        return () => clearInterval(timer);
    }, [currentIndex, nextStory]);

    const currentStory = stories[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextStory();
            if (e.key === 'ArrowLeft') prevStory();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextStory, prevStory, onClose]);

    if (!currentStory) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-all z-[120] hover:scale-110"
            >
                <X size={32} />
            </button>

            <div className="relative w-full max-w-md aspect-[9/16] md:h-[90vh] overflow-hidden md:rounded-2xl bg-black shadow-2xl flex flex-col">
                <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-[110]">
                    {stories.map((_, index) => (
                        <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-white transition-all duration-100 ease-linear ${index === currentIndex ? '' : (index < currentIndex ? 'w-full' : 'w-0')}`}
                                style={{
                                    width: index === currentIndex ? `${progress}%` : undefined
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-8 left-4 right-4 flex items-center gap-3 z-[110]">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <img src={currentStory.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-semibold text-sm shadow-sm">{currentStory.label}</span>
                </div>

                <div className="absolute inset-0 flex z-[105]">
                    <div className="flex-1 cursor-pointer" onClick={prevStory} />
                    <div className="flex-1 cursor-pointer" onClick={nextStory} />
                </div>

                <div>
                    <button
                        onClick={prevStory}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 hover:text-white transition-all z-[120] ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <ChevronLeft size={36} />
                    </button>
                    <button
                        onClick={nextStory}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 hover:text-white transition-all z-[120]"
                    >
                        <ChevronRight size={36} />
                    </button>
                </div>

                <div className="flex-1 relative w-full h-full">
                    <img
                        key={currentStory.id}
                        src={currentStory.image}
                        alt={currentStory.label}
                        className="w-full h-full object-cover animate-fadeIn"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-white text-xl font-medium text-center leading-snug drop-shadow-lg">
                        {currentStory.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
