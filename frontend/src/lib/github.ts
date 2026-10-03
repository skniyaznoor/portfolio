export interface Repo {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    url: string;
    homepage: string | null;
    pushedAt: string;
}

const USER = "skniyaznoor";

// Used when the GitHub API is unreachable or rate-limited at build time
const fallback: Repo[] = [
    { name: "niyazunveiled", description: "Author platform & book launch site for Coffee?", language: "JavaScript", stars: 0, forks: 0, url: `https://github.com/${USER}/niyazunveiled`, homepage: "https://www.niyazunveiled.com", pushedAt: "2026-10-03" },
    { name: "Resume-Short-Lister", description: "DocIntel AI: multilingual legal document simplifier", language: "TypeScript", stars: 0, forks: 0, url: `https://github.com/${USER}/Resume-Short-Lister`, homepage: null, pushedAt: "2026-04-29" },
    { name: "filament-quick-form", description: "Dynamic form builder with customization for Laravel Filament", language: "PHP", stars: 1, forks: 0, url: `https://github.com/${USER}/filament-quick-form`, homepage: null, pushedAt: "2025-12-29" },
    { name: "LeaveManagementSystem", description: null, language: "PHP", stars: 1, forks: 0, url: `https://github.com/${USER}/LeaveManagementSystem`, homepage: null, pushedAt: "2024-10-15" },
    { name: "BloodBankManagement", description: null, language: "PHP", stars: 1, forks: 0, url: `https://github.com/${USER}/BloodBankManagement`, homepage: null, pushedAt: "2024-08-11" },
];

const descriptions: Record<string, string> = {
    niyazunveiled: "Author platform & launch site for the novel Coffee?: Next.js 16, Firebase, Resend",
    "filament-quick-form": "Runtime form builder package for Laravel Filament",
    "Resume-Short-Lister": "DocIntel AI: OCR, translation and plain-language summaries for legal documents",
    LeaveManagementSystem: "Leave application and approval workflow in PHP & MySQL",
    BloodBankManagement: "Blood bank donor and inventory management in PHP & MySQL",
};

export async function getRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: 86400 },
        });
        if (!res.ok) return fallback;
        const data: Array<Record<string, unknown>> = await res.json();
        return data
            .filter((r) => !r.fork && r.name !== USER)
            .map((r) => ({
                name: r.name as string,
                description: descriptions[r.name as string] ?? (r.description as string | null),
                language: r.language as string | null,
                stars: r.stargazers_count as number,
                forks: r.forks_count as number,
                url: r.html_url as string,
                homepage: (r.homepage as string | null) || null,
                pushedAt: r.pushed_at as string,
            }));
    } catch {
        return fallback;
    }
}
