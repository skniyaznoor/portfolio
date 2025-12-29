"use client";

import React from 'react';
import Image from 'next/image';
import { X, MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { profile } from '@/data/portfolio';

interface ImageModalProps {
    post: {
        id: number;
        image: string;
        likes: number;
        comments: number;
    } | null;
    onClose: () => void;
}

export default function ImageModal({ post, onClose }: ImageModalProps) {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-10" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white hover:opacity-70 z-50">
                <X className="w-8 h-8" />
            </button>

            <div
                className="bg-[var(--background)] w-full max-w-6xl max-h-[90vh] rounded-sm overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
                    <div className="relative w-full h-full">
                        <Image
                            src={post.image}
                            alt="Post"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col border-l border-[var(--border)]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden">
                                <Image src={`/${profile.avatar}`} alt={profile.username} fill className="object-cover" />
                            </div>
                            <span className="font-semibold text-sm text-[var(--foreground)]">{profile.username}</span>
                        </div>
                        <button className="text-[var(--foreground)] hover:opacity-50">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Comments Area (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Caption */}
                        <div className="flex gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0">
                                <Image src={`/${profile.avatar}`} alt={profile.username} fill className="object-cover" />
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold mr-2 text-[var(--foreground)]">{profile.username}</span>
                                <span className="text-[var(--foreground)]">Check out this amazing creation! ✨ #art #design #inspiration</span>
                                <div className="text-xs text-[var(--secondary)] mt-1">1 day ago</div>
                            </div>
                        </div>

                        {/* Dummy Comments */}
                        <div className="flex gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200"></div>
                            <div className="text-sm">
                                <span className="font-semibold mr-2 text-[var(--foreground)]">design.lover</span>
                                <span className="text-[var(--foreground)]">This is amazing! 😍</span>
                                <div className="flex gap-3 text-xs text-[var(--secondary)] mt-1">
                                    <span>2h</span>
                                    <span>1 like</span>
                                    <span>Reply</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-300"></div>
                            <div className="text-sm">
                                <span className="font-semibold mr-2 text-[var(--foreground)]">creative.mind</span>
                                <span className="text-[var(--foreground)]">Love the composition and colors!</span>
                                <div className="flex gap-3 text-xs text-[var(--secondary)] mt-1">
                                    <span>4h</span>
                                    <span>Reply</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="p-4 border-t border-[var(--border)]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <button className="text-[var(--foreground)] hover:opacity-50"><Heart className="w-6 h-6" /></button>
                                <button className="text-[var(--foreground)] hover:opacity-50"><MessageCircle className="w-6 h-6" /></button>
                                <button className="text-[var(--foreground)] hover:opacity-50"><Send className="w-6 h-6" /></button>
                            </div>
                            <button className="text-[var(--foreground)] hover:opacity-50"><Bookmark className="w-6 h-6" /></button>
                        </div>
                        <div className="font-semibold text-sm mb-1 text-[var(--foreground)]">{post.likes.toLocaleString()} likes</div>
                        <div className="text-[var(--secondary)] text-xs uppercase mb-3">1 day ago</div>

                        {/* Add Comment */}
                        <div className="flex items-center gap-2 border-t border-[var(--border)] pt-3">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent text-sm focus:outline-none text-[var(--foreground)] placeholder-[var(--secondary)]"
                            />
                            <button className="text-[var(--accent)] font-semibold text-sm hover:text-[var(--foreground)]">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
