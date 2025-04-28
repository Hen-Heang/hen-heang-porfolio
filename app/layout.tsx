import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/animations/page-transition"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DevPortfolio | John Doe",
    description: "Full-Stack Developer Portfolio showcasing projects and skills",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            <div className="min-h-screen bg-white dark:from-[#0a0426] dark:to-[#1f0a4d] dark:bg-gradient-to-b text-gray-900 dark:text-white transition-colors duration-300">
                <Navbar />
                <PageTransition>
                    <main>{children}</main>
                </PageTransition>
                <Footer />
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}