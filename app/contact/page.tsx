import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { ContactPageClient } from "./ContactPageClient"

const title = "Contact"
const description = "Get in touch — email, LinkedIn, Telegram, or GitHub. Currently based in Seoul, South Korea and open to new opportunities."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${profileData.portfolioUrl}/contact`,
    },
    openGraph: {
        title,
        description,
        url: `${profileData.portfolioUrl}/contact`,
    },
}

export default function ContactPage() {
    return <ContactPageClient />
}
