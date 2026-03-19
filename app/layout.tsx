import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = localFont({
    src: [
        { path: "../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
        { path: "../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-inter",
    display: "swap",
    fallback: ["system-ui", "-apple-system", "sans-serif"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://henheang.site"),
    title: {
        default: "Hen Heang — Full-Stack Developer",
        template: "%s | Hen Heang",
    },
    description:
        "Full-Stack Developer based in Seoul, South Korea. Building enterprise web applications with Java, Spring Boot, MyBatis, JavaScript, and jQuery.",
    keywords: [
        "Hen Heang", "Full-Stack Developer", "Java Developer", "Spring Boot",
        "MyBatis", "JavaScript", "jQuery", "SQL", "Seoul", "South Korea",
        "Cambodia Developer", "Enterprise Web Development", "Portfolio",
    ],
    authors: [{ name: "Hen Heang", url: "https://henheang.site" }],
    alternates: {
        canonical: "https://henheang.site",
    },
    icons: {
        icon: "/icon",
        apple: "/apple-icon",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://henheang.site",
        siteName: "Hen Heang — Portfolio",
        title: "Hen Heang — Full-Stack Developer",
        description:
            "Full-Stack Developer based in Seoul, South Korea. Building enterprise web applications with Java, Spring Boot, MyBatis, JavaScript, and jQuery.",
        images: [
            {
                url: "/image/heang_new.jpeg",
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
        images: ["/image/heang_new.jpeg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hen Heang",
    url: "https://henheang.site",
    jobTitle: "Full-Stack Developer",
    worksFor: { "@type": "Organization", name: "Webcash Inc." },
    address: { "@type": "PostalAddress", addressLocality: "Seoul", addressCountry: "KR" },
    email: "henheang15@gmail.com",
    sameAs: [
        "https://github.com/Hen-Heang",
        "https://linkedin.com/in/hen-heang",
    ],
    knowsAbout: ["Java", "Spring Boot", "MyBatis", "JavaScript", "jQuery", "SQL", "Next.js"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
            <SpeedInsights />
        </body>
        </html>
    )
}
