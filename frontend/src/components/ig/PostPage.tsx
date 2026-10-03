"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/portfolio";
import GridTile from "./GridTile";
import PostDetail from "./PostDetail";

export default function PostPage({ slug }: { slug: string }) {
    const project = projects.find((p) => p.slug === slug)!;
    const more = projects.filter((p) => p.slug !== slug).slice(0, 6);

    return (
        <div>
            <header className="sticky top-0 z-30 flex h-[44px] items-center gap-4 border-b border-line bg-bg px-4 md:hidden">
                <Link href="/" aria-label="Back"><ArrowLeft size={24} /></Link>
                <span className="font-semibold">Post</span>
            </header>
            <PostDetail project={project} variant="page" />
            <div className="mx-auto max-w-[935px] border-t border-line pt-10 pb-16 md:mt-10">
                <h2 className="mb-4 px-4 text-sm font-semibold text-muted md:px-0">
                    More posts from <Link href="/profile" className="text-fg">skniyaznoor</Link>
                </h2>
                <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                    {more.map((p) => <GridTile key={p.slug} project={p} />)}
                </div>
            </div>
        </div>
    );
}
