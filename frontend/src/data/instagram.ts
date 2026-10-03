import { book, profile, projects, writing } from "./portfolio";

export const account = {
    username: "skniyaznoor",
    brand: "Niyazion",
    category: "SDE-1 · Software Engineer · Author",
    bio: [
        "Full-stack engineer shipping AI products 🤖",
        "NestJS · Next.js · Claude · Three.js",
        "Author of “Coffee?” ☕ out now",
        "📍 Bhubaneswar, India",
    ],
    stats: [
        { value: String(projects.length), label: "posts" },
        { value: "2.1K+", label: "commits" },
        { value: "24+", label: "stories written" },
    ],
};

/* ---------- Posts ---------- */

export interface PostMeta {
    metric: string;
    location: string;
}

export const postMeta: Record<string, PostMeta> = {
    "ai-data-intelligence-platform": { metric: "415 commits · ~52K lines · 4 months", location: "Production · Client project" },
    hellball: { metric: "~4,000 lines · 17 ES modules · 0 sound files", location: "Globe of Death 🔥" },
    niyazunveiled: { metric: "25+ pre-rendered stories · live on Vercel", location: "niyazunveiled.com" },
    "docintel-ai": { metric: "100+ languages · 4 ML models", location: "Open source" },
    "brr-hallmark": { metric: "Freelance · live in production", location: "Bangalore, India" },
    "live-broadcast-platform": { metric: "YouTube Live · Socket.IO", location: "Client project" },
    "telemedicine-app": { metric: "HIPAA / GDPR-minded design", location: "Client project" },
    "exam-portal": { metric: "Cheat-resistant by design", location: "Client project" },
    "filament-quick-form": { metric: "Open-source Laravel package", location: "GitHub" },
};

export const hashtag = (s: string) => "#" + s.toLowerCase().replace(/[^a-z0-9]/g, "");

/* ---------- Stories & highlights ---------- */

export type Sticker =
    | { type: "link"; label: string; href: string }
    | { type: "poll"; question: string; options: [string, string] }
    | { type: "quiz"; question: string; options: string[]; answer: number }
    | { type: "slider"; question: string; emoji: string };

type FrameBody =
    | { kind: "text"; eyebrow?: string; title: string; body?: string; bg: string }
    | { kind: "stat"; value: string; label: string; body?: string; bg: string }
    | { kind: "list"; title: string; items: string[]; bg: string }
    | { kind: "image"; src: string; caption?: string; title?: string; fit?: "cover" | "contain" };

export type StoryFrame = FrameBody & { sticker?: Sticker };

export interface StoryGroup {
    id: string;
    label: string;
    when: string;
    cover: { image: string } | { emoji: string; bg: string };
    frames: StoryFrame[];
}

const g = {
    sunset: "linear-gradient(160deg,#833ab4 0%,#fd1d1d 55%,#fcb045 100%)",
    ocean: "linear-gradient(160deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
    ember: "linear-gradient(160deg,#1a0b05 0%,#5c1a07 50%,#ff5a1f 100%)",
    coffee: "linear-gradient(160deg,#0b0806 0%,#2b1a10 60%,#7a4a26 100%)",
    ink: "linear-gradient(160deg,#000000 0%,#1c1c1c 100%)",
    royal: "linear-gradient(160deg,#4f5bd5 0%,#962fbf 60%,#d62976 100%)",
    mint: "linear-gradient(160deg,#0f3d3e 0%,#11998e 60%,#38ef7d 100%)",
};

const img = (slug: string, i = 0) => projects.find((p) => p.slug === slug)!.images[i];

