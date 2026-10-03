import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import type { Repo } from "@/lib/github";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const langColor: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    PHP: "#4f5d95",
    Python: "#3572a5",
    HTML: "#e34c26",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function GitHub({ repos }: { repos: Repo[] }) {
    const counts = repos.reduce<Record<string, number>>((acc, r) => {
        if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
        return acc;
    }, {});
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return (
        <section id="github" className="border-t border-line py-24 md:py-32">
            <div className="container-x">
                <SectionHeading
                    index="04"
                    eyebrow="Open source"
                    title={
                        <>
                            On <span className="italic">GitHub</span>.
                        </>
                    }
                    intro="Public repositories, pulled live from the GitHub API. Most client work lives in private repos. The case studies above describe it."
                />

                <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
                    <Reveal>
                        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="group card flex h-full flex-col p-7 transition-colors hover:border-fg/30">
                            <div className="flex items-center gap-4">
                                <span className="grid h-14 w-14 place-items-center rounded-full bg-fg text-bg">
                                    <Github size={26} />
                                </span>
                                <div>
                                    <div className="font-medium">{profile.name}</div>
                                    <div className="font-mono text-sm text-muted">@skniyaznoor</div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="eyebrow mb-3">Languages</div>
                                <div className="flex h-2 overflow-hidden rounded-full bg-line">
                                    {languages.map(([lang, n]) => (
                                        <span key={lang} style={{ width: `${(n / total) * 100}%`, background: langColor[lang] ?? "var(--muted)" }} />
                                    ))}
                                </div>
                                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                                    {languages.map(([lang, n]) => (
                                        <li key={lang} className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full" style={{ background: langColor[lang] ?? "var(--muted)" }} />
                                            {lang} <span className="font-mono">{Math.round((n / total) * 100)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-8 text-sm">
                                <span className="font-mono text-muted">{repos.length} public repos</span>
                                <span className="inline-flex items-center gap-1 font-medium transition-colors group-hover:text-accent">
                                    Follow <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </a>
                    </Reveal>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {repos.slice(0, 6).map((r, i) => (
                            <Reveal key={r.name} delay={(i % 2) * 0.06}>
                                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group card flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-fg/30">
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="font-mono text-sm font-medium break-all">{r.name}</span>
                                        <ArrowUpRight size={15} className="shrink-0 text-muted transition-all group-hover:rotate-45 group-hover:text-accent" />
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{r.description ?? "No description yet."}</p>
                                    <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-[11px] text-muted">
                                        {r.language && (
                                            <span className="flex items-center gap-1.5">
                                                <span className="h-2 w-2 rounded-full" style={{ background: langColor[r.language] ?? "var(--muted)" }} />
                                                {r.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={11} /> {r.stars}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork size={11} /> {r.forks}
                                        </span>
                                        <span className="ml-auto">{formatDate(r.pushedAt)}</span>
                                    </div>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
