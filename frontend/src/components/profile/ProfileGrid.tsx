import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Grid, Bookmark, UserSquare } from 'lucide-react';
import { projects } from '@/data/portfolio';

export default function ProfileGrid() {
    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Tabs */}
            <div className="border-t border-[#262626] mt-10 mb-4">
                <div className="flex justify-center gap-12 text-xs font-semibold tracking-widest text-gray-400">
                    <button className="flex items-center gap-2 py-4 border-t border-white text-white -mt-px">
                        <Grid className="w-3 h-3" />
                        POSTS
                    </button>
                    <button className="flex items-center gap-2 py-4 border-t border-transparent hover:text-white transition-colors">
                        <Bookmark className="w-3 h-3" />
                        SAVED
                    </button>
                    <button className="flex items-center gap-2 py-4 border-t border-transparent hover:text-white transition-colors">
                        <UserSquare className="w-3 h-3" />
                        TAGGED
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="relative aspect-square group cursor-pointer bg-[#1a1a1a]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                            <div className="flex items-center gap-2">
                                <Heart className="w-6 h-6 fill-white" />
                                <span>{project.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-6 h-6 fill-white" />
                                <span>{project.comments}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
