import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore Hen Heang's portfolio of web projects — full-stack applications built with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
    openGraph: {
        title: "Projects | Hen Heang",
        description:
            "Explore Hen Heang's portfolio of web projects — full-stack applications built with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
        url: "https://hen-heang.vercel.app/projects",
    },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
