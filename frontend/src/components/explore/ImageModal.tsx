"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Heart, Send, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
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
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.likes || 0);
    const [commentText, setCommentText] = useState("");
    const [localComments, setLocalComments] = useState<string[]>([]);

    if (!post) return null;

    const handleLike = () => {
        if (isLiked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        setLocalComments(prev => [...prev, commentText]);
        setCommentText("");
    };

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
                        <div className="relative group/disabled cursor-not-allowed px-2">
                            <MoreHorizontal className="w-5 h-5 text-[var(--secondary)]/50 transition-colors" />
                            <div className="absolute right-0 top-8 bottom-full mb-2 hidden group-hover/disabled:block bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 border border-white/10 shadow-lg h-6">
                                Feature Disabled
                            </div>
                        </div>
                    </div>

                    {/* Content Section (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
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
                                        <span key={tag} className="text-[var(--accent)] font-medium text-xs">#{tag.toLowerCase()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Info */}
                        <div className="p-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                            <h4 className="text-[10px] font-bold text-[var(--secondary)] uppercase mb-2 tracking-wider">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[10px] bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)] text-[var(--foreground)] font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4 pt-2">
                            {localComments.map((comment, index) => (
                                <div key={index} className="flex gap-3 animate-slide-in-right">
                                    <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0 border border-[var(--border)]">
                                        <Image src={`/${profile.avatar}`} alt={profile.username} fill className="object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold mr-2 text-[var(--foreground)]">{profile.username}</span>
                                        <span className="text-[var(--foreground)]">{comment}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions & Input Footer */}
                    <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={`transition-all duration-200 hover:scale-110 ${isLiked ? 'text-red-500' : 'text-[var(--foreground)]'}`}
                                >
                                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                                </button>

                                <div className="relative group/disabled cursor-not-allowed">
                                    <MessageCircle className="w-6 h-6 text-[var(--secondary)]/50" />
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/disabled:block bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 border border-white/10 shadow-lg">
                                        Feature Disabled
                                    </div>
                                </div>

                                <div className="relative group/disabled cursor-not-allowed">
                                    <Send className="w-6 h-6 text-[var(--secondary)]/50" />
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/disabled:block bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 border border-white/10 shadow-lg">
                                        Feature Disabled
                                    </div>
                                </div>
                            </div>

                            <div className="relative group/disabled cursor-not-allowed flex items-center">
                                <Bookmark className="w-6 h-6 text-[var(--secondary)]/50" />
                                <div className="absolute right-0 bottom-full mb-2 hidden group-hover/disabled:block bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 border border-white/10 shadow-lg">
                                    Feature Disabled
                                </div>
                            </div>
                        </div>

                        <div className="font-bold text-sm mb-1 text-[var(--foreground)]">
                            {likesCount.toLocaleString()} likes
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4 mt-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                className="flex-1 bg-transparent text-sm focus:outline-none text-[var(--foreground)] placeholder-[var(--secondary)]"
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim()}
                                className="text-[var(--accent)] hover:text-[var(--foreground)] transition-all transform hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                            >
                                <Send className="w-5 h-5 rotate-45 translate-y-[-2px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
