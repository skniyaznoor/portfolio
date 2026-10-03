export const profile = {
    name: "Sk Niyaz Noor",
    firstName: "Niyaz",
    role: "Full-Stack Engineer",
    roles: ["Full-Stack Engineer", "AI Systems Builder", "Published Novelist"],
    location: "Bhubaneswar, Odisha, India",
    pitch:
        "I build production AI products end to end: Claude-powered assistants that cite their sources, mail pipelines that read contracts, and real-time systems on NestJS and Next.js. After hours I write fiction. My debut novel, Coffee?, is out now.",
    avatar: "/images/profileimage.jpg",
    authorPhoto: "/images/author.jpg",
    resume: "/pdf/Sk-Niyaz-Noor-Resume.pdf",
    email: "skniyaznoor23@gmail.com",
    phone: "+91 63722 71191",
    links: {
        github: "https://github.com/skniyaznoor",
        linkedin: "https://in.linkedin.com/in/sk-niyaz-noor-814810217",
        website: "https://www.niyazunveiled.com/",
        instagram: "https://www.instagram.com/niyazunveiled/",
    },
};

export const stats = [
    { value: "2+", label: "Years shipping production code" },
    { value: "414", label: "Commits in 4 months on one AI platform" },
    { value: "24+", label: "Stories & poems published" },
    { value: "1", label: "Published novel" },
];

export interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    summary: string;
    points: string[];
    stack: string[];
}

export const experience: Experience[] = [
    {
        company: "HyScaler",
        role: "Junior Technical Programmer · Full-Stack",
        period: "Oct 2024 — Present",
        location: "Bhubaneswar",
        summary:
            "Full-stack engineer on client and internal products, from an AI data-intelligence platform to live streaming, healthcare and assessment systems.",
        points: [
            "Built the AI layer of a vendor-contract governance platform: Claude chat with RAG and citation grounding, Redis semantic caching, and Microsoft Graph mail intelligence.",
            "Shipped a real-time live-broadcast and course platform on Google / YouTube Live APIs with Socket.IO chat and Q&A.",
            "Delivered a telemedicine app with scheduling, EHR and e-prescriptions, designed around HIPAA / GDPR principles.",
            "Authored a reusable Laravel + Filament dynamic form package that removed duplicated form code across internal projects.",
        ],
        stack: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Claude API", "Laravel"],
    },
    {
        company: "Bourntec Solutions",
        role: "Junior Developer (Intern)",
        period: "Apr 2024 — Aug 2024",
        location: "Bhubaneswar",
        summary: "Designed, built and deployed full-stack internal tools solo.",
        points: [
            "Built and deployed a Flask web application end to end, owning both frontend and backend.",
            "Built a React + Django application with REST APIs, serializers and models, tuned for cross-browser performance.",
        ],
        stack: ["Flask", "React", "Django", "REST", "MySQL"],
    },
    {
        company: "Silicon Institute of Technology",
        role: "Web Developer Intern · MEAN / MERN",
        period: "2023",
        location: "Bhubaneswar",
        summary: "Built full-stack JavaScript apps on MongoDB, Express, Angular / React and Node.",
        points: [],
        stack: ["MongoDB", "Express", "React", "Node.js"],
    },
];

export type ProjectKind = "Professional" | "Freelance" | "Personal";
export type ProjectVisual = "ai" | "game" | "author" | "realestate" | "docintel" | "stream" | "health" | "exam" | "form";

