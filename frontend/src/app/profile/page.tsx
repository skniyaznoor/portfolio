'use client';

import { profileData, posts } from '@/data/portfolio-data';
import { ExternalLink, Github, Instagram, Linkedin, Globe, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'writing'>('all');

    const filteredPosts = posts.filter((post) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'projects') return post.type === 'project';
        if (activeTab === 'writing') return post.type === 'writing';
        return true;
    });

    return (
        <main className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="mb-8 animate-fadeIn">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1">
                                <div className="w-full h-full rounded-full bg-[var(--ig-primary)] flex items-center justify-center text-6xl font-bold gradient-text">
                                    SN
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                            <p className="text-[var(--ig-text-secondary)] mb-4">
                                {profileData.username}
                            </p>

                            {/* Stats */}
                            <div className="flex justify-center md:justify-start gap-8 mb-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold">{profileData.stats.posts}</div>
                                    <div className="text-sm text-[var(--ig-text-secondary)]">posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{profileData.stats.followers}</div>
                                    <div className="text-sm text-[var(--ig-text-secondary)]">followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{profileData.stats.following}</div>
                                    <div className="text-sm text-[var(--ig-text-secondary)]">following</div>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-sm whitespace-pre-line mb-6 max-w-md mx-auto md:mx-0">
                                {profileData.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <a
                                    href={profileData.links.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--ig-secondary)] rounded-lg hover:bg-[var(--ig-border)] transition-all group"
                                >
                                    <Globe size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Website</span>
                                </a>
                                <a
                                    href={profileData.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--ig-secondary)] rounded-lg hover:bg-[var(--ig-border)] transition-all group"
                                >
                                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">GitHub</span>
                                </a>
                                <a
                                    href={profileData.links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--ig-secondary)] rounded-lg hover:bg-[var(--ig-border)] transition-all group"
                                >
                                    <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Instagram</span>
                                </a>
                                <a
                                    href={profileData.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--ig-secondary)] rounded-lg hover:bg-[var(--ig-border)] transition-all group"
                                >
                                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-[var(--ig-border)] mb-6 animate-slideInRight">
                    <div className="flex justify-around md:justify-center md:gap-16">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`py-4 px-6 font-medium text-sm transition-all relative ${activeTab === 'all'
                                    ? 'text-white'
                                    : 'text-[var(--ig-text-secondary)]'
                                }`}
                        >
                            ALL POSTS
                            {activeTab === 'all' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`py-4 px-6 font-medium text-sm transition-all relative ${activeTab === 'projects'
                                    ? 'text-white'
                                    : 'text-[var(--ig-text-secondary)]'
                                }`}
                        >
                            PROJECTS
                            {activeTab === 'projects' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('writing')}
                            className={`py-4 px-6 font-medium text-sm transition-all relative ${activeTab === 'writing'
                                    ? 'text-white'
                                    : 'text-[var(--ig-text-secondary)]'
                                }`}
                        >
                            WRITING
                            {activeTab === 'writing' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className="glass rounded-xl p-4 card-hover cursor-pointer animate-fadeIn"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="mb-3">
                                <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-xs text-[var(--ig-text-secondary)] line-clamp-2">
                                    {post.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                                {post.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-[var(--ig-secondary)] rounded-full text-[var(--ig-text-secondary)]">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--ig-text-secondary)]">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                                {post.link && (
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--ig-blue)] hover:text-[var(--ig-blue-hover)] transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 glass rounded-2xl p-8 text-center animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4 gradient-text">
                        Let's Connect
                    </h2>
                    <p className="text-[var(--ig-text-secondary)] mb-6 max-w-md mx-auto">
                        Interested in collaborating on a project or just want to say hi?
                        Feel free to reach out!
                    </p>
                    <a
                        href="mailto:skniyaznoor@gmail.com"
                        className="inline-flex items-center gap-2 ig-button"
                    >
                        <Mail size={18} />
                        Get in Touch
                    </a>
                </div>
            </div>
        </main>
    );
}
