'use client';

import FeedCard from '@/components/FeedCard';
import { posts } from '@/data/portfolio-data';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const itemHeight = container.clientHeight;
      const index = Math.round(scrollPosition / itemHeight);
      setCurrentIndex(index);

      if (scrollPosition > 100) {
        setShowScrollHint(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-container hide-scrollbar pt-16 md:pt-16 pb-16 md:pb-0"
      >
        {posts.map((post, index) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>

      {/* Scroll Indicator */}
      {showScrollHint && currentIndex === 0 && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse pointer-events-none z-40">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[var(--ig-text-secondary)] font-medium">
              Scroll to explore
            </span>
            <ChevronDown size={24} className="text-[var(--ig-text-secondary)] animate-bounce" />
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col gap-2 z-40">
        {posts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-white scale-150'
                : 'bg-[var(--ig-border)]'
              }`}
          />
        ))}
      </div>
    </main>
  );
}
