import Navigation from '@/components/layout/Navigation';
import SearchHeader from '@/components/explore/SearchHeader';
import ExploreGrid from '@/components/explore/ExploreGrid';

export default function ExplorePage() {
    return (
        <main className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20">
                <div className="max-w-5xl mx-auto px-4 w-full">
                    <SearchHeader />
                    <ExploreGrid />
                </div>
            </div>
        </main>
    );
}