export const stories: StoryGroup[] = [
    {
        id: "now",
        label: "Now",
        when: "Today",
        cover: { image: profile.avatar },
        frames: [
            { kind: "image", src: img("ai-data-intelligence-platform"), title: "Currently building", caption: "Claude chat that cites its sources, with every answer grounded in the original document.", sticker: { type: "link", label: "Read the case study", href: "/p/ai-data-intelligence-platform" } },
            { kind: "image", src: img("hellball"), title: "Just shipped HellBall 🔥", caption: "A WebGL hover-bike racer inside a burning steel sphere.", sticker: { type: "quiz", question: "What keeps the rider on the wall?", options: ["Magnets 🧲", "v²/r > g", "Pure luck 🍀"], answer: 1 } },
            { kind: "image", src: book.front, fit: "contain", title: "Just published ☕", caption: "My debut novel, Coffee?", sticker: { type: "poll", question: "Have you read Coffee?", options: ["Yes! ☕", "Not yet"] } },
        ],
    },
    {
        id: "coffee",
        label: "Coffee?",
        when: "2026",
        cover: { image: book.front },
        frames: [
            { kind: "image", src: book.front, fit: "contain", caption: "My debut novel. Out now ☕" },
            { kind: "text", eyebrow: book.subtitle, title: "Some people enter our lives quietly.", body: "A conversation becomes a habit. A habit becomes comfort.", bg: g.coffee, sticker: { type: "slider", question: "How much do you love slow-burn love stories?", emoji: "😍" } },
            { kind: "image", src: book.back, fit: "contain", caption: "Paperback & hardcover · Notion Press", sticker: { type: "link", label: "Get the book", href: book.stores[0].url } },
        ],
    },
    {
        id: "ai",
        label: "AI work",
        when: "2026",
        cover: { image: img("ai-data-intelligence-platform") },
        frames: [
            { kind: "stat", value: "415", label: "commits in 4 months", body: "~52K lines across a NestJS + Next.js AI platform.", bg: g.royal },
            { kind: "list", title: "What I built", items: ["Claude chat + RAG + citations", "Redis semantic cache", "LLM contract change detection", "Microsoft Graph mail pipeline"], bg: g.ocean },
            { kind: "image", src: img("ai-data-intelligence-platform"), title: "Every answer cites its source", caption: "Highlighted in the original document with the CSS Custom Highlight API.", sticker: { type: "link", label: "Read the case study", href: "/p/ai-data-intelligence-platform" } },
        ],
    },
    {
        id: "hellball",
        label: "HellBall",
        when: "Sep 2026",
        cover: { image: img("hellball") },
        frames: [
            { kind: "image", src: img("hellball", 2), title: "Enter the cage 🔥", caption: "Five laps. Three AI rivals. One burning Globe of Death." },
            { kind: "image", src: img("hellball"), caption: "Stay on the wall only while v²/r > g. Slow down at the top and you fall.", sticker: { type: "slider", question: "Would you race it?", emoji: "🔥" } },
            { kind: "list", title: "Built from scratch", items: ["Custom GLSL fire shaders", "Hazard-predicting AI rivals", "Audio synthesised in code", "9-state cinematic game flow"], bg: g.ember, sticker: { type: "link", label: "See the post", href: "/p/hellball" } },
        ],
    },
    {
        id: "freelance",
        label: "Freelance",
        when: "2025",
        cover: { image: img("brr-hallmark", 1) },
        frames: [
            { kind: "image", src: img("brr-hallmark"), title: "BRR Hallmark Developers", caption: "A lead-generating site for a Bangalore real-estate developer." },
            { kind: "image", src: img("brr-hallmark", 1), caption: "Completed, ongoing and upcoming projects with site-visit booking.", sticker: { type: "link", label: "Visit the site", href: "https://www.brrhallmarkdevelopers.in/" } },
        ],
    },
    {
        id: "github",
        label: "GitHub",
        when: "Live",
        cover: { emoji: "🐙", bg: g.ink },
        frames: [
            { kind: "image", src: img("docintel-ai"), title: "Open source", caption: "DocIntel AI, filament-quick-form, niyazunveiled and more on @skniyaznoor.", sticker: { type: "link", label: "Open GitHub", href: profile.links.github } },
        ],
    },
    {
        id: "writing",
        label: "Writing",
        when: "Since 2020",
        cover: { image: profile.authorPhoto },
        frames: [
            { kind: "stat", value: "24+", label: "stories & poems", body: "Writing since 2020 on niyazunveiled.com", bg: g.sunset },
            { kind: "image", src: img("niyazunveiled", 1), caption: "The platform I designed and built for my writing." },
            { kind: "list", title: "Start reading", items: writing.slice(0, 5).map((w) => `${w.title} · ${w.type}`), bg: g.coffee, sticker: { type: "link", label: "niyazunveiled.com", href: profile.links.website } },
        ],
    },
    {
        id: "experience",
        label: "Experience",
        when: "2024 — now",
        cover: { emoji: "💼", bg: g.ocean },
        frames: [
            { kind: "text", eyebrow: "Oct 2024 — Present", title: "SDE-1 at HyScaler", body: "Full-stack & AI systems: NestJS, Next.js, Prisma, Redis, Claude", bg: g.ocean },
            { kind: "stat", value: "2,100+", label: "commits across 10 client codebases", body: "~244K lines added since April 2025.", bg: g.royal },
            { kind: "text", eyebrow: "Apr — Aug 2024", title: "Bourntec Solutions", body: "Junior Developer (Intern) · Flask, React, Django", bg: g.ink },
            { kind: "text", eyebrow: "2023", title: "Silicon Institute of Technology", body: "Web Developer Intern · MEAN / MERN", bg: g.mint, sticker: { type: "link", label: "Download resume", href: profile.resume } },
        ],
    },
    {
        id: "skills",
        label: "Stack",
        when: "Always learning",
        cover: { emoji: "⚡", bg: g.mint },
        frames: [
            { kind: "list", title: "Backend", items: ["NestJS · Node.js", "Prisma · PostgreSQL", "Redis · BullMQ", "Socket.IO · Laravel"], bg: g.mint },
            { kind: "list", title: "Frontend", items: ["React 19 · Next.js", "Tailwind · Framer Motion", "Three.js · GLSL", "GSAP · Web Audio"], bg: g.royal },
            { kind: "list", title: "AI & LLM", items: ["Claude API", "RAG & citation grounding", "Semantic caching", "MCP-style tools"], bg: g.ink, sticker: { type: "poll", question: "Which should I write about next?", options: ["RAG grounding", "WebGL physics"] } },
        ],
    },
    {
        id: "education",
        label: "Education",
        when: "2018 — 2024",
        cover: { emoji: "🎓", bg: g.sunset },
        frames: [
            { kind: "text", eyebrow: "2022 — 2024", title: "MCA", body: "Silicon Institute of Technology, Silicon University", bg: g.sunset },
            { kind: "text", eyebrow: "2018 — 2021", title: "B.Sc. Physics", body: "Dharmasala Mahavidyalaya, Utkal University. Yes, that's where the v²/r comes from.", bg: g.ocean },
            { kind: "list", title: "Certifications", items: ["NPTEL · Internet of Things (2023)", "CTTC · ACCSA (2021)"], bg: g.ink },
        ],
    },
    {
        id: "contact",
        label: "Say hi",
        when: "Now",
        cover: { emoji: "👋", bg: g.sunset },
        frames: [
            { kind: "text", eyebrow: "Let's build something", title: "My DMs are open", body: "A role, a freelance project or a note about the book. Messages land straight in my inbox.", bg: g.sunset, sticker: { type: "link", label: "Send a message", href: "/messages" } },
        ],
    },
];

