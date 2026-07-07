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
    status?: "live" | "archived"
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
    {
        id: "we-commerce",
        title: "We Commerce",
        subtitle: "Multi-Vendor Marketplace",
        description:
            "A full-stack multi-vendor marketplace with cart, checkout, and simulated Cambodian payment flows (ABA Pay, KHQR) on a Spring Boot API.",
        emoji: "🛒",
        url: "https://we-commerce-frontend.vercel.app",
        github: "https://github.com/Hen-Heang/we-commerce-frontend",
        tech: ["Next.js", "TypeScript", "TanStack Query", "Spring Boot"],
        gradientFrom: "#0a1628",
        gradientTo: "#122544",
        borderColor: "#1e3a5f",
        accentColor: "#3b82f6",
        screenshot: "/image/we-commerce-preview.svg"
    },
    {
        id: "h-phsar",
        title: "H-Phsar",
        subtitle: "Cambodian B2B Marketplace API",
        description:
            "A B2B marketplace API connecting Cambodian distributors and retailers — stores, catalogs, carts, an order state machine, and real-time notifications on Spring Boot 3.",
        emoji: "🏪",
        url: "https://github.com/Hen-Heang/h-phsar-api-full",
        github: "https://github.com/Hen-Heang/h-phsar-api-full",
        tech: ["Spring Boot 3", "Java 17", "MyBatis", "PostgreSQL"],
        gradientFrom: "#1a120a",
        gradientTo: "#2a1d10",
        borderColor: "#4a3520",
        accentColor: "#e76f00",
        screenshot: "/image/h-phsar-preview.svg",
        status: "archived"
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
