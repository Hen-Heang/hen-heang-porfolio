import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "HenHeang - Portfolio",
    description: "Frontend developer portfolio showcasing projects and skills",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
        </body>
        </html>
    )
}
