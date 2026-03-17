import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Articles and insights by Hen Heang on full-stack development, Java, Spring Boot, Next.js, TypeScript, and software engineering best practices.",
    openGraph: {
        title: "Blog | Hen Heang",
        description:
            "Articles and insights by Hen Heang on full-stack development, Java, Spring Boot, Next.js, TypeScript, and software engineering best practices.",
        url: "https://hen-heang.vercel.app/blog",
    },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
