import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Hen Heang — a Full-Stack Engineer from Phnom Penh, Cambodia with 2 years of experience building web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
    openGraph: {
        title: "About | Hen Heang",
        description:
            "Learn about Hen Heang — a Full-Stack Engineer from Phnom Penh, Cambodia with 2 years of experience building web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
        url: "https://hen-heang.vercel.app/about",
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
