'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface ProjectChatProps {
    projectTitle: string;
    userAvatar?: string;
    conversation?: Message[];
}

export default function ProjectChat({
    projectTitle,
    userAvatar = '/images/profileimage.jpg',
    conversation
}: ProjectChatProps) {
    const defaultConversation: Message[] = [
        {
            sender: 'user',
            text: `Tell me about ${projectTitle}`,
        },
        {
            sender: 'ai',
            text: 'This project showcases modern web development practices with a focus on user experience.',
        },
        {
            sender: 'user',
            text: 'What technologies were used?',
        },
        {
            sender: 'ai',
            text: 'Built with Next.js, React, and TypeScript for a robust, type-safe application.',
        },
    ];

    const messages = conversation || defaultConversation;
    const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
    const [typedText, setTypedText] = useState('');
    const [msgIndex, setMsgIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [inputCharIndex, setInputCharIndex] = useState(0);

    const conversationRef = useRef(messages);

    useEffect(() => {
        conversationRef.current = messages;
    }, [messages]);

    const totalMessages = messages.length;
    const userTypingSpeed = 30;
    const aiTypingSpeed = 25;
    const pauseBetweenMessages = 600;
    const finalPause = 2000;

    useEffect(() => {
        const currentConversation = conversationRef.current;

        if (msgIndex < currentConversation.length) {
            const currentMessage = currentConversation[msgIndex];

            if (currentMessage.sender === 'user') {
                if (inputCharIndex < currentMessage.text.length) {
                    const timeout = setTimeout(() => {
                        setCurrentInput((prev) => prev + currentMessage.text[inputCharIndex]);
                        setInputCharIndex(inputCharIndex + 1);
                    }, userTypingSpeed);
                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setDisplayedMessages((prev) => [...prev, currentMessage]);
                        setCurrentInput('');
                        setInputCharIndex(0);
                        setMsgIndex(msgIndex + 1);
                    }, pauseBetweenMessages);
                    return () => clearTimeout(timeout);
                }
            } else {
                if (charIndex < currentMessage.text.length) {
                    const timeout = setTimeout(() => {
                        setTypedText((prev) => prev + currentMessage.text[charIndex]);
                        setCharIndex(charIndex + 1);
                    }, aiTypingSpeed);
                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setDisplayedMessages((prev) => [
                            ...prev,
                            { ...currentMessage, text: typedText },
                        ]);
                        setTypedText('');
                        setCharIndex(0);
                        setMsgIndex(msgIndex + 1);
                    }, pauseBetweenMessages);
                    return () => clearTimeout(timeout);
                }
            }
        } else {
            const timeout = setTimeout(() => {
                setDisplayedMessages([]);
                setTypedText('');
                setMsgIndex(0);
                setCharIndex(0);
                setCurrentInput('');
                setInputCharIndex(0);
            }, finalPause);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, msgIndex, typedText, inputCharIndex]);

    return (
        <div className="w-full h-full bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-lg flex flex-col justify-between overflow-hidden border border-gray-100 dark:border-gray-700/50">
            {/* Header */}
            <div className="flex items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <Image
                    src={userAvatar}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-[#1e293b] shadow-md object-cover mr-3"
                />
                <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm m-0">
                        Project Demo
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-xs">Active</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
                {displayedMessages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs animate-fadeIn ${msg.sender === 'user'
                            ? 'self-end bg-[#0095f6] text-white'
                            : 'self-start bg-gray-100 dark:bg-[#334155] text-gray-900 dark:text-gray-100'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {typedText && conversationRef.current[msgIndex]?.sender === 'ai' && (
                    <div className="max-w-[85%] px-3 py-2 rounded-xl text-xs self-start bg-gray-100 dark:bg-[#334155] text-gray-900 dark:text-gray-100">
                        {typedText}
                        <span className="opacity-60 animate-pulse">▌</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg px-3 py-2">
                    <input
                        type="text"
                        value={currentInput}
                        readOnly
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-xs"
                    />
                    {currentInput && (
                        <span className="text-gray-900 dark:text-gray-100 opacity-60 animate-pulse">
                            ▌
                        </span>
                    )}
                    <button className="text-gray-400 dark:text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <g transform="rotate(90 10 10)">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: rgba(156, 163, 175, 0.3);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
}
