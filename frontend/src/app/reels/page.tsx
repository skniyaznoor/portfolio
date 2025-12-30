import Navigation from '@/components/layout/Navigation';
import ReelItem from '@/components/reels/ReelItem';
import { projects } from '@/data/portfolio';

export default function Page() {
    return (
        <main className="flex h-screen overflow-hidden">
            <Navigation />

            {/* Reels Container */}
            <div className="flex-1 xl:ml-64 ml-20 relative h-full flex justify-center">
                <div className="w-full max-w-[935px] h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                    {projects.map((project) => (
                        <ReelItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}
