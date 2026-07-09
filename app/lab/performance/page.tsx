import type { Metadata } from "next"
import Link from "next/link"
import { Gauge, ArrowUpRight } from "lucide-react"
import { profileData } from "@/data/profile"
import { performanceTechniques, type PerformanceEntry } from "@/data/lab/performance"

export const metadata: Metadata = {
    title: "Performance Lab — Engineering Lab",
    description: "Caching, optimistic UI, background jobs, and data-access decisions that keep these apps fast and reliable.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/performance` },
    openGraph: {
        title: "Performance Lab | Hen Heang",
        description: "Caching, optimistic UI, background jobs, and data-access decisions that keep these apps fast and reliable.",
        url: `${profileData.portfolioUrl}/lab/performance`,
        type: "website",
    },
}

const CATEGORY_ORDER: PerformanceEntry["category"][] = ["Caching", "Optimistic UI", "Background Jobs", "Data Access", "Reliability"]

const CATEGORY_COLOR: Record<PerformanceEntry["category"], string> = {
    Caching: "text-[#6366f1]",
    "Optimistic UI": "text-[#22d3ee]",
    "Background Jobs": "text-[#f59e0b]",
    "Data Access": "text-[#22c55e]",
    Reliability: "text-[#22c55e]",
}

export default function PerformanceLabPage() {
    const groups = CATEGORY_ORDER.map((category) => ({
        category,
        entries: performanceTechniques.filter((t) => t.category === category),
    })).filter((g) => g.entries.length > 0)

    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#18181b] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">
                <Gauge size={11} aria-hidden="true" className="text-[#f59e0b]" />
                ~/lab/performance
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-[#fafafa]">Performance Lab</h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-[#a1a1aa]">
                Caching, optimistic UI, background jobs, and data-access decisions that keep these apps fast and
                reliable — pulled straight from what shipped, not synthetic benchmarks.
            </p>

            <div className="mt-10 space-y-8">
                {groups.map((group) => (
                    <section key={group.category}>
                        <p className={`mb-3 font-mono text-xs font-semibold uppercase tracking-wider ${CATEGORY_COLOR[group.category]}`}>
                            {group.category}
                        </p>
                        <div className="space-y-2.5">
                            {group.entries.map((entry, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-2 rounded-2xl border border-[#27272a] bg-[#18181b] p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                                >
                                    <p className="text-sm leading-relaxed text-[#d4d4d8]">{entry.text}</p>
                                    <Link
                                        href={`/projects/${entry.slug}`}
                                        className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-[#71717a] hover:text-[#fafafa] transition-colors"
                                    >
                                        {entry.project.split(" — ")[0]}
                                        <ArrowUpRight size={12} aria-hidden="true" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
