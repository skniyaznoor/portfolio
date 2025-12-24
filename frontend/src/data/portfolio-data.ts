export interface Post {
    id: string;
    type: 'project' | 'writing' | 'skill' | 'about';
    title: string;
    description: string;
    content: string;
    tags: string[];
    image?: string;
    link?: string;
    date: string;
}

export const profileData = {
    name: "Sk Niyaz Noor",
    username: "@skniyaznoor",
    bio: "Software Engineer 💻 | Writer ✍️\nCrafting code & stories that inspire\n🎯 Full Stack Developer | AI Enthusiast\n📚 Poetry & Love Stories",
    avatar: "/avatar.jpg",
    stats: {
        posts: 24,
        followers: "1.2K",
        following: 342
    },
    links: {
        website: "https://www.skniyaznoorpoetryandlovestories.com/",
        github: "https://github.com/skniyaznoor",
        instagram: "https://www.instagram.com/knownstr.anger/",
        linkedin: "https://www.linkedin.com/in/skniyaznoor"
    }
};

export const posts: Post[] = [
    {
        id: "1",
        type: "about",
        title: "About Me",
        description: "Software Engineer & Writer",
        content: "I'm Sk Niyaz Noor, a passionate software engineer and creative writer. I blend the logic of code with the art of storytelling, creating both innovative tech solutions and captivating narratives.",
        tags: ["about", "introduction"],
        date: "2024-01-15"
    },
    {
        id: "2",
        type: "skill",
        title: "Technical Skills",
        description: "Full Stack Development",
        content: "🚀 Frontend: React.js, Next.js, TypeScript, Tailwind CSS\n💻 Backend: Flask, Django, Node.js, RESTful APIs\n🗄️ Database: MySQL, MongoDB, PostgreSQL\n⚙️ Languages: Java, Python, C++, JavaScript\n🤖 AI/ML: Machine Learning, IoT Integration",
        tags: ["skills", "technology", "programming"],
        date: "2024-01-20"
    },
    {
        id: "3",
        type: "project",
        title: "Real Estate E-Commerce Platform",
        description: "React-based property marketplace",
        content: "Developed a comprehensive real estate e-commerce website using React.js with dynamic property listings, advanced search filters, and user authentication. Integrated RESTful APIs for seamless data management.",
        tags: ["react", "web development", "e-commerce"],
        link: "https://github.com/skniyaznoor",
        date: "2023-11-10"
    },
    {
        id: "4",
        type: "writing",
        title: "Love: It Starts with You 💕",
        description: "A journey of self-love and discovery",
        content: "Love ❤️💕 .... It's a tiny four letters word, but it takes billions and billions of words to prove its existence. And sometimes, it takes just a moment of silence to feel its depth...",
        tags: ["poetry", "love", "self-discovery"],
        link: "https://www.skniyaznoorpoetryandlovestories.com/2020/09/love-it-starts-with-you.html",
        date: "2020-09-15"
    },
    {
        id: "5",
        type: "project",
        title: "Blood Bank Management System",
        description: "Web-based healthcare solution",
        content: "Created a comprehensive Blood Bank Management System using PHP, MySQL, and HTML/CSS. Features include donor registration, blood inventory tracking, and request management.",
        tags: ["php", "mysql", "healthcare", "web development"],
        date: "2023-08-22"
    },
    {
        id: "6",
        type: "writing",
        title: "Echoes of Absence (S1.EP1)",
        description: "A tale of love and longing",
        content: "Jaan ❤️ .... Well! Yes, that's my name. No kidding, that's how romantic my parents are. You think it's awkward, wait for my full story...",
        tags: ["story", "romance", "series"],
        link: "https://www.skniyaznoorpoetryandlovestories.com/2021/12/dhadak-that-left-s1ep1.html",
        date: "2021-12-05"
    },
    {
        id: "7",
        type: "project",
        title: "Sudoku Game",
        description: "Java AWT-based puzzle game",
        content: "Developed an interactive Sudoku game using Java AWT with features including puzzle generation, validation, hints system, and multiple difficulty levels.",
        tags: ["java", "game development", "awt"],
        date: "2023-05-18"
    },
    {
        id: "8",
        type: "writing",
        title: "Love Bridge ✨ (S1.EP2)",
        description: "Connections that transcend distance",
        content: "Well! There are a few things in our lives that we don't want to lose, even if it's best for us. It's just that we're so scared of the unknown...",
        tags: ["story", "love", "connection"],
        link: "https://www.skniyaznoorpoetryandlovestories.com/2022/05/love-bridge-s1ep2.html",
        date: "2022-05-20"
    },
    {
        id: "9",
        type: "skill",
        title: "Education & Certifications",
        description: "Academic Journey",
        content: "🎓 Master of Computer Applications\nSilicon Institute of Technology, Bhubaneswar\n\n💼 Internships:\n• Bourntec Solutions - Software Development\n• HIGHRADIUS - Full Stack Development\n\n🏆 Interests: AI, Machine Learning, IoT, Cloud Computing",
        tags: ["education", "career", "achievements"],
        date: "2024-02-01"
    },
    {
        id: "10",
        type: "writing",
        title: "The Adventures of Neil and Litu",
        description: "An ongoing series of friendship and adventure",
        content: "Join Neil and Litu on their extraordinary adventures filled with laughter, challenges, and heartwarming moments. A story that celebrates friendship and the courage to dream.",
        tags: ["series", "adventure", "friendship"],
        link: "https://www.skniyaznoorpoetryandlovestories.com/p/the-adventures-of-neil-and-litu.html",
        date: "2024-09-09"
    },
    {
        id: "11",
        type: "project",
        title: "AI-Powered Solutions",
        description: "Machine Learning & IoT Integration",
        content: "Working on innovative AI-powered solutions that combine machine learning algorithms with IoT devices to create smart, responsive systems for real-world applications.",
        tags: ["ai", "machine learning", "iot", "innovation"],
        date: "2024-03-15"
    },
    {
        id: "12",
        type: "writing",
        title: "Niyaz Unveiled",
        description: "A tapestry of love and poetic intrigue",
        content: "Discover love's enchanting world through short stories and poems. Each tale is a symphony of passion, weaving emotions that linger in hearts. Words that paint love's hues, melodies that serenade souls.",
        tags: ["poetry", "anthology", "love"],
        link: "https://www.skniyaznoorpoetryandlovestories.com/",
        date: "2024-01-01"
    }
];
