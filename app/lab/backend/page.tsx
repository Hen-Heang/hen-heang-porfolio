import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getBackendSummaries } from "@/src/lib/backend/catalog"
import { BackendHubClient } from "@/src/components/lab/backend/BackendHubClient"

export const metadata: Metadata = {
    title: "Backend Engineering Lab",
    description: "A practical Java and Spring Boot backend engineering curriculum from programming fundamentals to production-ready systems.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/backend` },
    openGraph: {
        title: "Backend Engineering Lab | Hen Heang",
        description: "Java, Spring Boot, PostgreSQL, MyBatis, security, testing, DevOps, and production engineering.",
        url: `${profileData.portfolioUrl}/lab/backend`,
        type: "website",
    },
}

export default function BackendEngineeringPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
            <BackendHubClient items={getBackendSummaries()} />
        </main>
    )
}
