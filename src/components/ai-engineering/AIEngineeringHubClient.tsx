"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Search, Sparkles, FileCode2, MessageSquareCode, Terminal, ArrowRight, X } from "lucide-react"
import type { AICategory, Article } from "@/src/lib/types/ai-engineering"
import { ArticleCard } from "@/src/components/ai-engineering/ArticleCard"
import { CategoryCard } from "@/src/components/ai-engineering/CategoryCard"
import { Tag } from "@/src/components/ai-engineering/Tag"
import { NumberTicker } from "@/src/components/ui/NumberTicker"

export function AIEngineeringHubClient({
    articles,
    categories,
    allTags,
    allTechnologies,
    promptCount,
    snippetCount,
}: {
    articles: Article[]
    categories: AICategory[]
    allTags: string[]
    allTechnologies: string[]
    promptCount: number
    snippetCount: number
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const activeCategory = searchParams.get("category")
    const categoryBySlug = useMemo(() => new Map(categories.map((c) => [c.slug, c])), [categories])

    const [query, setQuery] = useState("")
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null)

    function setCategory(slug: string | null) {
        const params = new URLSearchParams(searchParams.toString())
        if (slug) params.set("category", slug)
        else params.delete("category")
        router.push(`${pathname}${params.toString() ? `?${params}` : ""}`, { scroll: false })
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return articles.filter((a) => {
            if (activeCategory && a.category !== activeCategory) return false
            if (activeTag && !a.tags.includes(activeTag)) return false
            if (activeTech && !a.technologies.includes(activeTech)) return false
            if (activeDifficulty && a.difficulty !== activeDifficulty) return false
            if (!q) return true
            return (
                a.title.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q) ||
                a.tags.some((t) => t.toLowerCase().includes(q)) ||
                a.technologies.some((t) => t.toLowerCase().includes(q))
            )
        })
    }, [articles, query, activeCategory, activeTag, activeTech, activeDifficulty])

    const featured = articles.filter((a) => a.featured)
    const hasActiveFilters = !!(activeCategory || activeTag || activeTech || activeDifficulty || query)

    function clearFilters() {
        setQuery("")
        setActiveTag(null)
        setActiveTech(null)
        setActiveDifficulty(null)
        setCategory(null)
    }

    return (
        <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-fg-muted">
                <Link href="/lab" className="hover:text-fg transition-colors">
                    Engineering Lab
                </Link>
                <span>/</span>
                <span className="text-fg-secondary">AI Engineering</span>
            </nav>

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative mb-14 overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 md:px-12 md:py-20 text-center"
            >
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
                    <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-success/10 blur-[100px]" />
                </div>

                <span className="relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-fg-secondary">
                    <Sparkles size={11} className="text-brand" />
                    Engineering Knowledge Hub
                </span>

                <h1 className="relative mt-5 text-4xl md:text-5xl font-bold tracking-tight text-fg">
                    AI Engineering
                </h1>
                <p className="relative mt-3 text-base md:text-lg leading-relaxed text-fg-secondary">
                    Building modern backend systems with AI-assisted engineering.
                </p>
                <p className="relative mx-auto mt-4 max-w-2xl text-xs md:text-sm leading-relaxed text-fg-muted">
                    AI accelerates development, but engineers remain responsible for architecture, quality, security,
                    and business logic. Here&apos;s how I use Claude Code, ChatGPT, and Copilot as a collaborator —
                    not a replacement — while building with Java, Spring Boot, MyBatis, and PostgreSQL.
                </p>

                <div className="relative mt-8 flex justify-center gap-8">
                    {[
                        { label: "Articles", value: articles.length },
                        { label: "Prompts", value: promptCount },
                        { label: "Snippets", value: snippetCount },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-xl font-bold text-fg">
                                <NumberTicker value={s.value} />
                            </p>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">{s.label}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Quick links */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
                <Link
                    href="/ai-engineering/prompts"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <MessageSquareCode size={18} className="text-brand" />
                        <div>
                            <p className="text-sm font-semibold text-fg">Prompt Library</p>
                            <p className="text-xs text-fg-muted">Copy-ready prompts for real backend work</p>
                        </div>
                    </div>
                </Link>
                <Link
                    href="/ai-engineering/snippets"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <FileCode2 size={18} className="text-brand" />
                        <div>
                            <p className="text-sm font-semibold text-fg">Code Snippets</p>
                            <p className="text-xs text-fg-muted">MyBatis, idempotency, Thymeleaf patterns</p>
                        </div>
                    </div>
                </Link>
                <Link
                    href="/lab/devops"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-success" />
                        <div>
                            <p className="text-sm font-semibold text-fg">DevOps Basics</p>
                            <p className="text-xs text-fg-muted">Docker, CI/CD, and deployment for backend devs</p>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Categories */}
            <section className="mb-12">
                <h2 className="mb-4 text-lg font-bold text-fg">Browse by category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.slug}
                            category={cat}
                            count={articles.filter((a) => a.category === cat.slug).length}
                        />
                    ))}
                </div>
            </section>

            {/* Featured */}
            {!hasActiveFilters && featured.length > 0 && (
                <section className="mb-12">
                    <h2 className="mb-4 text-lg font-bold text-fg">Featured</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featured.map((article) => (
                            <ArticleCard key={article.slug} article={article} category={categoryBySlug.get(article.category)} />
                        ))}
                    </div>
                </section>
            )}

            {/* Search + filters */}
            <section>
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-fg">All articles</h2>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-xs font-medium text-fg-muted hover:text-fg transition-colors"
                        >
                            <X size={12} /> Clear filters
                        </button>
                    )}
                </div>

                <div className="relative mb-4">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, tag, or technology..."
                        aria-label="Search articles"
                        className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-fg-muted outline-none focus:border-brand transition-colors"
                    />
                </div>

                <div className="mb-3 flex flex-wrap gap-1.5">
                    {(["beginner", "intermediate", "advanced"] as const).map((d) => (
                        <Tag
                            key={d}
                            label={d[0].toUpperCase() + d.slice(1)}
                            active={activeDifficulty === d}
                            onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
                        />
                    ))}
                    <span className="mx-1 w-px bg-surface-elevated" />
                    {allTechnologies.map((tech) => (
                        <Tag key={tech} label={tech} active={activeTech === tech} onClick={() => setActiveTech(activeTech === tech ? null : tech)} />
                    ))}
                </div>

                <div className="mb-6 flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                        <Tag key={tag} label={tag} active={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} />
                    ))}
                </div>

                {activeCategory && (
                    <div className="mb-5 flex items-center gap-2 text-xs text-fg-muted">
                        Filtered by category:
                        <Tag label={categories.find((c) => c.slug === activeCategory)?.title || activeCategory} active onClick={() => setCategory(null)} />
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-sm text-fg-muted">No articles match your filters yet.</div>
                ) : (
                    <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((article) => (
                                <motion.div
                                    key={article.slug}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ArticleCard article={article} category={categoryBySlug.get(article.category)} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>

            {/* Back to the unified hub */}
            <Link
                href="/lab"
                className="group mt-14 flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 hover:border-border-strong transition-colors"
            >
                <span className="text-sm font-medium text-fg-secondary group-hover:text-fg">
                    Search across AI Engineering and DevOps Basics together in Engineering Lab
                </span>
                <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0 ml-3" />
            </Link>
        </div>
    )
}
