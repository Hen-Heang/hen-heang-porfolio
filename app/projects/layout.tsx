import type React from "react"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"

export const metadata: Metadata = {
    title: "Projects",
    description: `Explore ${profileData.fullName}'s portfolio of web projects — full-stack applications built with Next.js, Spring Boot, TypeScript, and PostgreSQL.`,
    openGraph: {
        title: `Projects | ${profileData.fullName}`,
        description: `Explore ${profileData.fullName}'s portfolio of web projects — full-stack applications built with Next.js, Spring Boot, TypeScript, and PostgreSQL.`,
        url: `${profileData.portfolioUrl}/projects`,
    },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
