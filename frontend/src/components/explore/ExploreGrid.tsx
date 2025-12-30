"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { explorePosts } from '@/data/portfolio';
import ImageModal from './ImageModal';

interface ExploreGridProps {
    posts: typeof explorePosts;
}

export default function ExploreGrid({ posts }: ExploreGridProps) {
    const [selectedPost, setSelectedPost] = useState<typeof explorePosts[0] | null>(null);

    return (
        <>
            <div className="grid grid-cols-3 gap-1 pb-20">
                {posts.map((post) => (
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
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white backdrop-blur-[2px]">
                            <h3 className="font-bold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {post.description}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                                        {tag}
                                    </span>
                                ))}
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
