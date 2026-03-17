export const profile = {
    name: "Hen Heang",
    koreanName: "헹",
    title: "Full-Stack Software Engineer",
    company: "Webcash Inc.",
    location: "Seoul, South Korea",
    locationEmoji: "🇰🇷",
    email: "henheang15@gmail.com",
    available: true,
    yearsExperience: "2+",
    bio: "Engineering scalable enterprise solutions with Java, Spring Boot & Next.js. Architecting from Cambodia 🇰🇭 to Seoul 🇰🇷",
    socials: {
        github: "https://github.com/Hen-Heang",
        linkedin: "https://www.linkedin.com/in/hen-heang",
        telegram: "https://t.me/henheang",
    },
}

export const deployedProjects = [
    {
        id: "koriai",
        title: "KoriAI",
        subtitle: "Intelligent AI Language Ecosystem",
        description:
            "A high-performance AI Korean tutor utilizing advanced LLMs for real-time conversation practice, diagnostic syntax feedback, and optimized memory retention.",
        emoji: "🇰🇷",
        url: "https://koriai-frontend.vercel.app/",
        github: "https://github.com/Hen-Heang/koriai-frontend",
        tech: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
        gradient: "from-[#0c1929] to-[#0f2744]",
        borderColor: "#1e3a5f",
        accentColor: "#22d3ee",
        stats: [
            { label: "Learning modes", value: "Adaptive" },
            { label: "Conversations", value: "Real-time" },
            { label: "Availability", value: "24/7" },
        ],
        badges: ["LIVE", "AI-Engineered"],
        featured: true,
    },
    {
        id: "dev-notes",
        title: "Enterprise Learning Hub",
        subtitle: "Korea Standard Stack",
        description: "A centralized repository of mission-critical patterns for the Korean enterprise ecosystem, from eGovFramework to MyBatis optimization.",
        terminalPrefix: ">_ enterprise-hub",
        url: "https://dev-learning-notes.vercel.app/",
        github: "https://github.com/Hen-Heang/dev-learning-notes",
        tech: [
            { name: "Spring Boot", color: "#84cc16" },
            { name: "MyBatis", color: "#eab308" },
            { name: "Enterprise", color: "#3b82f6" },
            { name: "SQL Ops", color: "#a855f7" },
        ],
        gradient: "from-[#0c0a09] to-[#1a1816]",
        borderColor: "#292524",
        accentColor: "#84cc16",
        badges: ["LIVE"],
    },
    {
        id: "money-flow",
        title: "Money Flow",
        subtitle: "Precision Finance Engine",
        description: "Secure, intuitive personal finance orchestrator focused on real-time asset tracking and high-fidelity financial modeling.",
        url: "https://money-flow-sigma-black.vercel.app/",
        github: "https://github.com/Hen-Heang/money-flow",
        tech: ["Next.js", "PostgreSQL"],
        gradient: "from-[#14171a] to-[#1c2127]",
        borderColor: "#2a2f36",
        accentColor: "#22c55e",
        badges: ["LIVE"],
        colors: ["#22c55e", "#ef4444", "#3b82f6"],
    },
]

export const workProjects = [
    { id: "webill", title: "WeBill365", subtitle: "FinTech Infrastructure", emoji: "💳" },
    { id: "easycart", title: "EasyCart", subtitle: "E-comm Ecosystem", emoji: "🛒" },
    { id: "warehouse", title: "Warehouse", subtitle: "Supply Chain B2B", emoji: "📦" },
]

export const techStack = [
    "Java", "Spring Boot", "MyBatis", "Next.js", "TypeScript", "PostgreSQL",
]

export const journey = [
    { year: "2023", company: "Korea Software HRD Center", location: "Intensive R&D", current: false },
    { year: "2024", company: "KOSIGN", location: "Cambodia 🇰🇭", current: false },
    { year: "2025", company: "Webcash Inc.", location: "Seoul 🇰🇷", current: true },
]
