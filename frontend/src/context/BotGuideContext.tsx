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
        title: 'Meet Your Assistant',
        content: "I'm your digital concierge. I'll guide you through this high-performance portfolio. Ready to see what's possible?",
        position: 'right',
        path: '/'
    },
    {
        targetId: 'nav-home',
        title: 'Work Showcase',
        content: "The heart of the experience. Browse detailed project deep-dives, live links, and the stories behind the code.",
        position: 'right',
        path: '/'
    },
    {
        targetId: 'nav-search',
        title: 'Universal Search',
        content: 'Find anything instantly. From specific tech stacks to project titles, our global search indexed every detail for you.',
        position: 'right',
        path: '/search'
    },
    {
        targetId: 'nav-explore',
        title: 'Deep Discovery',
        content: 'View full project bios and technical specifications. See the exact technology stacks powering our modern implementations.',
        position: 'right',
        path: '/explore'
    },
    {
        targetId: 'nav-reels',
        title: 'Code In Motion',
        content: 'A vertical experience for rapid discovery. Scroll through live project demos and high-impact feature highlights.',
        position: 'right',
        path: '/reels'
    },
    {
        targetId: 'nav-notifications',
        title: 'Activity Hub',
        content: 'Stay connected with the pulse of the portfolio. Real-time updates and community engagement metrics live here.',
        position: 'right',
        path: '/notifications'
    },
    {
        targetId: 'nav-create',
        title: 'AMA Interaction',
        content: 'Have a burning question? Use our custom Ask Me Anything form to connect and collaborate directly.',
        position: 'right',
        path: '/create'
    },
    {
        targetId: 'nav-profile',
        title: 'Identity & Vision',
        content: 'Step into the designer\'s world. Explore the professional background, education, and social DNA behind the work.',
        position: 'right',
        path: '/profile'
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
