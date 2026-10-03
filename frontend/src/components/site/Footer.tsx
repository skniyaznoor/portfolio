import { profile } from "@/data/portfolio";

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="container-x py-12">
                <div className="font-serif text-[18vw] leading-[0.8] tracking-tighter text-line select-none md:text-[12rem]" aria-hidden>
                    Niyaz<span className="text-accent/40">.</span>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
                    <p>
                        © {new Date().getFullYear()} {profile.name}. Written in code and coffee.
                    </p>
                    <div className="flex gap-5">
                        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">GitHub</a>
                        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">LinkedIn</a>
                        <a href={profile.links.website} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">Writing</a>
                        <a href="#top" className="link-underline hover:text-fg">Top ↑</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
