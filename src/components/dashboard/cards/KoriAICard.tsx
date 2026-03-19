"use client"

import { motion } from "framer-motion"
import { deployedProjects } from "@/data/dashboard"

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    )
}

const bars   = [30, 48, 38, 62, 50, 75, 58, 80, 65, 88, 70, 95]
const transactions = [
    { icon: "💼", name: "Salary",  amt: "+$3,200", color: "#22c55e", date: "Mar 1"  },
    { icon: "🏠", name: "Rent",    amt: "-$850",   color: "#f87171", date: "Mar 3"  },
    { icon: "🍔", name: "Food",    amt: "-$210",   color: "#fb923c", date: "Mar 5"  },
    { icon: "✈️", name: "Travel",  amt: "-$320",   color: "#a78bfa", date: "Mar 8"  },
]
const categories = [
    { label: "Rent",    pct: 38, color: "#f87171" },
    { label: "Food",    pct: 22, color: "#fb923c" },
    { label: "Travel",  pct: 18, color: "#a78bfa" },
    { label: "Savings", pct: 22, color: "#22c55e" },
]
const conicStops = categories.reduce<{ stops: string[]; acc: number }>(
    ({ stops, acc }, c) => {
        const end = acc + c.pct
        stops.push(`${c.color} ${acc}% ${end}%`)
        return { stops, acc: end }
    },
    { stops: [], acc: 0 }
).stops.join(", ")

export function KoriAICard() {
    const project = deployedProjects[0] // Money Flow
    const accent  = project.accentColor ?? "#22c55e"
    const bg      = `linear-gradient(145deg, ${(project as { gradientFrom?: string }).gradientFrom ?? "#071810"}, ${(project as { gradientTo?: string }).gradientTo ?? "#0a1f12"})`

    return (
        <motion.div
            variants={{
                hidden:   { opacity: 0, y: 20 },
                visible:  { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="glow-border col-span-4 md:col-span-8 lg:col-span-8 row-span-2 relative overflow-hidden rounded-[20px] md:rounded-[24px] border flex flex-col md:flex-row min-h-[480px]"
            style={{ background: bg, borderColor: project.borderColor }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}
            transition={{ duration: 0.2 }}
        >
            {/* Orb top-right */}
            <div className="pointer-events-none absolute -top-20 right-0 w-80 h-80 rounded-full opacity-15"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} />
            <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} />

            {/* ── LEFT: project info ── */}
            <div className="relative z-10 flex flex-col justify-between p-6 md:p-10 md:w-[55%]">
                {/* Top badges + links */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}50` }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} />
                            LIVE
                        </span>
                        {project.badges?.[1] && (
                            <span className="hidden xs:inline-flex items-center bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                {project.badges[1]}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5">
                                <GithubIcon />
                            </a>
                        )}
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-all active:scale-95">
                            Visit <span className="hidden sm:inline">Platform</span> →
                        </a>
                    </div>
                </div>

                {/* Emoji + title */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="text-5xl md:text-6xl mb-5">{project.emoji}</div>
                    <h2 className="text-white text-[28px] md:text-[42px] font-extrabold tracking-tighter leading-none mb-2">
                        {project.title}
                    </h2>
                    <p className="text-sm md:text-lg font-semibold mb-4" style={{ color: accent }}>
                        {project.subtitle}
                    </p>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 md:gap-8 mb-6">
                        {project.stats?.map((stat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="text-zinc-800 text-xl">/</span>}
                                <div>
                                    <p className="text-white text-lg md:text-2xl font-bold">{stat.value}</p>
                                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => {
                            const name = typeof tech === "string" ? tech : tech.name
                            return (
                                <span key={name} className="bg-white/5 border border-white/10 text-zinc-400 text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors">
                                    {name}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: finance app mockup ── */}
            <div className="relative z-10 flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#040c07]/80 backdrop-blur-sm h-full flex flex-col">
                    {/* Browser bar */}
                    <div className="flex items-center gap-1.5 px-3 py-2.5 bg-black/40 border-b border-white/5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <div className="flex-1 mx-3 bg-white/5 rounded-md text-[10px] text-zinc-500 text-center py-0.5 px-2">
                            💸 money-flow.henheang.site
                        </div>
                    </div>

                    <div className="p-4 space-y-3 overflow-hidden flex-1">
                        {/* Balance hero */}
                        <div className="bg-white/5 rounded-xl px-4 py-3 border border-green-500/10">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Balance</p>
                            <div className="flex items-end justify-between">
                                <p className="text-2xl font-bold text-green-400">
                                    $4,280<span className="text-sm text-zinc-500 font-normal">.00</span>
                                </p>
                                <span className="text-green-400 text-xs font-semibold flex items-center gap-1">↑ +12.4%</span>
                            </div>
                            {/* Sparkline */}
                            <div className="flex items-end gap-0.5 h-8 mt-2">
                                {bars.map((h, i) => (
                                    <div key={i} className="flex-1 rounded-sm"
                                        style={{
                                            height: `${h}%`,
                                            backgroundColor: i === bars.length - 1 ? accent
                                                : i >= bars.length - 3 ? `${accent}70` : `${accent}20`,
                                        }} />
                                ))}
                            </div>
                        </div>

                        {/* Income / Expense */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 rounded-xl px-3 py-2.5 border border-green-500/10">
                                <p className="text-[10px] text-zinc-500 mb-1">📈 Income</p>
                                <p className="text-base font-bold text-green-400">$6,500</p>
                            </div>
                            <div className="bg-white/5 rounded-xl px-3 py-2.5 border border-red-500/10">
                                <p className="text-[10px] text-zinc-500 mb-1">📉 Expense</p>
                                <p className="text-base font-bold text-red-400">$2,220</p>
                            </div>
                        </div>

                        {/* Donut + categories */}
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                            <div className="relative shrink-0 w-14 h-14">
                                <div className="w-14 h-14 rounded-full"
                                    style={{ background: `conic-gradient(${conicStops})` }} />
                                <div className="absolute inset-[7px] rounded-full bg-[#040c07]" />
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 flex-1">
                                {categories.map(c => (
                                    <div key={c.label} className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                                        <p className="text-[10px] text-zinc-400 flex-1">{c.label}</p>
                                        <p className="text-[10px] font-bold" style={{ color: c.color }}>{c.pct}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="space-y-1.5">
                            {transactions.map(t => (
                                <div key={t.name} className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                                    <span className="text-base shrink-0">{t.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-zinc-200">{t.name}</p>
                                        <p className="text-[10px] text-zinc-600">{t.date}</p>
                                    </div>
                                    <p className="text-xs font-bold shrink-0" style={{ color: t.color }}>{t.amt}</p>
                                </div>
                            ))}
                        </div>

                        {/* Savings progress */}
                        <div className="bg-white/5 rounded-xl px-4 py-2.5 border border-green-500/10">
                            <div className="flex justify-between mb-1.5">
                                <p className="text-[10px] text-zinc-400">🎯 Savings Goal</p>
                                <p className="text-[10px] font-bold text-green-400">68%</p>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-green-700 to-green-400" style={{ width: "68%" }} />
                            </div>
                            <p className="text-[9px] text-zinc-600 mt-1">$3,400 of $5,000 saved</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
