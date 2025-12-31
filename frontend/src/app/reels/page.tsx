'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import ReelItem from '@/components/reels/ReelItem';
import FeatureReel from '@/components/reels/FeatureReel';
import { projects } from '@/data/portfolio';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isScrolling = useRef(false);

    const featureTypes: ('chat' | 'tasks' | 'metrics' | 'code')[] = ['chat', 'tasks', 'metrics', 'code'];

    const reelsContent = projects.flatMap((project, index) => {
        const featureType = featureTypes[index % featureTypes.length];
        return [
            { type: 'project' as const, data: project, key: `project-${project.id}` },
            { type: 'feature' as const, featureType, data: project, key: `feature-${project.id}` }
        ];
    });

    const scrollToIndex = (index: number) => {
        if (containerRef.current) {
            const children = containerRef.current.children;
            if (children[index]) {
                children[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    useEffect(() => {
        const index = searchParams.get('index');
        if (index) {
            const parsedIndex = parseInt(index);
            if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < reelsContent.length) {
                if (parsedIndex !== currentIndex) {
                    setCurrentIndex(parsedIndex);
                    scrollToIndex(parsedIndex);
                }
            }
        }
    }, [searchParams, reelsContent.length]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observerOptions = {
            root: container,
            threshold: 0.6,
        };

        let timeoutId: NodeJS.Timeout;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(container.children).indexOf(entry.target);
                    if (index !== -1 && index !== currentIndex) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            setCurrentIndex(index);
                            const url = new URL(window.location.href);
                            url.searchParams.set('index', index.toString());
                            window.history.replaceState({}, '', url.toString());
                        }, 50);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        Array.from(container.children).forEach((child) => observer.observe(child));

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [reelsContent.length, currentIndex]);

    return (
        <main className="flex h-screen overflow-hidden">
            <Navigation />

            <div className="flex-1 xl:ml-64 ml-20 relative h-full flex justify-center">
                <div
                    ref={containerRef}
                    className="w-full max-w-[935px] h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
                    style={{ scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
                >
                    {reelsContent.map((item, index) => (
                        item.type === 'project' ? (
                            <ReelItem key={item.key} project={item.data} />
                        ) : (
                            <FeatureReel
                                key={item.key}
                                featureType={item.featureType}
                                project={item.data}
                            />
                        )
                    ))}
                </div>
            </div>
        </main>
    );
}
