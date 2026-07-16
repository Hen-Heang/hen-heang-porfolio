"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Clock, ArrowRight } from "lucide-react"
import type { RoadmapTopic, LabDifficulty } from "@/src/lib/types/devops-lab"

const TABS: LabDifficulty[] = ["beginner", "intermediate", "advanced"]
const STORAGE_KEY = "devops-roadmap-progress"

function useProgress() {
    const [done, setDone] = useState<Set<string>>(new Set())

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) setDone(new Set(JSON.parse(raw)))
        } catch {
            // ignore corrupt storage
        }
    }, [])

    function toggle(slug: string) {
        setDone((prev) => {
            const next = new Set(prev)
            if (next.has(slug)) next.delete(slug)
            else next.add(slug)
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
            } catch {
                // ignore quota errors
            }
            return next
        })
    }

    return { done, toggle }
}

export function Roadmap({ topics }: { topics: RoadmapTopic[] }) {
    const [activeTab, setActiveTab] = useState<LabDifficulty>("beginner")
    const { done, toggle } = useProgress()

    const filtered = useMemo(() => topics.filter((t) => t.difficulty === activeTab), [topics, activeTab])

    const progressByTab = useMemo(() => {
        return Object.fromEntries(
            TABS.map((tab) => {
                const items = topics.filter((t) => t.difficulty === tab)
                const completed = items.filter((t) => done.has(t.slug)).length
                return [tab, { completed, total: items.length }]
            })
        ) as Record<LabDifficulty, { completed: number; total: number }>
    }, [topics, done])

    return (
        <div>
            <div className="mb-5 flex flex-wrap gap-2">
                {TABS.map((tab) => {
                    const p = progressByTab[tab]
                    const pct = p.total ? Math.round((p.completed / p.total) * 100) : 0
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex flex-col gap-1.5 rounded-xl border px-4 py-2.5 text-left transition-colors ${
                                activeTab === tab
                                    ? "border-brand bg-brand/10"
                                    : "border-border bg-surface hover:border-border-strong"
                            }`}
                        >
                            <span className={`text-xs font-semibold capitalize ${activeTab === tab ? "text-fg" : "text-fg-secondary"}`}>
                                {tab}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-elevated">
                                    <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-[10px] text-fg-muted">
                                    {p.completed}/{p.total}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>

            <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map((topic) => {
                        const isDone = done.has(topic.slug)
                        const content = (
                            <>
                                <div className="mb-2 flex items-start justify-between gap-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">{topic.category}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggle(topic.slug)
                                        }}
                                        aria-label={isDone ? `Mark ${topic.title} as not learned` : `Mark ${topic.title} as learned`}
                                        aria-pressed={isDone}
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                            isDone ? "border-emerald-500 bg-emerald-500/20 text-emerald-500" : "border-border-strong text-transparent hover:border-fg-muted"
                                        }`}
                                    >
                                        <Check size={12} strokeWidth={3} />
                                    </button>
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-fg">{topic.title}</h3>
                                <p className="mb-3 flex-1 text-xs leading-relaxed text-fg-muted line-clamp-2">{topic.description}</p>
                                <div className="flex items-center justify-between border-t border-border pt-3">
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-fg-muted">
                                        <Clock size={11} />
                                        {topic.estimatedTime}
                                    </span>
                                    {topic.hasCard ? (
                                        <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
                                    ) : (
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Planned</span>
                                    )}
                                </div>
                            </>
                        )

                        return (
                            <motion.div
                                key={topic.slug}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {topic.hasCard ? (
                                    <Link
                                        href={`/lab/devops/topics/${topic.slug}`}
                                        className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition-all hover:border-border-strong hover:-translate-y-0.5"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-surface/50 p-4 opacity-70">
                                        {content}
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
