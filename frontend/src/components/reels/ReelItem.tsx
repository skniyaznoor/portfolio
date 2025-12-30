'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, Send, Music, Volume2, VolumeX, Check, ChevronDown } from 'lucide-react';
import { Project, profile } from '@/data/portfolio';
import StoryModal from '../profile/StoryModal';

interface ReelItemProps {
    project: Project;
}

const ReelItem: React.FC<ReelItemProps> = ({ project }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLikeHeart, setShowLikeHeart] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [lastTap, setLastTap] = useState(0);
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [showScrollHint, setShowScrollHint] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    timer = setTimeout(() => {
                        setShowScrollHint(true);
                    }, 30000);
                } else {
                    setShowScrollHint(false);
                    if (timer) clearTimeout(timer);
                }
            },
            { threshold: 0.8 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (now - lastTap < DOUBLE_TAP_DELAY) {
            handleLike();
        }
        setLastTap(now);
    };

    const handleLike = () => {
        if (!isLiked) {
            setIsLiked(true);
            setShowLikeHeart(true);
            setTimeout(() => setShowLikeHeart(false), 1000);
        } else {
            setIsLiked(false);
        }
    };

    const handleShare = () => {
        const url = project.link || window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        });
    };

    const cleanDescription = (text: string) => {
        return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
    };

    const fullCleanedDescription = project.fullDescription ? cleanDescription(project.fullDescription) : "";
    const isLongDescription = fullCleanedDescription.length > 120;
    const truncatedDescription = isLongDescription
        ? `${fullCleanedDescription.slice(0, 120)}...`
        : fullCleanedDescription;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-black flex items-center justify-center snap-start"
        >
            {/* Background Image */}
            <div
                className="relative w-full h-full aspect-[9/16] cursor-pointer touch-none select-none"
                onClick={handleDoubleTap}
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Large Heart Animation on Double Tap */}
                {showLikeHeart && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-like-heart" />
                    </div>
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                {/* Vertical Actions (Right Side) */}
                <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-10">
                    <button
                        onClick={handleLike}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className="p-2 transition-transform active:scale-125">
                            <Heart
                                className={`w-8 h-8 ${isLiked ? 'fill-red-500 stroke-red-500' : 'text-white'}`}
                            />
                        </div>
                        <span className="text-white text-xs font-semibold">
                            {(project.likes + (isLiked ? 1 : 0)).toLocaleString()}
                        </span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={handleShare}
                            className="p-2 transition-transform active:scale-110"
                        >
                            <Send className="w-7 h-7 text-white rotate-15" />
                        </button>
                        {showCopied && (
                            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 animate-fadeIn whitespace-nowrap">
                                <Check className="w-3 h-3" />
                                Copied
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2"
                    >
                        {isMuted ? (
                            <VolumeX className="w-7 h-7 text-white" />
                        ) : (
                            <Volume2 className="w-7 h-7 text-white" />
                        )}
                    </button>

                    {/* Small Profile Image with spinning animation */}
                    <div className="mt-2 relative">
                        <div className="w-9 h-9 rounded-md border-2 border-white/80 overflow-hidden">
                            <Image
                                src={`/${profile.avatar}`}
                                alt={profile.name}
                                width={36}
                                height={36}
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <div className="bg-black rounded-full w-2 h-2" />
                        </div>
                    </div>
                </div>

                {/* Content Details (Bottom Left) */}
                <div className="absolute left-4 bottom-6 right-16 z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="story-ring p-[1px] rounded-full cursor-pointer" onClick={() => setIsStoryOpen(true)}>
                            <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden shrink-0">
                                <Image
                                    src={`/${profile.avatar}`}
                                    alt={profile.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-white font-semibold text-sm truncate">
                            {profile.username}
                        </span>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-1 rounded-md border border-white text-white text-[11px] font-bold hover:bg-white/10 transition-colors flex items-center shrink-0 uppercase tracking-wider"
                            >
                                Navigate
                            </a>
                        )}
                    </div>

                    <div
                        className="text-white text-[13px] mb-2 leading-relaxed max-w-[85%] cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <span className="font-semibold block mb-0.5">{project.title}</span>
                        {project.description}
                        {fullCleanedDescription && (
                            <div className="mt-1">
                                <p className={`text-white/90 text-[13px] ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                    {isExpanded ? fullCleanedDescription : truncatedDescription}
                                </p>
                                {isLongDescription && (
                                    <button className="text-white/60 text-[12px] font-bold mt-1">
                                        {isExpanded ? 'less' : 'more'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-white/90 text-[13px]">#{tag.toLowerCase()}</span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full w-fit max-w-[200px]">
                        <Music className="w-3 h-3 text-white shrink-0" />
                        <div className="overflow-hidden whitespace-nowrap">
                            <div className="inline-block animate-marquee-slow whitespace-nowrap text-white text-[11px]">
                                {profile.name} • Original Audio
                            </div>
                        </div>
                    </div>
                </div>

                {showScrollHint && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-30 animate-bounce text-white/80 pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Swipe up</span>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                )}
            </div>

            <StoryModal
                isOpen={isStoryOpen}
                onClose={() => setIsStoryOpen(false)}
                quote="Code is like humor. When you have to explain it, it’s bad."
            />

            <style jsx>{`
                @keyframes marquee-slow {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes like-heart {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 0; }
                }
                .animate-marquee-slow {
                    animation: marquee-slow 15s linear infinite;
                }
                .animate-like-heart {
                    animation: like-heart 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ReelItem;
