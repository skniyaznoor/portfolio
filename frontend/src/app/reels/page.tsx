import Navigation from '@/components/layout/Navigation';
import ReelItem from '@/components/reels/ReelItem';
import { projects } from '@/data/portfolio';

export default function Page() {
    return (
        <main className="flex h-screen bg-black overflow-hidden">
            <Navigation />

            {/* Reels Container */}
            <div className="flex-1 xl:ml-64 ml-20 relative h-full flex justify-center bg-black">
                <div className="w-full max-w-[900px] h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                    {projects.map((project) => (
                        <ReelItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}
