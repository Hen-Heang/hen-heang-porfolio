"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Sparkles,
    Terminal,
    ArrowRight,
    MessageSquareCode,
    FileCode2,
    FlaskConical,
    BookOpen,
    ScrollText,
} from "lucide-react"
import type { EngineeringLabSearchItem } from "@/src/lib/types/engineering-lab"
import type { EngineeringLabStats } from "@/src/lib/db/engineering-lab"
import { NumberTicker } from "@/src/components/ui/NumberTicker"
import { Tag } from "@/src/components/ai-engineering/Tag"

const aiLinks = [
    { href: "/ai-engineering", icon: Sparkles, label: "Articles & Categories" },
    { href: "/ai-engineering/prompts", icon: MessageSquareCode, label: "Prompt Library" },
    { href: "/ai-engineering/snippets", icon: FileCode2, label: "Code Snippets" },
]

const devopsLinks = [
    { href: "/lab/devops", icon: Terminal, label: "Roadmap & Topics" },
    { href: "/lab/devops/labs", icon: FlaskConical, label: "Hands-on Labs" },
    { href: "/lab/devops/commands", icon: ScrollText, label: "Command Reference" },
    { href: "/lab/devops/infrastructure", icon: BookOpen, label: "Infrastructure Glossary" },
]

export function EngineeringLabHubClient({ items, stats }: { items: EngineeringLabSearchItem[]; stats: EngineeringLabStats }) {
    const [query, setQuery] = useState("")

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return items
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 24)
    }, [items, query])

    const aiTotal = stats.aiArticles + stats.aiPrompts + stats.aiSnippets
    const devopsTotal = stats.devopsTopics + stats.devopsLabs

    return (
        <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative mb-10 overflow-hidden rounded-3xl border border-[#27272a] bg-[#18181b] px-6 py-14 md:px-12 md:py-16 text-center"
            >
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[#6366f1]/20 blur-[100px]" />
                    <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-[#22c55e]/15 blur-[100px]" />
                </div>

                <span className="relative inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#09090b] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa]">
                    <Terminal size={11} className="text-[#6366f1]" />
                    One place for everything I&apos;m building and learning
                </span>

                <h1 className="relative mt-5 text-3xl md:text-5xl font-bold tracking-tight text-[#fafafa]">Engineering Lab</h1>
                <p className="relative mx-auto mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-[#a1a1aa]">
                    AI-assisted backend engineering and the DevOps practices that get it into production —
                    search across articles, prompts, snippets, topics, labs, and commands in one place.
                </p>

                <div className="relative mx-auto mt-8 max-w-xl">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525b]" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search everything — Docker, JWT, MyBatis, CI/CD..."
                        aria-label="Search Engineering Lab"
                        className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] py-3.5 pl-11 pr-4 text-sm text-[#fafafa] placeholder:text-[#52525b] outline-none focus:border-[#6366f1] transition-colors"
                    />
                </div>
            </motion.section>

            {/* Unified search results */}
            <AnimatePresence mode="wait">
                {query.trim() ? (
                    <motion.section
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-14"
                    >
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                            {results.length} result{results.length === 1 ? "" : "s"}
                        </p>
                        {results.length === 0 ? (
                            <div className="py-16 text-center text-sm text-[#52525b]">Nothing matches yet — try a different term.</div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-3">
                                {results.map((item, i) => (
                                    <Link
                                        key={`${item.href}-${item.title}-${i}`}
                                        href={item.href}
                                        className="group flex flex-col gap-2 rounded-2xl border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className={`text-[10px] font-semibold uppercase tracking-wider ${
                                                    item.source === "AI Engineering" ? "text-[#6366f1]" : "text-[#22c55e]"
                                                }`}
                                            >
                                                {item.source} · {item.type}
                                            </span>
                                            <ArrowRight size={13} className="shrink-0 text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-[#fafafa] group-hover:text-white">{item.title}</h3>
                                        <p className="text-xs leading-relaxed text-[#71717a] line-clamp-2">{item.description}</p>
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
                    </motion.section>
                ) : (
                    <motion.div key="sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Two big section cards */}
                        <section className="mb-14 grid gap-4 lg:grid-cols-2">
                            <div className="rounded-3xl border border-[#27272a] bg-[#18181b] p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366f1]/15">
                                            <Sparkles size={16} className="text-[#6366f1]" />
                                        </span>
                                        <h2 className="text-base font-bold text-[#fafafa]">AI Engineering</h2>
                                    </div>
                                    <span className="text-xl font-bold text-[#fafafa]">
                                        <NumberTicker value={aiTotal} />
                                    </span>
                                </div>
                                <p className="mb-4 text-xs leading-relaxed text-[#71717a]">
                                    How I use Claude Code, ChatGPT, and Copilot as a collaborator — prompt engineering,
                                    backend architecture notes, and reusable code patterns.
                                </p>
                                <div className="space-y-1.5">
                                    {aiLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="group flex items-center justify-between rounded-xl border border-[#27272a] px-3.5 py-2.5 hover:border-[#3f3f46] transition-colors"
                                        >
                                            <span className="flex items-center gap-2 text-xs font-medium text-[#a1a1aa] group-hover:text-[#fafafa]">
                                                <link.icon size={13} />
                                                {link.label}
                                            </span>
                                            <ArrowRight size={12} className="text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-[#27272a] bg-[#18181b] p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22c55e]/15">
                                            <Terminal size={16} className="text-[#22c55e]" />
                                        </span>
                                        <h2 className="text-base font-bold text-[#fafafa]">DevOps Basics</h2>
                                    </div>
                                    <span className="text-xl font-bold text-[#fafafa]">
                                        <NumberTicker value={devopsTotal} />
                                    </span>
                                </div>
                                <p className="mb-4 text-xs leading-relaxed text-[#71717a]">
                                    Understanding the software delivery lifecycle — Docker, CI/CD, Nginx, and deployment,
                                    from a backend developer&apos;s perspective, not a platform engineer&apos;s.
                                </p>
                                <div className="space-y-1.5">
                                    {devopsLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="group flex items-center justify-between rounded-xl border border-[#27272a] px-3.5 py-2.5 hover:border-[#3f3f46] transition-colors"
                                        >
                                            <span className="flex items-center gap-2 text-xs font-medium text-[#a1a1aa] group-hover:text-[#fafafa]">
                                                <link.icon size={13} />
                                                {link.label}
                                            </span>
                                            <ArrowRight size={12} className="text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
