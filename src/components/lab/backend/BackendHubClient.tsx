"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpenCheck, Filter, Map, Search, X } from "lucide-react"
import { BACKEND_CATEGORIES, BACKEND_CONTENT_TYPES, type BackendItemSummary } from "@/src/lib/types/backend-engineering"
import { filterBackendItems, sortBackendItems } from "@/src/lib/backend/search"
import { BackendCard } from "@/src/components/lab/backend/BackendCard"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"

const categoryLabel: Record<string, string> = {
    foundations: "Foundations", java: "Java", http: "Web & HTTP", database: "Database", spring: "Spring Boot",
    api: "API", security: "Security", testing: "Testing", performance: "Performance",
    "distributed-systems": "Distributed Systems", devops: "DevOps", observability: "Operations", capstone: "Capstone",
}

export function BackendHubClient({ items }: { items: BackendItemSummary[] }) {
    const [query, setQuery] = useState("")
    const [level, setLevel] = useState("all")
    const [category, setCategory] = useState("all")
    const [difficulty, setDifficulty] = useState("all")
    const [type, setType] = useState("all")
    const [status, setStatus] = useState("all")
    const progress = useBackendProgress()

    const results = useMemo(() => sortBackendItems(filterBackendItems(items, {
        query,
        level: level === "all" ? "all" : Number(level),
        category,
        difficulty: difficulty as "all" | "beginner" | "intermediate" | "advanced",
        type: type as "all" | (typeof BACKEND_CONTENT_TYPES)[number],
        status: status as "all" | "published" | "planned" | "draft",
    })), [items, query, level, category, difficulty, type, status])

    const publishedCount = items.filter((item) => item.status === "published").length
    const completedCount = items.filter((item) => item.status === "published" && progress.has(item.id)).length
    const hasFilters = Boolean(query || level !== "all" || category !== "all" || difficulty !== "all" || type !== "all" || status !== "all")

    function resetFilters() {
        setQuery("")
        setLevel("all")
        setCategory("all")
        setDifficulty("all")
        setType("all")
        setStatus("all")
    }

    return (
        <div>
            <section className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-6 md:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Backend Engineering Lab</span>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg md:text-5xl">From fundamentals to production systems</h1>
                        <p className="mt-4 text-base leading-relaxed text-fg-secondary md:text-lg">
                            A Java- and Spring-focused curriculum for learning, reviewing, demonstrating production reasoning, and preparing for backend interviews.
                        </p>
                    </div>
                    <div className="grid min-w-64 grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-border bg-background p-4">
                            <p className="font-mono text-2xl font-bold text-fg">13</p>
                            <p className="mt-1 text-xs text-fg-muted">Roadmap levels</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-background p-4">
                            <p className="font-mono text-2xl font-bold text-fg">{completedCount}/{publishedCount}</p>
                            <p className="mt-1 text-xs text-fg-muted">Completed locally</p>
                        </div>
                    </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/lab/backend/roadmap" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90">
                        <Map size={16} aria-hidden="true" /> View roadmap <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <a href="#catalog" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg">
                        <BookOpenCheck size={16} aria-hidden="true" /> Browse content
                    </a>
                </div>
            </section>

            <section id="catalog" className="mt-10 scroll-mt-24" aria-labelledby="backend-catalog-heading">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-brand">Reference library</p>
                        <h2 id="backend-catalog-heading" className="mt-1 text-2xl font-bold text-fg">Published depth, planned progression</h2>
                    </div>
                    <p aria-live="polite" className="font-mono text-xs text-fg-muted">{results.length} item{results.length === 1 ? "" : "s"}</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="relative">
                        <Search size={16} aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search backend curriculum" placeholder="Search transactions, Java, security, PostgreSQL…" className="min-h-11 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-brand" />
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                        <FilterSelect label="Level" value={level} onChange={setLevel} options={[{ value: "all", label: "All levels" }, ...Array.from({ length: 13 }, (_, value) => ({ value: String(value), label: `Level ${value}` }))]} />
                        <FilterSelect label="Category" value={category} onChange={setCategory} options={[{ value: "all", label: "All categories" }, ...BACKEND_CATEGORIES.map((value) => ({ value, label: categoryLabel[value] }))]} />
                        <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={[{ value: "all", label: "All difficulties" }, { value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" }]} />
                        <FilterSelect label="Content type" value={type} onChange={setType} options={[{ value: "all", label: "All types" }, ...BACKEND_CONTENT_TYPES.map((value) => ({ value, label: value.replaceAll("-", " ") }))]} />
                        <FilterSelect label="Status" value={status} onChange={setStatus} options={[{ value: "all", label: "All statuses" }, { value: "published", label: "Published" }, { value: "planned", label: "Planned" }]} />
                    </div>
                    {hasFilters && (
                        <button type="button" onClick={resetFilters} className="mt-3 inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg">
                            <X size={12} aria-hidden="true" /> Clear filters
                        </button>
                    )}
                </div>

                {results.length > 0 ? (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {results.map((item) => <BackendCard key={item.id} item={item} complete={progress.has(item.id)} />)}
                    </div>
                ) : (
                    <div className="mt-5 rounded-2xl border border-dashed border-border py-16 text-center">
                        <Filter size={24} aria-hidden="true" className="mx-auto text-fg-muted" />
                        <p className="mt-3 text-sm font-semibold text-fg">No matching backend content</p>
                        <p className="mt-1 text-sm text-fg-muted">Try a broader term or clear one of the filters.</p>
                    </div>
                )}
            </section>
        </div>
    )
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
    const id = `backend-filter-${label.toLowerCase().replaceAll(" ", "-")}`
    return (
        <label htmlFor={id} className="sr-only">
            {label}
            <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm capitalize text-fg-secondary outline-none focus:border-brand">
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
        </label>
    )
}
