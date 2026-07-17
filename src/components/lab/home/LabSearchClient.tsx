"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, X } from "lucide-react"
import type { EngineeringLabSearchItem, EngineeringLabSource } from "@/src/lib/types/engineering-lab"
import { Tag } from "@/src/components/ai-engineering/Tag"

const sourceTextColors: Record<EngineeringLabSource, string> = {
    "AI Engineering": "text-brand",
    "Backend Engineering": "text-success",
    "DevOps Basics": "text-warning",
}

const suggestions = ["Spring Security", "Docker", "PostgreSQL", "CI/CD"]

/**
 * The only interactive island on the Lab homepage. `children` is the
 * server-rendered dashboard content (already in the initial HTML) — it's
 * shown as-is with no query, and swapped for client-computed results while
 * searching, without ever being fetched or re-fetched.
 */
export function LabSearchClient({ items, children }: { items: EngineeringLabSearchItem[]; children: React.ReactNode }) {
    const [query, setQuery] = useState("")

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return items
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.source.toLowerCase().includes(q) ||
                    item.type.toLowerCase().includes(q) ||
                    item.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 24)
    }, [items, query])

    return (
        <section id="lab-library" className="scroll-mt-24" aria-labelledby="lab-library-heading">
            <div className="mb-5">
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">Find exactly what you need</p>
                <h2 id="lab-library-heading" className="mt-1 text-2xl font-bold tracking-tight text-fg md:text-3xl">Search the Engineering Lab</h2>
                <p className="mt-2 text-base leading-6 text-fg-secondary">Search across guides, labs, prompts, snippets, commands, and infrastructure references.</p>
            </div>

            <div className="mb-10 max-w-2xl">
                <div className="relative">
                    <Search size={16} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Docker, JWT, MyBatis, CI/CD..."
                        aria-label="Search Engineering Lab"
                        className="min-h-12 w-full rounded-2xl border border-border bg-surface py-3 pl-11 pr-11 text-base text-fg placeholder:text-fg-muted outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
                    />
                    {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-elevated hover:text-fg"><X size={15} aria-hidden="true" /></button>}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">Try</span>
                    {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="rounded-full border border-border px-2.5 py-1 text-sm text-fg-secondary transition-colors hover:border-border-strong hover:text-fg">{suggestion}</button>)}
                </div>
            </div>

            {query.trim() ? (
                <div className="mb-14 animate-in fade-in-0 duration-150 motion-reduce:animate-none">
                    <p className="mb-4 font-mono text-base font-semibold uppercase tracking-wider text-fg-muted">
                        {results.length} result{results.length === 1 ? "" : "s"}
                    </p>
                    {results.length === 0 ? (
                        <div className="py-16 text-center text-base text-fg-muted">Nothing matches yet — try a different term.</div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-3">
                            {results.map((item) => (
                                <Link
                                    key={`${item.source}-${item.type}-${item.href}-${item.title}`}
                                    href={item.href}
                                    className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`font-mono text-xs font-semibold uppercase tracking-wider ${sourceTextColors[item.source]}`}
                                        >
                                            {item.source} · {item.type}
                                        </span>
                                        <ArrowRight size={13} aria-hidden="true" className="shrink-0 text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                                    <p className="text-base leading-relaxed text-fg-secondary line-clamp-2">{item.description}</p>
                                    {item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.tags.slice(0, 3).map((t) => (
                                                <Tag key={t} label={t} />
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                children
            )}
        </section>
    )
}
