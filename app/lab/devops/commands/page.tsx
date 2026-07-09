import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { commandCategories } from "@/data/lab/devops/commands"
import { CommandsPageClient } from "@/src/components/lab/devops/CommandsPageClient"

export const metadata: Metadata = {
    title: "Command Reference — DevOps Basics",
    description: "Searchable Git, Docker, Docker Compose, Linux, Maven, PostgreSQL, and npm commands with copy buttons.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/devops/commands` },
}

export default function CommandsPage() {
    return <CommandsPageClient categories={commandCategories} />
}
