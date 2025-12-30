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
            { type: 'feature' as const, featureType, projectTitle: project.title, key: `feature-${project.id}` }
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
                setCurrentIndex(parsedIndex);
                scrollToIndex(parsedIndex);
            }
        }
    }, [searchParams, reelsContent.length]); // Added reelsContent.length to dependencies for completeness

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isScrolling.current) return;

            const scrollTop = container.scrollTop;
            // Assuming each reel item takes up the full height of the container
            const itemHeight = container.clientHeight;
            const newIndex = Math.round(scrollTop / itemHeight);

            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < reelsContent.length) {
                isScrolling.current = true;
                setCurrentIndex(newIndex);
                router.push(`/reels?index=${newIndex}`, { scroll: false });

                // Prevent immediate re-triggering of scroll event
                setTimeout(() => {
                    isScrolling.current = false;
                }, 500); // Adjust timeout as needed
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [currentIndex, reelsContent.length, router]);

    return (
        <main className="flex h-screen overflow-hidden">
            <Navigation />

            {/* Reels Container */}
            <div className="flex-1 xl:ml-64 ml-20 relative h-full flex justify-center">
                <div
                    ref={containerRef}
                    className="w-full max-w-[935px] h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                >
                    {reelsContent.map((item, index) => (
                        item.type === 'project' ? (
                            <ReelItem key={item.key} project={item.data} />
                        ) : (
                            <FeatureReel
                                key={item.key}
                                featureType={item.featureType}
                                projectTitle={item.projectTitle}
                            />
                        )
                    ))}
                </div>
            </div>
        </main>
    );
}
