import type React from "react"
import { Inter } from "next/font/google"
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
            {children}
        </body>
        </html>
    )
}
