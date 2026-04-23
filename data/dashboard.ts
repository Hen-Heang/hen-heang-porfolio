export const profile = {
    name: "Hen Heang",
    koreanName: "헹",
    title: "Full-Stack Software Engineer",
    company: "Bizplay",
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

export interface BentoProject {
    id: string
    title: string
    subtitle: string
    description: string
    emoji: string
    url: string
    github?: string
    tech: (string | { name: string; color?: string })[]
    gradientFrom?: string
    gradientTo?: string
    borderColor?: string
    accentColor?: string
    screenshot?: string
}

export const deployedProjects: BentoProject[] = [
    {
        id: "money-flow",
        title: "Money Flow",
        subtitle: "AI-Powered Personal Finance Platform",
        description:
            "A full-stack personal finance tracker with real-time expense visualization, AI chatbot for spending analysis, budget alerts, and trend prediction.",
        emoji: "💸",
        url: "https://money-flow-sigma-black.vercel.app/",
        github: "https://github.com/Hen-Heang/money-flow",
        tech: ["Spring Boot", "Next.js", "TypeScript", "AI Integration"],
        gradientFrom: "#09090b",
        gradientTo: "#18181b",
        borderColor: "#27272a",
        accentColor: "#22c55e",
        screenshot: "/screenshots/moneyflow-screenshot.svg"
    },
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
        gradientFrom: "#0c1929",
        gradientTo: "#0f2744",
        borderColor: "#1e3a5f",
        accentColor: "#22d3ee",
        screenshot: "/screenshots/koriai-screenshot.svg"
    },
    {
        id: "dev-notes",
        title: "Enterprise Learning Hub",
        subtitle: "Korea Standard Stack",
        description: "A centralized repository of mission-critical patterns for the Korean enterprise ecosystem, from eGovFramework to MyBatis optimization.",
        emoji: "📚",
        url: "https://dev-learning-notes.vercel.app/",
        github: "https://github.com/Hen-Heang/dev-learning-notes",
        tech: [
            { name: "Spring Boot", color: "#84cc16" },
            { name: "MyBatis", color: "#eab308" },
            { name: "Enterprise", color: "#3b82f6" },
            { name: "SQL Ops", color: "#a855f7" },
        ],
        gradientFrom: "#0c0a09",
        gradientTo: "#1a1816",
        borderColor: "#292524",
        accentColor: "#84cc16",
        screenshot: "/screenshots/devnotes-screenshot.svg"
    },
]

export const workProjects = [
    { id: "webill", title: "WeBill365", subtitle: "FinTech Infrastructure", emoji: "💳" },
    { id: "easycart", title: "EasyCart", subtitle: "E-comm Ecosystem", emoji: "🛒" },
    { id: "warehouse", title: "Warehouse", subtitle: "Supply Chain B2B", emoji: "📦" },
]

export const techStack = [
    "Java", "Spring Boot", "MyBatis", "Next.js", "TypeScript", "PostgreSQL", "React", "Tailwind CSS", "Oracle", "Git", "Redis", "OpenAI", "Spring Security", "eGovFramework", "REST APIs",
]

export const journey = [
    { year: "2023", company: "Korea Software HRD Center", location: "Intensive R&D", current: false },
    { year: "2024", company: "KOSIGN", location: "Cambodia 🇰🇭", current: false },
    { year: "2025", company: "Bizplay", location: "Seoul 🇰🇷", current: true },
]
