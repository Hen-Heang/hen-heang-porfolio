import type { Metadata } from "next"
import Link from "next/link"
import { TestTubes, ArrowUpRight } from "lucide-react"
import { profileData } from "@/data/profile"
import { systemStatus, currentFocus } from "@/data/lab/overview"
import { StatusIndicator } from "@/src/components/lab/ui/StatusIndicator"
import { Tag } from "@/src/components/ai-engineering/Tag"

export const metadata: Metadata = {
    title: "Experiments — Engineering Lab",
    description: "What's actively being explored right now — not shipped case studies, but work in progress.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/experiments` },
    openGraph: {
        title: "Experiments | Hen Heang",
        description: "What's actively being explored right now — not shipped case studies, but work in progress.",
        url: `${profileData.portfolioUrl}/lab/experiments`,
        type: "website",
    },
}

/** Where to point each system-status area once it's promoted into an experiment card. */
const AREA_LINK: Record<string, string> = {
    "AI Engineering": "/ai-engineering",
    DevOps: "/lab/devops",
}

export default function ExperimentsPage() {
    const active = systemStatus.filter((entry) => entry.status === "experimenting" || entry.status === "learning")

    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-secondary">
                <TestTubes size={11} aria-hidden="true" className="text-[#22d3ee]" />
                ~/lab/experiments
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-fg">Experiments</h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-fg-secondary">
                Not shipped case studies — this is what&apos;s actively being explored right now, still finding its
                shape.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted">Current focus</span>
                {currentFocus.map((f) => (
                    <Tag key={f} label={f} />
                ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {active.map((entry) => (
                    <div key={entry.area} className="rounded-2xl border border-border bg-surface p-5">
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-fg">{entry.area}</p>
                            <StatusIndicator status={entry.status} pulse />
                        </div>
                        <p className="mb-3 font-mono text-[11px] text-brand">{entry.tech}</p>
                        <p className="text-xs leading-relaxed text-fg-muted">{entry.detail}</p>
                        {AREA_LINK[entry.area] && (
                            <Link
                                href={AREA_LINK[entry.area]}
                                className="mt-4 flex items-center gap-1 font-mono text-[11px] text-fg-secondary hover:text-fg transition-colors"
                            >
                                explore
                                <ArrowUpRight size={12} aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
