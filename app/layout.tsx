import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL("https://hen-heang.vercel.app"),
    title: {
        default: "Hen Heang — Full-Stack Engineer",
        template: "%s | Hen Heang",
    },
    description:
        "Full-Stack Engineer based in Phnom Penh, Cambodia. I build reliable web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
    keywords: ["Full-Stack Engineer", "Next.js", "Spring Boot", "TypeScript", "PostgreSQL", "Hen Heang", "Cambodia"],
    authors: [{ name: "Hen Heang", url: "https://github.com/Hen-Heang" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hen-heang.vercel.app",
        siteName: "Hen Heang Portfolio",
        title: "Hen Heang — Full-Stack Engineer",
        description:
            "Full-Stack Engineer based in Phnom Penh, Cambodia. I build reliable web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
        images: [
            {
                url: "/image/personal_image.jpg",
                width: 1200,
                height: 630,
                alt: "Hen Heang — Full-Stack Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hen Heang — Full-Stack Engineer",
        description:
            "Full-Stack Engineer based in Phnom Penh, Cambodia. I build reliable web applications with Next.js, Spring Boot, TypeScript, and PostgreSQL.",
        images: ["/image/personal_image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
            <SpeedInsights />
        </body>
        </html>
    )
}
