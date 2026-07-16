import React from "react"
import Image from "next/image"
import { Award, ExternalLink, GraduationCap, Medal } from "lucide-react"
import { Section } from "@/src/components/system/Section"
import { cn, interactiveCard } from "@/src/lib/utils/utils"
import type { Achievement } from "@/data/achievements"

const typeIcon = {
    certificate: Award,
    graduation: GraduationCap,
    award: Medal,
} as const

export function AchievementsGrid({ achievements }: { achievements: Achievement[] }) {
    if (achievements.length === 0) return null

    const sorted = [...achievements].sort((a, b) => Number(b.date) - Number(a.date))

    return (
        <Section eyebrow="Achievements" title="Certifications & milestones">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((a) => {
                    const Icon = typeIcon[a.type]
                    return (
                        <li
                            key={a.id}
                            className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-surface", interactiveCard)}
                        >
                            {a.image && (
                                <div className="relative aspect-[4/3] border-b border-border bg-background">
                                    <Image
                                        src={a.image}
                                        alt={`${a.title} certificate`}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-contain p-3"
                                    />
                                </div>
                            )}
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <Icon size={18} className="text-brand" aria-hidden />
                                    <span className="font-mono text-xs text-fg-muted">{a.date}</span>
                                </div>
                                <h3 className="mt-3 text-sm font-semibold text-fg">{a.title}</h3>
                                <p className="mt-1 text-sm text-fg-muted">{a.issuer}</p>
                                {a.description && (
                                    <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{a.description}</p>
                                )}
                                {a.link && (
                                    <a
                                        href={a.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                    >
                                        View certificate
                                        <ExternalLink size={14} aria-hidden />
                                    </a>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Section>
    )
}
