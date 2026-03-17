import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Hen Heang — open to full-stack engineering opportunities, collaborations, and freelance projects.",
    openGraph: {
        title: "Contact | Hen Heang",
        description:
            "Get in touch with Hen Heang — open to full-stack engineering opportunities, collaborations, and freelance projects.",
        url: "https://hen-heang.vercel.app/contact",
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
