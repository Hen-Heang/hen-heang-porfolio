import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL("https://hen-heang-porfolio.vercel.app"),
    title: {
        default: "Hen Heang — Full-Stack Developer",
        template: "%s | Hen Heang",
    },
    description:
        "Full-Stack Developer based in Seoul, South Korea. Building enterprise web applications with Java, Spring Boot, MyBatis, JavaScript, and jQuery.",
    keywords: ["Full-Stack Developer", "Java", "Spring Boot", "MyBatis", "JavaScript", "jQuery", "SQL", "Hen Heang", "Seoul", "South Korea", "Enterprise Web Development"],
    authors: [{ name: "Hen Heang", url: "https://github.com/Hen-Heang" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hen-heang.vercel.app",
        siteName: "Hen Heang Portfolio",
        title: "Hen Heang — Full-Stack Developer",
        description:
            "Full-Stack Developer based in Seoul, South Korea. Building enterprise web applications with Java, Spring Boot, MyBatis, JavaScript, and jQuery.",
        images: [
            {
                url: "/image/personal_image.jpg",
                width: 1200,
                height: 630,
                alt: "Hen Heang — Full-Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hen Heang — Full-Stack Developer",
        description:
            "Full-Stack Developer based in Seoul, South Korea. Building enterprise web applications with Java, Spring Boot, MyBatis, JavaScript, and jQuery.",
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
