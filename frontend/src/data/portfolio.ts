import { link } from "fs";

export const profile = {
    name: "SK Niyaz Noor",
    username: "skniyaznoor",
    title: "Web Developer | Content Writer",
    bio: "Building digital experiences & weaving tapestries of love and poetic intrigue. ✨",
    avatar: "images/profileimage.jpg",
    stats: {
        posts: 12,
        followers: "1.2k",
        following: 450
    },
    contact: {
        phones: ["+91 6372271191", "+91 9337202956"],
        emails: ["skniyaznoor23@gmail.com"]
    },
    addresses: {
        correspondence: {
            addressLine: "KIIT Square, Phase 2, Patia",
            city: "Bhubaneswar",
            state: "Odisha",
            pin: 751024
        },
        permanent: {
            addressLine: "Singhar Sahi, Dharmasala",
            district: "Jajpur",
            state: "Odisha",
            pin: 755008
        }
    }
};

export const projects = [
    {
        id: 1,
        title: "Dynamic Form Package",
        type: "Software Engineering",
        description: "Developed a reusable dynamic form package for Laravel using the Filament admin panel.",
        fullDescription: `
**Dynamic Form Package for Laravel Using Filament**

Modern admin panels often require complex, frequently changing forms. Hardcoding form schemas leads to duplicated logic and rigid structures. I designed a Dynamic Form Package for Laravel, tightly integrated with Filament, enabling forms to be defined, rendered, and validated dynamically at runtime.

**Key Features:**
*   **Dynamic Schema Generation:** Maps field definitions directly to Filament components.
*   **Flexible Data Persistence:** Stores submissions using structured JSON or configurable tables.
*   **Runtime Validation:** Generates Laravel validation rules dynamically.
*   **Conditional Logic:** Supports dependent fields and progressive disclosure.

**Impact:**
*   ~40–60% reduction in development time.
*   Eliminated duplicated form code.
*   Reduced database migrations to near zero.
`,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        tags: ["Laravel", "Filament", "PHP"],
        likes: 124,
        comments: 18,
        date: "Oct 2024",
        link: "https://github.com/skniyaznoor/filament-quick-form"
    },
    {
        id: 2,
        title: "Exam Portal",
        type: "Software Engineering",
        description: "Built a secure and interactive online examination system using React.js and Laravel.",
        fullDescription: `
**Secure & Interactive Online Examination System**

A robust platform designed for conducting assessments in a controlled, cheat-resistant environment. Built with React.js and Laravel, it ensures high performance and a seamless user experience for educational and corporate assessments.

**Key Features:**
*   **Anti-Cheat Mechanisms:** Tab-switch detection and disabled copy-paste/right-click.
*   **Time-Based Control:** Real-time countdown with server-side enforcement and auto-submission.
*   **Question Randomization:** Shuffled questions and options per student session.
*   **Real-Time Saving:** Asynchronous answer persistence to prevent data loss.
*   **Auto-Evaluation:** Instant grading and detailed result analytics.

**Tech Stack:** React.js, Laravel, MySQL, JWT, RESTful APIs.
`,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        tags: ["React", "Laravel", "Security"],
        likes: 89,
        comments: 12,
        date: "2024",
        link: "https://www.worldskillcenter.org/"
    },
    {
        id: 3,
        title: "Live Broadcast & Online Course Platform",
        type: "Software Engineering",
        description: "A scalable live streaming and online course platform built with Next.js and Node.js, enabling real-time learning and content delivery.",
        fullDescription: `
**Live Broadcast & Online Course Platform**

A production-grade platform designed for live teaching, recorded courses, and real-time audience interaction. Built with Next.js and Node.js, the system supports educators, trainers, and content creators to deliver structured online courses alongside live broadcasts.

**Key Technical & Professional Features:**
*   **Live & Recorded Classes:** Seamless switching between live streams and on-demand course content.
*   **Google & YouTube Live Integration:** Deep integration with Google APIs for live streaming, simulcasting, and video management.
*   **Real-Time Interaction:** Socket.io powered live chat, Q&A, and audience engagement during sessions.
*   **Course Management System:** Create, organize, and manage courses, modules, lessons, and access levels.
*   **Role-Based Access Control:** Separate roles for instructors, students, moderators, and administrators.
*   **Scalable Architecture:** Optimized for low latency and high concurrency using modern streaming and backend practices.
*   **Secure Authentication:** Token-based authentication ensuring protected course and stream access.

**Tech Stack:** Next.js, Node.js, Socket.io, Google APIs, REST APIs.
`,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        tags: ["Next.js", "Node.js", "Streaming", "EdTech"],
        likes: 210,
        comments: 45,
        date: "2024",
        link: "https://klansity.com/"
    },
    {
        id: 4,
        title: "Healthcare Management & Telemedicine App",
        type: "Software Engineering",
        description: "A secure healthcare platform connecting patients and doctors through telemedicine, scheduling, and digital health records.",
        fullDescription: `
**Healthcare Management & Telemedicine Platform**

A professionally engineered healthcare solution that streamlines patient–doctor interactions while ensuring data security, compliance, and scalability. Designed for clinics, hospitals, and digital health startups.

**Key Technical & Professional Features:**
*   **Telemedicine & Video Consultations:** Secure real-time video calls enabling remote diagnosis and follow-ups.
*   **Appointment & Schedule Management:** Intelligent booking system with availability management and calendar synchronization.
*   **Electronic Health Records (EHR):** Centralized and secure storage of patient medical history and reports.
*   **E-Prescriptions & Reports:** Digital prescription generation and downloadable medical reports.
*   **Compliance & Security:** Designed with HIPAA and GDPR principles, including encrypted data storage and access control.
*   **Role-Based Dashboards:** Dedicated interfaces for doctors, patients, and administrators.
*   **Scalable API Architecture:** Backend services built to support future integrations with labs, pharmacies, and insurance systems.

**Tech Stack:** Next.js, Laravel, REST APIs, Secure Authentication.
`,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
        tags: ["Next.js", "Laravel", "Healthcare", "Telemedicine"],
        likes: 156,
        comments: 22,
        date: "2024"
    },
    {
        id: 5,
        title: "Niyaz Unveiled",
        type: "Writing",
        description: "A tapestry of love and poetic intrigue. Founder and curator of an online literary platform.",
        fullDescription: `
**Niyaz Unveiled: A Tapestry of Love and Poetic Intrigue**

A thoughtfully curated digital literary platform dedicated to poetry and short stories, fostering emotional expression and creative storytelling. Founded and managed as an independent initiative, the platform highlights original voices while building a meaningful reader–writer community.

**Key Creative & Professional Highlights:**
*   **Founder & Editorial Lead:** Conceptualized, launched, and managed the platform’s vision, tone, and publishing standards.
*   **Content Creation & Curation:** Authored original poetry and stories while curating submissions from emerging writers.
*   **Community Building:** Cultivated an engaged readership through consistent publishing, writer collaboration, and feedback-driven growth.
*   **Digital Presence & SEO Strategy:** Leveraged SEO-focused content planning and social media outreach to expand reach and visibility.
*   **Brand & Platform Management:** Oversaw website content, branding, and ongoing platform evolution to maintain a cohesive literary identity.

This project demonstrates strong skills in creative leadership, digital publishing, storytelling, and audience engagement.
`,
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1000&auto=format&fit=crop",
        tags: ["Poetry", "Stories", "Content Creation", "Editorial"],
        likes: 342,
        comments: 56,
        date: "Ongoing",
        link: "https://www.skniyaznoorpoetryandlovestories.com/"
    }
];

