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
        tags: string[];
        description: string;
    } | null;
    onClose: () => void;
}

export default function ImageModal({ post, onClose }: ImageModalProps) {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 transition-all duration-300" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white hover:opacity-70 z-50 transition-transform hover:scale-110">
                <X className="w-8 h-8" />
            </button>

            <div
                className="bg-[var(--background)] w-full max-w-6xl max-h-[90vh] rounded-md overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0 border-r border-[var(--border)]">
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
                <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden border border-[var(--border)]">
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
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 border border-[var(--border)]">
                                <Image src={`/${profile.avatar}`} alt={profile.username} fill className="object-cover" />
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold mr-2 text-[var(--foreground)]">{profile.username}</span>
                                <span className="text-[var(--foreground)]">{post.description} ✨</span>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[var(--accent)] font-medium">#{tag.toLowerCase()}</span>
                                    ))}
                                </div>
                                <div className="text-xs text-[var(--secondary)] mt-2">Just now</div>
                            </div>
                        </div>

                        {/* Tech Stack Info */}
                        <div className="p-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                            <h4 className="text-xs font-bold text-[var(--secondary)] uppercase mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)] text-[var(--foreground)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Dummy Comments */}
                        <div className="flex gap-3 mt-4">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 bg-[var(--border)]"></div>
                            <div className="text-sm">
                                <span className="font-semibold mr-2 text-[var(--foreground)]">collaborator.dev</span>
                                <span className="text-[var(--foreground)]">Impressive work on the architecture! 🚀</span>
                                <div className="flex gap-3 text-xs text-[var(--secondary)] mt-1">
                                    <span>2h</span>
                                    <span>3 likes</span>
                                    <span>Reply</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <button className="text-[var(--foreground)] hover:scale-110 transition-transform"><Heart className="w-6 h-6 hover:text-red-500" /></button>
                                <button className="text-[var(--foreground)] hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6" /></button>
                                <button className="text-[var(--foreground)] hover:scale-110 transition-transform"><Send className="w-6 h-6" /></button>
                            </div>
                            <button className="text-[var(--foreground)] hover:scale-110 transition-transform"><Bookmark className="w-6 h-6" /></button>
                        </div>
                        <div className="font-semibold text-sm mb-1 text-[var(--foreground)]">{post.likes.toLocaleString()} likes</div>
                        <div className="text-[var(--secondary)] text-[10px] uppercase mb-1">December 30, 2025</div>

                        {/* Add Comment */}
                        <div className="flex items-center gap-2 border-t border-[var(--border)] pt-3 mt-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent text-sm focus:outline-none text-[var(--foreground)] placeholder-[var(--secondary)]"
                            />
                            <button className="text-[var(--accent)] font-semibold text-sm hover:text-[var(--foreground)] transition-colors">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
