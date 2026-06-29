import type React from "react"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"

export const metadata: Metadata = {
    title: "About",
    description: `Learn about ${profileData.fullName} — a ${profileData.title} from Phnom Penh, Cambodia with ${profileData.yearsExperience} years of experience building web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.`,
    openGraph: {
        title: `About | ${profileData.fullName}`,
        description: `Learn about ${profileData.fullName} — a ${profileData.title} from Phnom Penh, Cambodia with ${profileData.yearsExperience} years of experience building web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.`,
        url: `${profileData.portfolioUrl}/about`,
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
