'use client';

import { Post } from '@/data/portfolio-data';
import { ExternalLink, Code, BookOpen, User as UserIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface FeedCardProps {
    post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getIcon = () => {
        switch (post.type) {
            case 'project':
                return <Code size={24} className="text-blue-400" />;
            case 'writing':
                return <BookOpen size={24} className="text-pink-400" />;
            case 'skill':
                return <Sparkles size={24} className="text-yellow-400" />;
            case 'about':
                return <UserIcon size={24} className="text-purple-400" />;
            default:
                return null;
        }
    };

    const getGradient = () => {
        switch (post.type) {
            case 'project':
                return 'from-blue-600/20 to-cyan-600/20';
            case 'writing':
                return 'from-pink-600/20 to-rose-600/20';
            case 'skill':
                return 'from-yellow-600/20 to-orange-600/20';
            case 'about':
                return 'from-purple-600/20 to-indigo-600/20';
            default:
                return 'from-gray-600/20 to-gray-800/20';
        }
    };

    const getBorderColor = () => {
        switch (post.type) {
            case 'project':
                return 'border-blue-500/30';
            case 'writing':
                return 'border-pink-500/30';
            case 'skill':
                return 'border-yellow-500/30';
            case 'about':
                return 'border-purple-500/30';
            default:
                return 'border-gray-500/30';
        }
    };

    return (
        <div className="snap-item h-screen w-full flex items-center justify-center p-4 md:p-8">
            <div className={`w-full max-w-2xl bg-gradient-to-br ${getGradient()} rounded-3xl border ${getBorderColor()} overflow-hidden card-hover animate-fadeIn`}>
                <div className="glass p-6 md:p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[var(--ig-secondary)] rounded-full">
                                {getIcon()}
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-[var(--ig-text-secondary)] mt-1">
                                    {post.description}
                                </p>
                            </div>
                        </div>
                        {post.link && (
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-button"
                                title="View more"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto hide-scrollbar mb-6">
                        <p className={`text-[var(--ig-text-primary)] leading-relaxed whitespace-pre-line ${!isExpanded && post.content.length > 300 ? 'line-clamp-6' : ''
                            }`}>
                            {post.content}
                        </p>
                        {post.content.length > 300 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-[var(--ig-blue)] text-sm font-medium mt-2 hover:text-[var(--ig-blue-hover)] transition-colors"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span key={tag} className="tag">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--ig-border)]">
                        <span className="text-xs text-[var(--ig-text-secondary)]">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="text-xs font-medium px-3 py-1 bg-[var(--ig-secondary)] rounded-full text-[var(--ig-text-secondary)] uppercase">
                            {post.type}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
