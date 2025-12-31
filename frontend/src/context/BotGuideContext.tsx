"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BotStep {
    targetId: string;
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    path?: string;
}

interface BotGuideContextType {
    isActive: boolean;
    currentStep: number;
    steps: BotStep[];
    startGuide: () => void;
    stopGuide: () => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (index: number) => void;
}

const steps: BotStep[] = [
    {
        targetId: 'guide-button',
        title: 'Greetings!',
        content: "Hi there! I'm your Portfolio Assistant. I'll walk you through Niyaz's amazing projects and features.",
        position: 'right',
        path: '/'
    },
    {
        targetId: 'nav-home',
        title: 'Main Feed',
        content: "This is where you can see all the latest projects and updates. Everything is built with React and Next.js!",
        position: 'right',
        path: '/'
    },
    {
        targetId: 'nav-search',
        title: 'Direct Search',
        content: 'Quickly find specific skills like TypeScript, Python, or even your favorite project titles.',
        position: 'right',
        path: '/search'
    },
    {
        targetId: 'nav-explore',
        title: 'Discover Content',
        content: 'The Explore page helps you discover more of Niyaz\'s creative works and blog posts.',
        position: 'right',
        path: '/explore'
    },
    {
        targetId: 'nav-reels',
        title: 'Video Demos',
        content: 'Check out the Reels section for live demos and short-form video content of the projects.',
        position: 'right',
        path: '/reels'
    },
    {
        targetId: 'nav-messages',
        title: 'Let\'s Connect',
        content: 'Want to collaborate? Send a message directly through this feature-rich messaging system.',
        position: 'right',
        path: '/messages'
    },
    {
        targetId: 'nav-notifications',
        title: 'Activity Hub',
        content: 'Keep track of all interactions, likes, and follows on the portfolio.',
        position: 'right',
        path: '/notifications'
    },
    {
        targetId: 'nav-create',
        title: 'Creative Mode',
        content: 'Explore how Niyaz creates content and manages the portfolio backend.',
        position: 'right',
        path: '/create'
    },
    {
        targetId: 'nav-profile',
        title: 'Full Biography',
        content: 'View the detailed profile, professional history, education, and all social links.',
        position: 'right',
        path: '/profile'
    },
    {
        targetId: 'more-button',
        title: 'Settings',
        content: 'Switch between Dark and Light mode, or find more options here. Enjoy your tour!',
        position: 'right',
        path: '/'
    }
];

const BotGuideContext = createContext<BotGuideContextType | undefined>(undefined);

export function BotGuideProvider({ children }: { children: ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const startGuide = () => {
        setIsActive(true);
        setCurrentStep(0);
    };

    const stopGuide = () => {
        setIsActive(false);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            stopGuide();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const goToStep = (index: number) => {
        if (index >= 0 && index < steps.length) {
            setCurrentStep(index);
        }
    };

    return (
        <BotGuideContext.Provider value={{
            isActive,
            currentStep,
            steps,
            startGuide,
            stopGuide,
            nextStep,
            prevStep,
            goToStep
        }}>
            {children}
        </BotGuideContext.Provider>
    );
}

export function useBotGuide() {
    const context = useContext(BotGuideContext);
    if (context === undefined) {
        throw new Error('useBotGuide must be used within a BotGuideProvider');
    }
    return context;
}
