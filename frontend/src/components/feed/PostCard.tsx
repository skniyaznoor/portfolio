"use client";

import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { profile } from '@/data/portfolio';

interface PostCardProps {
    post: {
        id: number;
        title: string;
        type: string;
        description: string;
        image: string;
        tags: string[];
        likes: number;
        comments: number;
        date: string;
    };
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="border-b border-[var(--border)] pb-8 mb-8">
            {/* Header */}
            <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                    <div className="story-ring p-[1px] rounded-full">
                        <div className="bg-[var(--background)] rounded-full p-[1px]">
                            <img src={`/${profile.avatar}`} alt={profile.username} className="w-8 h-8 rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm text-[var(--foreground)]">{profile.username}</span>
                            <span className="text-[var(--secondary)] text-sm">• {post.date}</span>
                        </div>
                        <span className="text-xs text-[var(--secondary)]">{post.type}</span>
                    </div>
                </div>
                <button className="hover:text-[var(--secondary)] text-[var(--foreground)]">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Image */}
            <div className="rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--card)]">
                <img src={post.image} alt={post.title} className="w-full aspect-square object-cover" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-4">
                    <button className="hover:text-[var(--secondary)] text-[var(--foreground)] transition-colors">
                        <Heart className="w-6 h-6" />
                    </button>
                    <button className="hover:text-[var(--secondary)] text-[var(--foreground)] transition-colors">
                        <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="hover:text-[var(--secondary)] text-[var(--foreground)] transition-colors">
                        <Send className="w-6 h-6" />
                    </button>
                </div>
                <button className="hover:text-[var(--secondary)] text-[var(--foreground)] transition-colors">
                    <Bookmark className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="px-1 space-y-2">
                <p className="font-semibold text-sm text-[var(--foreground)]">{post.likes.toLocaleString()} likes</p>
                <div className="text-sm text-[var(--foreground)]">
                    <span className="font-semibold mr-2">{profile.username}</span>
                    <span className="font-bold text-[var(--accent)] mr-2">[{post.title}]</span>
                    {post.description}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-[var(--accent)] text-sm">#{tag.toLowerCase().replace(/\s+/g, '')}</span>
                    ))}
                </div>
                <button className="text-[var(--secondary)] text-sm mt-1">
                    View all {post.comments} comments
                </button>
            </div>
        </div>
    );
}
