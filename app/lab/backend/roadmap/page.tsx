import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { profileData } from "@/data/profile"
import { backendRoadmap } from "@/data/lab/backend"
import { resolveBackendItems } from "@/src/lib/backend/catalog"
import { BackendRoadmap } from "@/src/components/lab/backend/BackendRoadmap"

export const metadata: Metadata = {
    title: "Backend Engineering Roadmap",
    description: "Thirteen progressive levels from developer and Java foundations through Spring, databases, security, reliability, deployment, observability, and a production capstone.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/backend/roadmap` },
    openGraph: {
        title: "Backend Engineering Roadmap | Hen Heang",
        description: "A Java and Spring Boot path from fundamentals to production operations.",
        url: `${profileData.portfolioUrl}/lab/backend/roadmap`,
        type: "website",
    },
}

export default function BackendRoadmapPage() {
    const relatedByLevel = new Map(backendRoadmap.map((level) => [level.level, resolveBackendItems(level.relatedItemIds)]))
    const schema = {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: "Backend Engineering Roadmap",
        description: "A thirteen-level Java and Spring Boot backend engineering curriculum.",
        url: `${profileData.portfolioUrl}/lab/backend/roadmap`,
        educationalLevel: ["Beginner", "Intermediate", "Advanced"],
        teaches: backendRoadmap.map((level) => level.title),
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
            <Link href="/lab/backend" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"><ArrowLeft size={14} aria-hidden="true" /> Backend Engineering</Link>
            <header className="mb-9 mt-6 max-w-4xl">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">13-level learning path</span>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg md:text-5xl">Backend Engineering Roadmap</h1>
                <p className="mt-4 text-base leading-8 text-fg-secondary">Progress from machine and Java fundamentals to secure Spring APIs, relational data, reliability, distributed-system judgment, delivery, observability, and a fictional production capstone. Published pages provide depth now; planned metadata makes the full progression visible without empty articles.</p>
            </header>
            <BackendRoadmap levels={backendRoadmap} relatedByLevel={relatedByLevel} />
        </main>
    )
}
