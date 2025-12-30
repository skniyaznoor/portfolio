import Navigation from '@/components/layout/Navigation';
import Stories from '@/components/feed/Stories';
import PostCard from '@/components/feed/PostCard';
import Suggestions from '@/components/feed/Suggestions';
import { projects } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Navigation />
      <div className="flex-1 xl:ml-64 ml-20 flex justify-center">
        <div className="max-w-[935px] w-full flex justify-center gap-8 px-4 pt-8">
          <div className="max-w-[630px] w-full">
            <Stories />
            <div className="mt-8">
              {projects.map((project) => (
                <PostCard key={project.id} post={project} />
              ))}
            </div>
          </div>
          <Suggestions />
        </div>
      </div>
    </main>
  );
}
