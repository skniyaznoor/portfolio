"use client";

import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { profile, Project } from '@/data/portfolio';
import StoryModal from '../profile/StoryModal';

interface PostCardProps {
    post: Project;
}

export default function PostCard({ post }: PostCardProps) {
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [localLikes, setLocalLikes] = useState(post.likes);
    const [isExpanded, setIsExpanded] = useState(false);

    const cleanDescription = (text: string) => {
        return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
    };

    const description = cleanDescription(post.fullDescription);
    const shortDescription = description.length > 280 ? `${description.slice(0, 280)}...` : description;

    const handleLike = () => {

        setIsLiked(!isLiked);
        setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleTitleClick = () => {
        if (post.link) {
            window.open(post.link, '_blank');
        }
    };

    return (
        <div className="border-b border-[var(--border)] pb-8 mb-8">
            {/* Header */}
            <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                    <div className="story-ring p-[1px] rounded-full cursor-pointer" onClick={() => setIsStoryOpen(true)}>
                        <div className="bg-[var(--background)] rounded-full p-[1px]">
                            <img src={`/${profile.avatar}`} alt={profile.username} className="w-8 h-8 rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm text-[var(--foreground)]">{profile.username}</span>
                        </div>
                        <span
                            className={`text-xs text-[var(--secondary)] ${post.link ? 'cursor-pointer hover:underline' : ''}`}
                            onClick={handleTitleClick}
                        >
                            {post.title}
                        </span>
                    </div>
                </div>
                <button className="text-[var(--foreground)] disabled:opacity-50 cursor-not-allowed group relative" title="Feature coming soon">
                    <MoreHorizontal className="w-5 h-5 transition-colors group-hover:text-[var(--secondary)]" />
                    <span className="absolute right-0 top-8 bg-[var(--card)] border border-[var(--border)] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                        Disabled
                    </span>
                </button>
            </div>

            {/* Image */}
            <div className="rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--card)]">
                <img src={post.image} alt={post.title} className="w-full aspect-2/1 object-cover" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={`transition-all duration-300 transform active:scale-125 ${isLiked ? 'text-red-500' : 'hover:text-[var(--secondary)] text-[var(--foreground)]'}`}
                    >
                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="text-[var(--foreground)] cursor-not-allowed group relative" title="Coming Soon">
                        <MessageCircle className="w-6 h-6 transition-colors group-hover:text-[var(--secondary)]" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                            Disabled
                        </span>
                    </button>
                    <button className="text-[var(--foreground)] cursor-not-allowed group relative" title="Coming Soon">
                        <Send className="w-6 h-6 transition-colors group-hover:text-[var(--secondary)]" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                            Disabled
                        </span>
                    </button>
                </div>
                <button className="text-[var(--foreground)] cursor-not-allowed group relative" title="Coming Soon">
                    <Bookmark className="w-6 h-6 transition-colors group-hover:text-[var(--secondary)]" />
                    <span className="absolute -top-8 right-0 bg-[var(--card)] border border-[var(--border)] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                        Disabled
                    </span>
                </button>
            </div>

            {/* Content */}
            <div className="px-1 space-y-2">
                <p className="font-semibold text-sm text-[var(--foreground)]">{localLikes.toLocaleString()} likes</p>
                <div className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                    <span className="font-semibold mr-2">{profile.username}</span>
                    {isExpanded ? description : shortDescription}
                    {description.length > 280 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[var(--secondary)] ml-1 hover:text-[var(--foreground)] transition-colors text-xs font-medium focus:outline-none"
                        >
                            {isExpanded ? 'less' : 'more'}
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-[var(--accent)] text-sm">#{tag.toLowerCase().replace(/\s+/g, '')}</span>
                    ))}
                </div>
                {/* <button className="text-[var(--secondary)] text-sm mt-1">
                    View all {post.comments} comments
                </button> */}
            </div>
            <StoryModal
                isOpen={isStoryOpen}
                onClose={() => setIsStoryOpen(false)}
                quote="Code is like humor. When you have to explain it, it’s bad."
            />
        </div>
    );
}