export interface ProjectSection {
    heading: string;
    bullets: string[];
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    kind: ProjectKind;
    period: string;
    visual: ProjectVisual;
    summary: string;
    stack: string[];
    highlights: string[];
    sections: ProjectSection[];
    live?: string;
    repo?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        slug: "ai-data-intelligence-platform",
        title: "AI Data Intelligence Platform",
        tagline: "Governing vendor data licenses & contracts with Claude",
        kind: "Professional",
        period: "2026",
        visual: "ai",
        featured: true,
        summary:
            "An AI-powered platform that reads vendor mail, links it to the right contracts, proposes contract changes, and answers questions with cited sources. I wrote 414 commits (about 52K lines) across the NestJS backend and Next.js frontend in 4 months.",
        stack: ["NestJS", "Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "Claude API", "Microsoft Graph"],
        highlights: [
            "Claude chat with RAG and citation highlighting",
            "LLM contract matching and change detection",
            "Redis semantic cache with LLM query normalisation",
            "Microsoft Graph OAuth, webhooks and BullMQ sync",
        ],
        sections: [
            {
                heading: "Vendor Mail Intelligence (Microsoft Graph)",
                bullets: [
                    "Built the Vendor Mail module from scratch on Microsoft Graph: OAuth2 sign-in, proactive token refresh, server-managed token storage and admin-editable Graph credentials.",
                    "Set up Graph webhook subscriptions for real-time new-mail alerts, with batched notifications, auto-sync and debounced UI updates.",
                    "Built a full inbox UI: threaded conversations, infinite scroll, cursor pagination, debounced $search, vendor/domain filters, sandboxed iframe mail rendering and attachment downloads.",
                    "Wrote a BullMQ processor that syncs attachments in bulk batches and backfills anything it missed.",
                    "Built an ingestion pipeline that converts mail and attachments (PDF, DOCX, CSV) to Markdown with Pandoc and Claude. It detects real file types from magic bytes, strips null bytes and skips duplicates.",
                    "Built LLM contract matching that links vendor emails to the right contracts, with retries, timeouts and self-correcting fallbacks.",
                    "Built AI contract change detection: the LLM proposes changes from email threads, and reviewers accept, reject, edit or undo each one in a diff viewer, then regenerate the contract with pause, cancel and revert. Everything is tracked live over Socket.IO.",
                ],
            },
            {
                heading: "LLM Chat, Prompting & Grounding",
                bullets: [
                    "Built the main features of a Claude-powered global assistant: RAG retrieval with phrase-level ranking and mandatory anti-hallucination grounding rules.",
                    "Added citation grounding. Answers cite source passages, which are located and highlighted in the original document with the CSS Custom Highlight API.",
                    "Added semantic query caching in Redis. A model normalises each query to a canonical form with a confidence score, with invalidation, a super-admin /clearcache command and a greeting fast path.",
                    "Added @mention context injection for vendors and contracts, scope guardrails, a file context budget to prevent prompt overflow, and entity resolution for sub-agents.",
                    "Hardened streaming: chat runs separately from the HTTP request, with cancellation, concurrency safeguards, rate-limit auto-recovery, retry over sockets and message version history.",
                    "Built MCP-style analyst tools with SQL timeouts, partition-filter checks and date-range query splitting.",
                    "Wrote JSON-schema extraction prompts for pricing, usage rights and restrictions, with selective re-extraction and batched concurrent categorisation tracked live.",
                ],
            },
            {
                heading: "Audit Logs & Activity Tracing",
                bullets: [
                    "Built Global Audit Logs with search, advanced filters, date ranges, a detail modal and role-based access control.",
                    "Built a user directory and per-user activity timeline with infinite scroll, role badges and readable log formatting.",
                    "Added AI operation logging so batch LLM jobs can be audited.",
                ],
            },
            {
                heading: "Platform & Quality",
                bullets: [
                    "Replaced polling with WebSocket updates for usage rights, mail status and category jobs.",
                    "Built a reporting calendar with draft, active and overdue states, auto-save and status overrides.",
                    "Made dashboards, tables, the file manager, chat and vendor pages responsive on mobile, and built shared components (ConfirmDialog, mobile filter modals, DataTable toolbar).",
                    "Set up the first backend unit test suites, stabilised the E2E tests and configured Jest for ESM.",
                ],
            },
        ],
    },
    {
        slug: "hellball",
        title: "HellBall",
        tagline: "A 3D hover-bike racer inside a burning Globe of Death",
        kind: "Personal",
        period: "Aug — Sep 2026",
        visual: "game",
        featured: true,
        summary:
            "A first-person browser racer. You run 5 laps against 3 AI rivals on a track that loops around the inside of a steel sphere, through saws, flame jets and walls of fire. Solo project, about 4,000 lines in 17 ES modules.",
        stack: ["Three.js", "WebGL", "GLSL", "GSAP", "Web Audio API", "Vite", "JavaScript"],
        highlights: [
            "Physics for riding the inside of a sphere (v²/r vs gravity)",
            "AI rivals that predict hazards",
            "Custom GLSL fire shaders and GPU particles",
            "All audio synthesised in code",
        ],
        sections: [
            {
                heading: "Physics & Track",
                bullets: [
                    "Wrote custom physics for riding inside a sphere. Riders stay on the wall only while the centripetal force (v²/r) beats gravity, so slowing down at the top makes you fall off. It also models slopes, nitro, drag and speed-dependent steering.",
                    "Modelled the track in its own coordinate system (distance along the track plus offset from centre), resampled at even spacing so lookups are fast. All placement, collision and AI logic runs in this 2D space.",
                ],
            },
            {
                heading: "AI & Gameplay",
                bullets: [
                    "Built cost-scored lane AI that predicts saw-blade positions and flame-jet timing, goes for pickups, uses nitro tactically and adjusts its pace to keep races close. Each rival has its own skill level.",
                    "Built a seeded obstacle system with 8 hazard and pickup types, near-miss detection and scoring for overtakes, near misses and clean laps.",
                    "Built a 9-state game flow (menu, cinematic fly-in, bike showcase, cockpit swoop, countdown, race, victory orbit, results) with orbit, cockpit, chase and finish cameras animated in GSAP.",
                ],
            },
            {
                heading: "Rendering & Audio",
                bullets: [
                    "Wrote GLSL shaders (3D simplex noise and layered noise) for flame shells, glow and fire ribbons, plus GPU particles for embers, exhaust and explosions. Lighting uses a procedural env map and ACES tone mapping.",
                    "Generated all audio with the Web Audio API and no sound files: a layered oscillator engine that follows throttle and nitro, fire ambience, sound effects and a master compressor.",
                    "Kept frame times low with instanced meshes, shared materials, a capped pixel ratio and vector reuse in the game loop to avoid GC stalls.",
                    "Added a canvas-drawn cockpit dashboard, a PBR GLTF bike, a HUD minimap, and best times saved in localStorage.",
                ],
            },
        ],
    },
    {
        slug: "niyazunveiled",
        title: "NiyazUnveiled",
        tagline: "Author platform & book launch site for Coffee?",
        kind: "Personal",
        period: "2026",
        visual: "author",
        featured: true,
        summary:
            "The home of my writing and the launch site for my debut novel. It combines a static Markdown CMS with Firebase auth, real-time comments, pre-orders and automated launch-day email.",
        stack: ["Next.js 16", "React 19", "Firebase Auth", "Firestore", "Firebase Admin", "Resend", "Vercel Cron", "remark"],
        highlights: [
            "Markdown CMS with 25+ pre-rendered stories",
            "Real-time Firestore comments",
            "Pre-orders and Vercel Cron launch emails",
            "Animated Coffee Brew purchase flow",
        ],
        live: "https://www.niyazunveiled.com/",
        repo: "https://github.com/skniyaznoor/niyazunveiled",
        sections: [
            {
                heading: "Architecture & Content",
                bullets: [
                    "Built and deployed on the Next.js 16 App Router with React 19: statically generated content pages plus serverless API routes on Vercel.",
                    "Built a file-based Markdown CMS with gray-matter and remark. It detects series and episode numbers from titles and pre-renders 25+ stories with generateStaticParams and per-page SEO metadata.",
                    "Wrote a migration script that pulled the legacy Blogger archive and converted its HTML to Markdown with turndown, with no manual copying.",
                ],
            },
            {
                heading: "Firebase & Email",
                bullets: [
                    "Added Google sign-in with Firebase Auth through a shared AuthContext.",
                    "Built real-time comments on Firestore onSnapshot, scoped per post and sorted client-side so no composite index is needed.",
                    "Built a reader feedback wall and book pre-orders using server timestamps.",
                    "Sent branded Resend confirmation emails on pre-order. A Vercel Cron job hits a Bearer-protected route that reads pre-orders through Firebase Admin and sends the launch-day email.",
                ],
            },
            {
                heading: "Frontend & UX",
                bullets: [
                    "Designed a Coffee Brew purchase flow: pick an edition and a store, and an SVG cup fills with an eased requestAnimationFrame animation that respects prefers-reduced-motion.",
                    "Built a 3D CSS book flip, a launch countdown, a reading-progress bar and previous/next episode navigation. The layout is mobile-first.",
                ],
            },
        ],
    },
    {
        slug: "docintel-ai",
        title: "DocIntel AI",
        tagline: "Multilingual legal-document simplifier",
        kind: "Personal",
        period: "2026",
        visual: "docintel",
        featured: true,
        summary:
            "Turns dense legal and official documents into plain-language summaries. It handles images, scanned PDFs and Word files in 100+ languages.",
        stack: ["FastAPI", "Next.js", "Transformers", "TrOCR", "NLLB-200", "Flan-T5", "Docker"],
        highlights: [
            "OCR for scanned PDFs and images (TrOCR)",
            "Language detection for 100+ languages and NLLB translation",
            "Zero-shot document classification",
            "Dockerised FastAPI + Next.js",
        ],
        repo: "https://github.com/skniyaznoor/Resume-Short-Lister",
        sections: [
            {
                heading: "Pipeline",
                bullets: [
                    "Extracts text from JPEG/PNG images, text and scanned PDFs, and DOCX, using Microsoft TrOCR for printed-text OCR.",
                    "Detects 100+ languages with XLM-RoBERTa and translates to and from English with Meta's NLLB-200.",
                    "Generates plain-language summaries with Flan-T5 and classifies documents (invoice, legal, receipt) zero-shot with BART-MNLI.",
                    "Runs as a FastAPI service layer with a Next.js frontend, both containerised with Docker.",
                ],
            },
        ],
    },
    {
        slug: "brr-hallmark",
        title: "BRR Hallmark Developers",
        tagline: "Lead-generating website for a Bangalore real-estate developer",
        kind: "Freelance",
        period: "2025",
        visual: "realestate",
        featured: true,
        summary:
            "A responsive marketing site for a premium residential developer. It presents completed, ongoing and upcoming projects and turns visitors into site-visit bookings.",
        stack: ["Responsive Web", "Lead Capture", "SEO", "WebP Imaging"],
        highlights: [
            "Site-visit booking and enquiry forms",
            "Completed / ongoing / upcoming project showcase",
            "WhatsApp click-to-chat",
            "RERA, legal and FAQ pages",
        ],
        live: "https://www.brrhallmarkdevelopers.in/",
        sections: [
            {
                heading: "What I delivered",
                bullets: [
                    "Built a project portfolio covering completed, ongoing and upcoming developments, with location, configuration (2 & 3 BHK) and RERA details.",
                    "Built site-visit booking and contact forms that capture project interest, BHK preference and contact details for the sales team.",
                    "Added WhatsApp click-to-chat, testimonials, an FAQ (RERA, loans, amenities, booking) and legal pages.",
                    "Built responsive JPEG / WebP image handling and light/dark logo variants for fast, sharp pages on mobile.",
                ],
            },
        ],
    },
    {
        slug: "live-broadcast-platform",
        title: "Live Broadcast & Course Platform",
        tagline: "Live classes, recorded courses and real-time audience interaction",
        kind: "Professional",
        period: "2025",
        visual: "stream",
        summary:
            "A platform where educators run live broadcasts alongside structured on-demand courses.",
        stack: ["Next.js", "Node.js", "Socket.IO", "Google APIs", "YouTube Live"],
        highlights: ["YouTube Live integration", "Socket.IO chat & Q&A", "Course and module management", "Role-based access"],
        sections: [
            {
                heading: "Highlights",
                bullets: [
                    "Integrated Google / YouTube Live APIs for stream creation, scheduling, simulcasting and viewer analytics, with latency and bitrate tuning.",
                    "Built Socket.IO live chat and Q&A for audience engagement during sessions.",
                    "Built course management for courses, modules, lessons and access levels, plus roles for instructors, students, moderators and admins.",
                ],
            },
        ],
    },
    {
        slug: "telemedicine-app",
        title: "Healthcare & Telemedicine App",
        tagline: "Connecting patients and doctors securely",
        kind: "Professional",
        period: "2025",
        visual: "health",
        summary: "A web and mobile healthcare platform for remote consultations and digital health records.",
        stack: ["Next.js", "Laravel", "REST APIs", "Encryption"],
        highlights: ["Video consultations", "Real-time availability", "EHR & e-prescriptions", "HIPAA / GDPR-minded design"],
        sections: [
            {
                heading: "Highlights",
                bullets: [
                    "Built appointment scheduling with real-time doctor availability and calendar sync.",
                    "Built centralised health records and e-prescriptions, pulling medical data from authorised healthcare APIs with end-to-end encryption.",
                    "Built role-based dashboards for patients, doctors and admins, designed around HIPAA / GDPR principles.",
                ],
            },
        ],
    },
    {
        slug: "exam-portal",
        title: "Secure Online Exam Portal",
        tagline: "Cheat-resistant assessments at scale",
        kind: "Professional",
        period: "2024",
        visual: "exam",
        summary: "An online examination system that keeps assessments controlled and fair.",
        stack: ["React", "Laravel", "MySQL", "JWT"],
        highlights: ["Tab-switch detection", "Server-enforced timers", "Randomised question sets", "Instant evaluation"],
        sections: [
            {
                heading: "Highlights",
                bullets: [
                    "Added tab-switch detection and blocked copy-paste and right-click.",
                    "Added a real-time countdown with server-side enforcement and auto-submission.",
                    "Shuffled questions and options per session, saved answers asynchronously, and graded instantly with result analytics.",
                ],
            },
        ],
    },
    {
        slug: "filament-quick-form",
        title: "Filament Quick Form",
        tagline: "Runtime form builder package for Laravel",
        kind: "Professional",
        period: "2024",
        visual: "form",
        summary: "A reusable Laravel package that defines, renders and validates Filament forms at runtime.",
        stack: ["Laravel", "Filament", "PHP"],
        highlights: ["Dynamic schema to Filament components", "Generated validation rules", "Conditional fields", "Near-zero migrations"],
        repo: "https://github.com/skniyaznoor/filament-quick-form",
        sections: [
            {
                heading: "Highlights",
                bullets: [
                    "Maps field definitions straight to Filament components and generates Laravel validation rules at runtime.",
                    "Stores submissions as structured JSON or in configurable tables, so new forms need almost no migrations.",
                    "Supports dependent fields and progressive disclosure, and removed duplicated form code across internal projects.",
                ],
            },
        ],
    },
];

