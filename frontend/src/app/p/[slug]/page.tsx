import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import PostPage from "@/components/ig/PostPage";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const p = projects.find((x) => x.slug === slug);
    if (!p) return {};
    return { title: `${p.title} · @skniyaznoor`, description: `${p.tagline}. ${p.summary}` };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();
    return <PostPage slug={project.slug} />;
}
