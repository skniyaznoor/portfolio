"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { explorePosts } from '@/data/portfolio';
import ImageModal from './ImageModal';

export default function ExploreGrid() {
    const [selectedPost, setSelectedPost] = useState<typeof explorePosts[0] | null>(null);

    return (
        <>
            <div className="grid grid-cols-3 gap-1 pb-20">
                {explorePosts.map((post) => (
                    <div
                        key={post.id}
                        className={`relative group cursor-pointer bg-[var(--card)] overflow-hidden ${post.type === 'large' ? 'col-span-2 row-span-2 aspect-square' : 'col-span-1 row-span-1 aspect-square'
                            }`}
                        onClick={() => setSelectedPost(post)}
                    >
                        <Image
                            src={post.image}
                            alt="Explore"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                            <div className="flex items-center gap-2">
                                <Heart className="w-6 h-6 fill-white" />
                                <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-6 h-6 fill-white" />
                                <span>{post.comments}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPost && (
                <ImageModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </>
    );
}