export const archive = [
    { title: "Blood Bank Management System", stack: "PHP · MySQL", repo: "https://github.com/skniyaznoor/BloodBankManagement" },
    { title: "Leave Management System", stack: "PHP · MySQL", repo: "https://github.com/skniyaznoor/LeaveManagementSystem" },
    { title: "Real Estate E-commerce", stack: "React · Auth · Payments" },
    { title: "Sudoku with Solver", stack: "Java AWT" },
];

export const book = {
    title: "Coffee?",
    subtitle: "A Slice-of-Life Love Story",
    publisher: "Notion Press",
    year: "2026",
    front: "/images/book/coffee-front.jpg",
    back: "/images/book/coffee-back.jpg",
    blurb: [
        "Some people enter our lives quietly.",
        "A conversation becomes a habit. A habit becomes comfort.",
        "And somewhere between ordinary days, laughter, long walks, and a cup of coffee, someone begins to mean more than we ever expected.",
    ],
    hook: "Sometimes, all it takes is a cup of coffee to begin a story.",
    editions: ["Paperback", "Hardcover"],
    stores: [
        { name: "Amazon", url: "https://www.amazon.in/dp/B0HLG2SFPR" },
        { name: "Flipkart", url: "https://www.flipkart.com/coffee/p/itm193f5c5525efb?pid=9798907228979" },
        { name: "Notion Press", url: "https://notionpress.com/in/read/coffee-1410198188" },
    ],
    page: "https://www.niyazunveiled.com/book",
};