export const stories = [
    { id: 1, label: "React", image: "https://cdn.simpleicons.org/react/61DAFB" },
    { id: 2, label: "Next.js", image: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { id: 3, label: "Laravel", image: "https://cdn.simpleicons.org/laravel/FF2D20" },
    { id: 4, label: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { id: 5, label: "Python", image: "https://cdn.simpleicons.org/python/3776AB" },
    { id: 6, label: "Writing", image: "https://cdn.simpleicons.org/medium/000000" },
    { id: 7, label: "TypeScript", image: "https://cdn.simpleicons.org/typescript/3178C6" },
    { id: 8, label: "Docker", image: "https://cdn.simpleicons.org/docker/2496ED" },
    // { id: 9, label: "AWS", image: "https://cdn.simpleicons.org/amazonaws/232F3E" },
    { id: 10, label: "GraphQL", image: "https://cdn.simpleicons.org/graphql/E10098" },
    { id: 11, label: "Tailwind", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { id: 12, label: "PostgreSQL", image: "https://cdn.simpleicons.org/postgresql/4169E1" },
    // { id: 13, label: "Redis", image: "https://cdn.simpleicons.org/redis/DC382D" },
    { id: 14, label: "Git", image: "https://cdn.simpleicons.org/git/F05032" },
    { id: 15, label: "Figma", image: "https://cdn.simpleicons.org/figma/F24E1E" },
];

export const explorePosts = [
    {
        id: 101,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        likes: 1234,
        comments: 45,
        type: "large"
    },
    {
        id: 102,
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
        likes: 892,
        comments: 32,
        type: "small"
    },
    {
        id: 103,
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop",
        likes: 2100,
        comments: 120,
        type: "small"
    },
    {
        id: 104,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
        likes: 1543,
        comments: 88,
        type: "large"
    },
    {
        id: 105,
        image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop",
        likes: 980,
        comments: 55,
        type: "small"
    },
    {
        id: 106,
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
        likes: 342,
        comments: 12,
        type: "small"
    },
    {
        id: 107,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        likes: 4500,
        comments: 300,
        type: "large"
    },
    {
        id: 108,
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop",
        likes: 670,
        comments: 23,
        type: "small"
    },
    {
        id: 109,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000&auto=format&fit=crop",
        likes: 890,
        comments: 44,
        type: "small"
    }
];
