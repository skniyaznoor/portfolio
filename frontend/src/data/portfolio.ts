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
        description: "Developed a reusable dynamic form package for Laravel using the Filament admin panel. Enabled rendering dynamic forms and managing dynamic database structures.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        tags: ["Laravel", "Filament", "PHP"],
        likes: 124,
        comments: 18,
        date: "Oct 2024"
    },
    {
        id: 2,
        title: "Exam Portal",
        type: "Software Engineering",
        description: "Built a secure and interactive online examination system using React.js and Laravel. Features time-based restrictions and question randomization.",
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
        description: "Developed a live streaming platform using Next.js and Node.js with deep integration of Google APIs and YouTube Live.",
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
        description: "Built a web and mobile healthcare application connecting patients and doctors. Adhered to HIPAA/GDPR standards.",
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
        description: "A tapestry of love and poetic intrigue. Founder and curator of an online platform dedicated to short stories and poems.",
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1000&auto=format&fit=crop",
        tags: ["Poetry", "Stories", "Content Creation"],
        likes: 342,
        comments: 56,
        date: "Ongoing"
    }
];

export const stories = [
    { id: 1, label: "React", image: "https://api.dicebear.com/7.x/icons/svg?seed=react" },
    { id: 2, label: "Next.js", image: "https://api.dicebear.com/7.x/icons/svg?seed=nextjs" },
    { id: 3, label: "Laravel", image: "https://api.dicebear.com/7.x/icons/svg?seed=laravel" },
    { id: 4, label: "Node.js", image: "https://api.dicebear.com/7.x/icons/svg?seed=nodejs" },
    { id: 5, label: "Python", image: "https://api.dicebear.com/7.x/icons/svg?seed=python" },
    { id: 6, label: "Writing", image: "https://api.dicebear.com/7.x/icons/svg?seed=writing" },
];
