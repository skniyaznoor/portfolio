"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextStory();
            if (e.key === 'ArrowLeft') prevStory();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextStory, prevStory, onClose]);

    const currentStory = stories[currentIndex];
    if (!currentStory) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md overflow-hidden">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-all z-[150] hover:scale-110"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons - Outside the cube */}
            <button
                onClick={prevStory}
                className={`absolute left-8 md:left-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all z-[150] hidden md:block ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ChevronLeft size={40} />
            </button>
            <button
                onClick={nextStory}
                className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all z-[150] hidden md:block"
            >
                <ChevronRight size={40} />
            </button>

            <div
                ref={containerRef}
                className="relative w-full max-w-md aspect-[9/16] md:h-[90vh] overflow-visible md:rounded-2xl"
                style={{ perspective: '1500px' }}
            >
                {/* Cube Wrapper */}
                <div
                    className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${-currentIndex * 90}deg)`
                    }}
                >
                    {stories.map((story, index) => {
                        const isVisible = Math.abs(index - currentIndex) <= 1;
                        return (
                            <div
                                key={story.id}
                                className="absolute inset-0 w-full h-full md:rounded-2xl overflow-hidden bg-black shadow-2xl"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: `rotateY(${index * 90}deg) translateZ(${containerWidth / 2}px)`,
                                    opacity: isVisible ? 1 : 0,
                                    pointerEvents: index === currentIndex ? 'auto' : 'none'
                                }}
                            >
                                <img
                                    src={story.image}
                                    alt={story.label}
                                    className="w-full h-full object-cover select-none"
                                />

                                {/* UI Elements - Now inside the face to rotate with it */}
                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    {/* Single Progress Bar per Face */}
                                    <div className="absolute top-8 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white transition-all duration-100 ease-linear"
                                            style={{
                                                width: index === currentIndex ? `${progress}%` : (index < currentIndex ? '100%' : '0%')
                                            }}
                                        />
                                    </div>

                                    {/* Header Info */}
                                    <div className="absolute top-12 left-6 right-6 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                            <img src={story.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-white font-semibold text-sm shadow-sm">{story.label}</span>
                                    </div>

                                    {/* Gradient Overlay and Description */}
                                    <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                        <p className="text-white text-xl font-medium text-center leading-snug drop-shadow-lg">
                                            {story.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Static Interaction Layer */}
                <div className="absolute inset-0 pointer-events-none z-[130]">
                    {/* Touch Areas for Navigation */}
                    <div className="absolute inset-0 flex pointer-events-auto">
                        <div className="flex-1 cursor-pointer" onClick={prevStory} />
                        <div className="flex-1 cursor-pointer" onClick={nextStory} />
                    </div>
                </div>
            </div>
        </div>
    );
}
