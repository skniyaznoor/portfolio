"use client";

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Hash } from 'lucide-react';
import { projects, stories, feedStories, explorePosts, profile } from '@/data/portfolio';

interface UnifiedResult {
    id: string | number;
    type: string;
    title: string;
    subtitle: string;
    image?: string;
    isHashtag?: boolean;
    link?: string;
}

export default function SearchContainer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<UnifiedResult[]>([]);
    const [searchResults, setSearchResults] = useState<UnifiedResult[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const saveRecent = (result: UnifiedResult) => {
        const updated = [result, ...recentSearches.filter(item => item.id !== result.id)].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const removeRecent = (id: string | number) => {
        const updated = recentSearches.filter(item => item.id !== id);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearAllRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results: UnifiedResult[] = [];

        if (profile.name.toLowerCase().includes(query) ||
            profile.username.toLowerCase().includes(query) ||
            profile.bio.toLowerCase().includes(query)) {
            results.push({
                id: 'profile',
                type: 'Profile',
                title: profile.name,
                subtitle: `@${profile.username}`,
                image: `/${profile.avatar}`,
                link: '/profile'
            });
        }

        projects.forEach(p => {
            if (p.title.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query))) {
                results.push({
                    id: `project-${p.id}`,
                    type: p.type,
                    title: p.title,
                    subtitle: p.description,
                    image: p.image,
                    link: p.link || '/'
                });
            }
        });

        stories.forEach(s => {
            if (s.label.toLowerCase().includes(query)) {
                results.push({
                    id: `skill-${s.id}`,
                    type: 'Skill',
                    title: s.label,
                    subtitle: 'Hashtag',
                    isHashtag: true,
                    link: `/explore?tag=${s.label}`
                });
            }
        });

        feedStories.forEach(fs => {
            if (fs.label.toLowerCase().includes(query) || fs.description.toLowerCase().includes(query)) {
                results.push({
                    id: `story-${fs.id}`,
                    type: 'Story',
                    title: fs.label,
                    subtitle: fs.description,
                    image: fs.image
                });
            }
        });

        explorePosts.forEach(ep => {
            if (ep.description.toLowerCase().includes(query) || ep.tags.some(t => t.toLowerCase().includes(query))) {
                results.push({
                    id: `post-${ep.id}`,
                    type: 'Post',
                    title: ep.tags[0] || 'Post',
                    subtitle: ep.description,
                    image: ep.image
                });
            }
        });

        setSearchResults(results);
    }, [searchQuery]);

    return (
        <div className="max-w-[600px] w-full px-4 pt-12">
            <div className="relative mb-10 text-[var(--foreground)]">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-[var(--secondary)]" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--hover-overlay)] border-none rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none placeholder:text-[var(--secondary)]"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-4 flex items-center"
                    >
                        <div className="bg-[var(--secondary)]/20 hover:bg-[var(--secondary)]/30 rounded-full p-1 transition-colors">
                            <X className="w-3 h-3 text-[var(--secondary)]" />
                        </div>
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {!searchQuery ? (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-[var(--foreground)]">Recent</h2>
                            {recentSearches.length > 0 && (
                                <button
                                    onClick={clearAllRecent}
                                    className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                        {recentSearches.length > 0 ? (
                            recentSearches.map((item) => (
                                <div key={item.id} className="flex items-center justify-between group py-2">
                                    <div
                                        className="flex items-center gap-3 cursor-pointer flex-1"
                                        onClick={() => {
                                            if (item.link) window.location.href = item.link;
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[var(--hover-overlay)] border border-[var(--border)] flex-shrink-0">
                                            {item.isHashtag ? (
                                                <Hash className="w-6 h-6 text-[var(--foreground)]" />
                                            ) : (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[var(--foreground)] leading-tight">{item.title}</span>
                                            <span className="text-sm text-[var(--secondary)] truncate max-w-[300px]">{item.subtitle}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeRecent(item.id)}
                                        className="text-[var(--secondary)] hover:text-[var(--foreground)] p-2 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 text-[var(--secondary)]">
                                No recent searches.
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col">
                        {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        saveRecent(item);
                                        if (item.link) window.location.href = item.link;
                                    }}
                                    className="flex items-center gap-3 py-3 px-2 cursor-pointer hover:bg-[var(--hover-overlay)] rounded-lg transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[var(--hover-overlay)] border border-[var(--border)] flex-shrink-0">
                                        {item.isHashtag ? (
                                            <Hash className="w-6 h-6 text-[var(--foreground)]" />
                                        ) : (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[var(--foreground)] leading-tight">{item.title}</span>
                                        <span className="text-sm text-[var(--secondary)] truncate max-w-[400px]">{item.subtitle}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 text-[var(--secondary)]">
                                No results found for "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
