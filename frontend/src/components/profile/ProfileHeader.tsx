"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Settings, Sun, Moon } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useTheme } from '@/context/ThemeContext';
import StoryModal from './StoryModal';
import EducationModal from './EducationModal';

export default function ProfileHeader() {
    const { theme, toggleTheme } = useTheme();
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [isEducationOpen, setIsEducationOpen] = useState(false);

    return (
        <>
            <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-24 px-4 py-8 max-w-[935px] mx-auto">
                {/* Profile Avatar */}
                <div className="flex-shrink-0 cursor-pointer group" onClick={() => setIsStoryOpen(true)}>
                    <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] group-hover:scale-105 transition-transform duration-300">
                        <div className="bg-[var(--background)] p-[4px] rounded-full">
                            <div className="w-64 h-64 relative rounded-full overflow-hidden">
                                <Image
                                    src={`/${profile.avatar}`}
                                    alt={profile.name}
                                    fill
                                    sizes="(max-width: 768px) 256px, 256px"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <h1 className="text-xl md:text-2xl font-normal">{profile.username}</h1>
                        <div className="flex items-center gap-2">
                            <a
                                href="/pdf/skniyaznoor.pdf"
                                download
                                className="px-4 py-1.5 bg-[var(--border)] hover:bg-[var(--secondary)] text-[var(--foreground)] text-sm font-semibold rounded-lg transition-colors"
                            >
                                Resume
                            </a>
                            <button
                                onClick={() => setIsEducationOpen(true)}
                                title="Education details"
                                className="p-2 text-[var(--foreground)] hover:opacity-70 cursor-pointer"
                            >
                                <Settings className="w-6 h-6" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); toggleTheme(); }} className="p-2 text-[var(--foreground)] hover:opacity-70">
                                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center md:justify-start gap-8 md:gap-10 text-base">
                        {/* <div className="flex gap-1">
                            <span className="font-bold">{profile.stats.posts}</span>
                            <span>Posts</span>
                        </div> */}
                        <div className="flex gap-1">
                            <span className="font-bold">{profile.stats.followers}</span>
                            <span>Projects</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="font-bold">{profile.stats.following}</span>
                            <span>TechStack</span>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="text-sm md:text-base text-center md:text-left">
                        <div className="font-bold">{profile.name}</div>
                        <div className="text-[var(--secondary)] whitespace-pre-line">
                            {profile.title}
                        </div>
                        <div className="whitespace-pre-line">
                            {profile.bio}
                        </div>

                        <div className="text-[var(--secondary)] mt-2">
                            📍 {profile.addresses.correspondence.addressLine},<br />
                            {profile.addresses.correspondence.city}, {profile.addresses.correspondence.state} – {profile.addresses.correspondence.pin}
                        </div>

                        <div className="text-[var(--secondary)] mt-1">
                            📞 {profile.contact.phones.join(" | ")}
                        </div>
                        <div className="text-[var(--secondary)]">
                            ✉️ {profile.contact.emails[0]}
                        </div>
                        <div className="text-[var(--secondary)]">
                            🌐 {profile.link}
                        </div>
                    </div>
                </div>
            </header>

            <StoryModal
                isOpen={isStoryOpen}
                onClose={() => setIsStoryOpen(false)}
                quote="Code is like humor. When you have to explain it, it’s bad."
            />
            <EducationModal
                isOpen={isEducationOpen}
                onClose={() => setIsEducationOpen(false)}
            />
        </>
    );
}
