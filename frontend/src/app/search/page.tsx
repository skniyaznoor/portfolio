'use client';

import { posts } from '@/data/portfolio-data';
import { useState, useMemo } from 'react';
import { Search as SearchIcon, X, Code, BookOpen, Sparkles, User as UserIcon } from 'lucide-react';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredPosts = useMemo(() => {
        let filtered = posts;

        if (selectedType) {
            filtered = filtered.filter((post) => post.type === selectedType);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.description.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query) ||
                    post.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [searchQuery, selectedType]);

    const types = [
        { value: 'project', label: 'Projects', icon: Code, color: 'text-blue-400' },
        { value: 'writing', label: 'Writing', icon: BookOpen, color: 'text-pink-400' },
        { value: 'skill', label: 'Skills', icon: Sparkles, color: 'text-yellow-400' },
        { value: 'about', label: 'About', icon: UserIcon, color: 'text-purple-400' },
    ];

    return (
        <main className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fadeIn">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                        Discover
                    </h1>
                    <p className="text-[var(--ig-text-secondary)]">
                        Explore projects, writings, and more
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6 animate-slideInRight">
                    <SearchIcon
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--ig-text-secondary)]"
                    />
                    <input
                        type="text"
                        placeholder="Search posts, tags, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ig-input pl-12 pr-12"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 icon-button"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-3 mb-8 overflow-x-auto hide-scrollbar animate-slideInLeft">
                    <button
                        onClick={() => setSelectedType(null)}
                        className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${selectedType === null
                                ? 'bg-white text-black'
                                : 'bg-[var(--ig-secondary)] text-[var(--ig-text-secondary)] hover:bg-[var(--ig-border)]'
                            }`}
                    >
                        All
                    </button>
                    {types.map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                key={type.value}
                                onClick={() => setSelectedType(type.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${selectedType === type.value
                                        ? 'bg-white text-black'
                                        : 'bg-[var(--ig-secondary)] text-[var(--ig-text-secondary)] hover:bg-[var(--ig-border)]'
                                    }`}
                            >
                                <Icon size={16} className={selectedType === type.value ? '' : type.color} />
                                {type.label}
                            </button>
                        );
                    })}
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-[var(--ig-text-secondary)]">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPosts.map((post, index) => {
                        const Icon = types.find((t) => t.value === post.type)?.icon || Code;
                        const color = types.find((t) => t.value === post.type)?.color || 'text-gray-400';

                        return (
                            <div
                                key={post.id}
                                className="glass rounded-2xl p-6 card-hover animate-fadeIn cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 bg-[var(--ig-secondary)] rounded-lg">
                                        <Icon size={20} className={color} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[var(--ig-text-secondary)]">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-[var(--ig-text-primary)] mb-4 line-clamp-3">
                                    {post.content}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="tag text-xs">
                                            #{tag}
                                        </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <span className="tag text-xs">
                                            +{post.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-xs text-[var(--ig-text-secondary)]">
                                    <span>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <span className="uppercase font-medium">{post.type}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-16 animate-fadeIn">
                        <SearchIcon size={48} className="mx-auto mb-4 text-[var(--ig-text-secondary)]" />
                        <h3 className="text-xl font-bold mb-2">No results found</h3>
                        <p className="text-[var(--ig-text-secondary)]">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