export const feedStoryIds = ["now", "coffee", "ai", "hellball", "freelance", "github", "writing", "experience", "skills", "education", "contact"];
export const highlightIds = ["coffee", "experience", "skills", "education", "writing", "contact"];

/* ---------- Activity ---------- */

export interface Activity {
    when: string;
    group: "This year" | "2025" | "Earlier";
    text: string;
    thumb?: string;
    slug?: string;
    href?: string;
}

export const activity: Activity[] = [
    { when: "2026", group: "This year", text: "published a novel: Coffee? A Slice-of-Life Love Story is out on Amazon, Flipkart and Notion Press ☕", thumb: book.front, href: book.stores[0].url },
    { when: "Sep 2026", group: "This year", text: "shipped HellBall, a Three.js racer inside a burning Globe of Death 🔥", slug: "hellball" },
    { when: "Aug 2026", group: "This year", text: "rebuilt niyazunveiled.com on Next.js 16, Firebase and Resend", slug: "niyazunveiled" },
    { when: "2026", group: "This year", text: "reached 415 commits (~52K lines) on an AI data-intelligence platform in 4 months", slug: "ai-data-intelligence-platform" },
    { when: "Apr 2026", group: "This year", text: "open-sourced DocIntel AI, a multilingual legal-document simplifier", slug: "docintel-ai" },
    { when: "Dec 2025", group: "2025", text: "published filament-quick-form on GitHub", slug: "filament-quick-form" },
    { when: "2025", group: "2025", text: "delivered the BRR Hallmark Developers website as a freelance project", slug: "brr-hallmark" },
    { when: "Oct 2024", group: "Earlier", text: "joined HyScaler, now working as an SDE-1 💼", thumb: profile.avatar },
    { when: "2024", group: "Earlier", text: "completed an MCA at Silicon Institute of Technology 🎓", thumb: profile.avatar },
    { when: "Apr 2024", group: "Earlier", text: "started as a Junior Developer intern at Bourntec Solutions", thumb: profile.avatar },
    { when: "2020", group: "Earlier", text: "started writing stories and poems as Niyaz Unveiled ✍️", thumb: profile.authorPhoto, href: profile.links.website },
];
