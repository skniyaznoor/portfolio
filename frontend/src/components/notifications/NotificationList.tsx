"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, UserPlus, MessageCircle, AtSign, Check, X } from 'lucide-react';
import { notificationsData, type Notification } from '@/data/portfolio';

const NotificationItem = ({ item }: { item: Notification }) => {
    const renderIcon = () => {
        switch (item.type) {
            case 'like':
                return (
                    <div className="absolute -right-1 -bottom-1 bg-[#FF3040] rounded-full p-1 border-2 border-[var(--background)] ring-1 ring-black/5">
                        <Heart className="w-2 h-2 text-white fill-current" />
                    </div>
                );
            case 'follow':
            case 'follow_request':
                return (
                    <div className="absolute -right-1 -bottom-1 bg-[#0095F6] rounded-full p-1 border-2 border-[var(--background)] ring-1 ring-black/5">
                        <UserPlus className="w-2 h-2 text-white" />
                    </div>
                );
            case 'comment':
                return (
                    <div className="absolute -right-1 -bottom-1 bg-[var(--background)] border border-[var(--border)] rounded-full p-1 shadow-sm">
                        <MessageCircle className="w-2 h-2 text-[var(--foreground)]" />
                    </div>
                );
            case 'mention':
                return (
                    <div className="absolute -right-1 -bottom-1 bg-[#A203F2] rounded-full p-1 border-2 border-[var(--background)] ring-1 ring-black/5">
                        <AtSign className="w-2 h-2 text-white" />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderAction = () => {
        if (item.type === 'follow') {
            return (
                <button className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${item.isFollowing
                    ? 'bg-[var(--hover-overlay)] text-[var(--foreground)]'
                    : 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90'
                    }`}>
                    {item.isFollowing ? 'Following' : 'Follow'}
                </button>
            );
        }
        if (item.type === 'follow_request') {
            return (
                <div className="flex gap-2 text-white">
                    <button className="bg-[var(--accent)] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[var(--accent)]/90 transition-colors flex items-center gap-1">
                        Confirm
                    </button>
                    <button className="bg-[var(--hover-overlay)] px-4 py-1.5 rounded-lg text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)]/20 transition-colors">
                        Delete
                    </button>
                </div>
            );
        }
        if (item.targetImage) {
            return (
                <div className="w-10 h-10 relative flex-shrink-0 rounded-sm overflow-hidden border border-[var(--border)]">
                    <Image src={item.targetImage} alt="Post" fill className="object-cover" />
                </div>
            );
        }
        return null;
    };

    const renderText = () => {
        const username = <span className="font-bold mr-1">{item.user.username}</span>;

        switch (item.type) {
            case 'like':
                if (item.multipleCount) {
                    return <span>{username} and {item.multipleCount} others liked your photo.</span>;
                }
                return <span>{username} liked your photo.</span>;
            case 'follow':
                return <span>{username} started following you.</span>;
            case 'comment':
                return <span>{username} commented: "{item.content}"</span>;
            case 'mention':
                return <span>{username} mentioned you in a comment.</span>;
            case 'follow_request':
                return <span>{username} requested to follow you.</span>;
            default:
                return null;
        }
    };

    return (
        <div className={`flex items-center justify-between p-4 hover:bg-[var(--hover-overlay)] transition-colors cursor-pointer rounded-xl`}>
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 relative rounded-full overflow-hidden border border-[var(--border)]">
                        <Image src={item.user.avatar} alt={item.user.username} fill className="object-cover" />
                    </div>
                    {renderIcon()}
                </div>
                <div className="text-sm text-[var(--foreground)] leading-tight overflow-hidden">
                    <div className="line-clamp-2">
                        {renderText()}
                        <span className="text-[var(--secondary)] ml-2 whitespace-nowrap">{item.time}</span>
                    </div>
                </div>
            </div>
            <div className="ml-4 flex-shrink-0">
                {renderAction()}
            </div>
        </div>
    );
};

export default function NotificationList() {
    return (
        <div className="w-full max-w-[600px] mx-auto py-8">
            <h1 className="text-2xl font-bold mb-8 px-4">Notifications</h1>

            <div className="space-y-8">
                {notificationsData.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                        <h2 className="text-base font-bold px-4 text-[var(--foreground)]">{section.section}</h2>
                        <div className="flex flex-col">
                            {section.items.map(notification => (
                                <NotificationItem key={notification.id} item={notification} />
                            ))}
                        </div>
                        {idx < notificationsData.length - 1 && (
                            <div className="mt-6 border-b border-[var(--border)] mx-4"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
