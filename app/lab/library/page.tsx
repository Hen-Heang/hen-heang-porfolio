import type { Metadata } from "next"
import { Suspense } from "react"
import { profileData } from "@/data/profile"
import { getEngineeringLabIndex } from "@/src/lib/db/engineering-lab"
import { LabNav } from "@/src/components/lab/ui/LabNav"
import { LabLibraryClient } from "@/src/components/lab/library/LabLibraryClient"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Library — Engineering Lab",
    description: "Search every guide, lab, checklist, prompt, snippet, and reference across the Engineering Lab in one place.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/library` },
    openGraph: {
        title: "Library — Engineering Lab | Hen Heang",
        description: "Search every guide, lab, checklist, prompt, snippet, and reference across the Engineering Lab in one place.",
        url: `${profileData.portfolioUrl}/lab/library`,
        type: "website",
    },
}

export default async function LabLibraryPage() {
    const { items } = await getEngineeringLabIndex()

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
            <LabNav active="library" />
            <div className="mb-6">
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">Library</span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg md:text-4xl">Search the whole Engineering Lab</h1>
                <p className="mt-2 max-w-xl text-base leading-6 text-fg-secondary">
                    Guides, hands-on labs, checklists, commands, prompts, snippets, and infrastructure references — all in one searchable place.
                </p>
            </div>
            {/* useSearchParams inside the client tree requires a Suspense boundary in the App Router. */}
            <Suspense>
                <LabLibraryClient items={items} />
            </Suspense>
        </div>
    )
}
