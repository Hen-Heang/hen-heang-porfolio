import type React from "react"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"

export const metadata: Metadata = {
    title: "Contact",
    description: `Get in touch with ${profileData.fullName} — open to full-stack engineering opportunities, collaborations, and freelance projects.`,
    openGraph: {
        title: `Contact | ${profileData.fullName}`,
        description: `Get in touch with ${profileData.fullName} — open to full-stack engineering opportunities, collaborations, and freelance projects.`,
        url: `${profileData.portfolioUrl}/contact`,
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