export const writing = [
    { title: "The Adventures of Neil and Litu", type: "Series", url: "https://www.niyazunveiled.com/writing/series/the-adventures-of-neil-and-litu" },
    { title: "Echoes of Absence", type: "Series", url: "https://www.niyazunveiled.com/writing/series/echoes-of-absence" },
    { title: "Love Bridge", type: "Series", url: "https://www.niyazunveiled.com/writing/series/love-bridge" },
    { title: "Riddle of My Heart", type: "Short Story", url: "https://www.niyazunveiled.com/writing/riddle-of-my-heart" },
    { title: "Suffocation", type: "Diary", url: "https://www.niyazunveiled.com/writing/suffocation" },
    { title: "A Night More To Dream", type: "Poem", url: "https://www.niyazunveiled.com/writing/a-night-more-to-dream" },
];

export const skills: { group: string; items: string[] }[] = [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "GLSL", "Java", "C / C++"] },
    { group: "Frontend", items: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP", "Web Audio"] },
    { group: "Backend", items: ["NestJS", "Node.js", "Laravel", "Filament", "FastAPI", "Django", "Flask", "Socket.IO"] },
    { group: "AI & LLM", items: ["Claude API", "RAG", "Prompt Engineering", "Citation Grounding", "Semantic Caching", "MCP Tools", "Hugging Face"] },
    { group: "Data & Infra", items: ["PostgreSQL", "Prisma", "Redis", "BullMQ", "MySQL", "Firebase", "Docker", "Vercel"] },
    { group: "Integrations", items: ["Microsoft Graph", "OAuth2", "Webhooks", "Google / YouTube APIs", "Resend", "Jest"] },
];

export const education = [
    { degree: "Master of Computer Applications (MCA)", school: "Silicon Institute of Technology, Silicon University", period: "2022 — 2024" },
    { degree: "B.Sc. Physics", school: "Dharmasala Mahavidyalaya, Utkal University", period: "2018 — 2021" },
];

export const certifications = [
    { name: "Internet of Things", issuer: "NPTEL", year: "2023" },
    { name: "Advanced Certified Course in Software Application (ACCSA)", issuer: "CTTC Bhubaneswar", year: "2021" },
];
