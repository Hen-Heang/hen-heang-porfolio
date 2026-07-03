import { profileData } from "./profile"

export const profile = {
    name: profileData.name,
    koreanName: profileData.koreanName,
    title: profileData.title,
    company: profileData.company,
    location: profileData.location,
    locationEmoji: profileData.locationEmoji,
    email: profileData.email,
    available: profileData.available,
    yearsExperience: profileData.yearsExperience,
    bio: profileData.bio,
    socials: profileData.socialLinks,
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
        subtitle: "AI-Powered Personal Finance PWA",
        description:
            "A personal finance PWA with budgets, savings goals, recurring transactions, push alerts, and an AI chat over your own spending — backed up daily to Neon.",
        emoji: "💸",
        url: "https://money-flow.henheang.site/",
        github: "https://github.com/Hen-Heang/money-flow",
        tech: ["Next.js", "Supabase", "TypeScript", "Gemini AI"],
        gradientFrom: "#09090b",
        gradientTo: "#18181b",
        borderColor: "#27272a",
        accentColor: "#22c55e",
        screenshot: "/screenshots/moneyflow-screenshot.svg"
    },
    {
        id: "hengo",
        title: "Hengo",
        subtitle: "AI Companion for Daily Growth",
        description:
            "Set goals, track to-dos, and learn workplace Korean — daily missions, an AI coach, spaced repetition, and XP progression in one app.",
        emoji: "📈",
        url: "https://koriai-frontend.vercel.app/",
        github: "https://github.com/Hen-Heang/koriai-frontend",
        tech: ["Next.js", "TypeScript", "TanStack Query", "Spring Boot"],
        gradientFrom: "#0f0e2a",
        gradientTo: "#16204d",
        borderColor: "#28306b",
        accentColor: "#10b981",
        screenshot: "/screenshots/hengo-screenshot.svg"
    },
]

export const workProjects = [
    { id: "easycart", title: "EasyCart", subtitle: "E-comm Ecosystem", emoji: "🛒" },
]

export const techStack = profileData.linkedinCoreSkills

export const journey = [
    { year: "2020", company: "RUPP University", location: "Phnom Penh 🇰🇭", current: false },
    { year: "2023", company: "Korea Software HRD Center", location: "Cambodia", current: false },
    { year: "2024", company: "KOSIGN", location: "Cambodia 🇰🇭", current: false },
    { year: "2025", company: "Bizplay", location: "Seoul 🇰🇷", current: true },
]
