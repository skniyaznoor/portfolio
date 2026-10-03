import { book, profile, projects, writing } from "./portfolio";

export const account = {
    username: "skniyaznoor",
    brand: "Niyazion",
    category: "Software Engineer · Author",
    bio: [
        "Full-stack engineer shipping AI products 🤖",
        "NestJS · Next.js · Claude · Three.js",
        "Author of “Coffee?” ☕ out now",
        "📍 Bhubaneswar, India",
    ],
    stats: [
        { value: String(projects.length), label: "posts" },
        { value: "2+", label: "yrs shipping" },
        { value: "24+", label: "stories written" },
    ],
};

/* ---------- Posts ---------- */

export interface PostMeta {
    metric: string;
    location: string;
}

export const postMeta: Record<string, PostMeta> = {
    "ai-data-intelligence-platform": { metric: "414 commits · ~52K lines · 4 months", location: "Production · Client project" },
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

export type StoryFrame =
    | { kind: "text"; eyebrow?: string; title: string; body?: string; bg: string }
    | { kind: "stat"; value: string; label: string; body?: string; bg: string }
    | { kind: "list"; title: string; items: string[]; bg: string }
    | { kind: "image"; src: string; caption?: string };

export interface StoryGroup {
    id: string;
    label: string;
    cover: { image: string } | { emoji: string; bg: string };
    frames: StoryFrame[];
    cta?: { label: string; href: string };
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

export const stories: StoryGroup[] = [
    {
        id: "now",
        label: "Now",
        cover: { image: profile.avatar },
        frames: [
            { kind: "text", eyebrow: "Currently", title: "Building Claude chat that cites its sources", body: "RAG, phrase-level ranking and citations highlighted in the source document.", bg: g.royal },
            { kind: "text", eyebrow: "Just shipped", title: "HellBall 🔥", body: "A WebGL hover-bike racer inside a burning steel sphere.", bg: g.ember },
            { kind: "text", eyebrow: "Just published", title: "Coffee? ☕", body: "My debut novel is out in paperback and hardcover.", bg: g.coffee },
        ],
    },
    {
        id: "coffee",
        label: "Coffee?",
        cover: { image: book.front },
        frames: [
            { kind: "image", src: book.front, caption: "My debut novel. Out now ☕" },
            { kind: "text", eyebrow: book.subtitle, title: "Some people enter our lives quietly.", body: "A conversation becomes a habit. A habit becomes comfort.", bg: g.coffee },
            { kind: "image", src: book.back, caption: "Paperback & hardcover · Notion Press" },
        ],
        cta: { label: "Get the book", href: book.stores[0].url },
    },
    {
        id: "ai",
        label: "AI work",
        cover: { emoji: "🤖", bg: g.royal },
        frames: [
            { kind: "stat", value: "414", label: "commits in 4 months", body: "~52K lines across a NestJS + Next.js AI platform.", bg: g.royal },
            { kind: "list", title: "What I built", items: ["Claude chat + RAG + citations", "Redis semantic cache", "LLM contract change detection", "Microsoft Graph mail pipeline"], bg: g.ocean },
            { kind: "text", eyebrow: "Grounding", title: "Every answer cites its source", body: "Highlighted in the original document with the CSS Custom Highlight API.", bg: g.ink },
        ],
        cta: { label: "Read the case study", href: "/p/ai-data-intelligence-platform" },
    },
    {
        id: "hellball",
        label: "HellBall",
        cover: { emoji: "🔥", bg: g.ember },
        frames: [
            { kind: "text", eyebrow: "Physics", title: "Stay on the wall only while v²/r > g", body: "Slow down at the top and you fall.", bg: g.ember },
            { kind: "list", title: "Built from scratch", items: ["Custom GLSL fire shaders", "Hazard-predicting AI rivals", "Audio synthesised in code", "9-state cinematic game flow"], bg: g.ink },
        ],
        cta: { label: "See the post", href: "/p/hellball" },
    },
    {
        id: "github",
        label: "GitHub",
        cover: { emoji: "🐙", bg: g.ink },
        frames: [
            { kind: "text", eyebrow: "Open source", title: "@skniyaznoor on GitHub", body: "DocIntel AI, filament-quick-form, niyazunveiled and more.", bg: g.ink },
        ],
        cta: { label: "Open GitHub", href: profile.links.github },
    },
    {
        id: "writing",
        label: "Writing",
        cover: { image: profile.authorPhoto },
        frames: [
            { kind: "stat", value: "24+", label: "stories & poems", body: "Writing since 2020 on niyazunveiled.com", bg: g.sunset },
            { kind: "list", title: "Start reading", items: writing.slice(0, 5).map((w) => `${w.title} · ${w.type}`), bg: g.coffee },
        ],
        cta: { label: "Read on niyazunveiled.com", href: profile.links.website },
    },
    {
        id: "experience",
        label: "Experience",
        cover: { emoji: "💼", bg: g.ocean },
        frames: [
            { kind: "text", eyebrow: "Oct 2024 — Present", title: "HyScaler", body: "Junior Technical Programmer · Full-stack & AI systems", bg: g.ocean },
            { kind: "text", eyebrow: "Apr — Aug 2024", title: "Bourntec Solutions", body: "Junior Developer (Intern) · Flask, React, Django", bg: g.ink },
            { kind: "text", eyebrow: "2023", title: "Silicon Institute of Technology", body: "Web Developer Intern · MEAN / MERN", bg: g.royal },
        ],
        cta: { label: "Download resume", href: profile.resume },
    },
    {
        id: "skills",
        label: "Stack",
        cover: { emoji: "⚡", bg: g.mint },
        frames: [
            { kind: "list", title: "Backend", items: ["NestJS · Node.js", "Prisma · PostgreSQL", "Redis · BullMQ", "Socket.IO · Laravel"], bg: g.mint },
            { kind: "list", title: "Frontend", items: ["React 19 · Next.js", "Tailwind · Framer Motion", "Three.js · GLSL", "GSAP · Web Audio"], bg: g.royal },
            { kind: "list", title: "AI & LLM", items: ["Claude API", "RAG & citation grounding", "Semantic caching", "MCP-style tools"], bg: g.ink },
        ],
    },
    {
        id: "education",
        label: "Education",
        cover: { emoji: "🎓", bg: g.sunset },
        frames: [
            { kind: "text", eyebrow: "2022 — 2024", title: "MCA", body: "Silicon Institute of Technology, Silicon University", bg: g.sunset },
            { kind: "text", eyebrow: "2018 — 2021", title: "B.Sc. Physics", body: "Dharmasala Mahavidyalaya, Utkal University", bg: g.ocean },
            { kind: "list", title: "Certifications", items: ["NPTEL · Internet of Things (2023)", "CTTC · ACCSA (2021)"], bg: g.ink },
        ],
    },
    {
        id: "contact",
        label: "Say hi",
        cover: { emoji: "👋", bg: g.sunset },
        frames: [
            { kind: "text", eyebrow: "Let's build something", title: "My DMs are open", body: "A role, a freelance project or a note about the book.", bg: g.sunset },
        ],
        cta: { label: "Send a message", href: "/messages" },
    },
];

export const feedStoryIds = ["now", "coffee", "ai", "hellball", "github", "writing", "experience", "skills", "education", "contact"];
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
    { when: "2026", group: "This year", text: "reached 414 commits (~52K lines) on an AI data-intelligence platform in 4 months", slug: "ai-data-intelligence-platform" },
    { when: "Apr 2026", group: "This year", text: "open-sourced DocIntel AI, a multilingual legal-document simplifier", slug: "docintel-ai" },
    { when: "Dec 2025", group: "2025", text: "published filament-quick-form on GitHub", slug: "filament-quick-form" },
    { when: "2025", group: "2025", text: "delivered the BRR Hallmark Developers website as a freelance project", slug: "brr-hallmark" },
    { when: "Oct 2024", group: "Earlier", text: "joined HyScaler as a Junior Technical Programmer 💼", thumb: profile.avatar },
    { when: "2024", group: "Earlier", text: "completed an MCA at Silicon Institute of Technology 🎓", thumb: profile.avatar },
    { when: "Apr 2024", group: "Earlier", text: "started as a Junior Developer intern at Bourntec Solutions", thumb: profile.avatar },
    { when: "2020", group: "Earlier", text: "started writing stories and poems as Niyaz Unveiled ✍️", thumb: profile.authorPhoto, href: profile.links.website },
];
