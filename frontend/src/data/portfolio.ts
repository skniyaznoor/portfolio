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
**Secure Online Examination System**

A comprehensive solution for conducting secure online exams. Built with React.js for a responsive frontend and Laravel for a robust backend.

**Key Features:**
*   **Time-based Restrictions:** Auto-submission and strict timing controls.
*   **Question Randomization:** Unique question sets for every student to prevent cheating.
*   **Real-time Monitoring:** Admin dashboard to track active exams.
*   **Result Analytics:** Instant grading and detailed performance reports.
`,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        tags: ["React", "Laravel", "Security"],
        likes: 89,
        comments: 12,
        date: "2024"
    },
    {
        id: 3,
        title: "Live Broadcast App",
        type: "Software Engineering",
        description: "Developed a live streaming platform using Next.js and Node.js with deep integration of Google APIs.",
        fullDescription: `
**Live Streaming & Broadcast Platform**

A high-performance live broadcasting application leveraging Next.js and Node.js. Designed for seamless real-time interaction and content delivery.

**Key Features:**
*   **YouTube Live Integration:** Deep integration with Google APIs for simulcasting.
*   **Real-time Chat:** Socket.io powered chat for viewer engagement.
*   **Low Latency:** Optimized stream delivery using modern protocols.
*   **User Management:** Role-based access for streamers and moderators.
`,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        tags: ["Next.js", "Node.js", "Streaming"],
        likes: 210,
        comments: 45,
        date: "2024"
    },
    {
        id: 4,
        title: "Healthcare App",
        type: "Software Engineering",
        description: "Built a web and mobile healthcare application connecting patients and doctors.",
        fullDescription: `
**Comprehensive Healthcare Platform**

Bridging the gap between patients and healthcare providers. This application ensures secure, compliant, and efficient medical consultations.

**Key Features:**
*   **HIPAA/GDPR Compliance:** Strict adherence to data privacy standards.
*   **Telemedicine:** Integrated video calling for remote consultations.
*   **Appointment Scheduling:** Smart booking system with calendar sync.
*   **E-Prescriptions:** Digital prescription management and pharmacy integration.
`,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
        tags: ["Next.js", "Laravel", "Healthcare"],
        likes: 156,
        comments: 22,
        date: "2024"
    },
    {
        id: 5,
        title: "Niyaz Unveiled",
        type: "Writing",
        description: "A tapestry of love and poetic intrigue. Founder and curator of an online platform.",
        fullDescription: `
**Niyaz Unveiled: A Literary Journey**

An online sanctuary for short stories, poems, and creative writing. "Niyaz Unveiled" explores the depths of human emotion through words.

**Highlights:**
*   **Curated Collections:** Handpicked stories and poems.
*   **Community Engagement:** Platform for aspiring writers to share and discuss.
*   **Visual Storytelling:** Combining text with evocative imagery.
*   **Regular Publications:** Weekly updates with fresh content.
`,
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1000&auto=format&fit=crop",
        tags: ["Poetry", "Stories", "Content Creation"],
        likes: 342,
        comments: 56,
        date: "Ongoing"
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
