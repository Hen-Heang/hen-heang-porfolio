import React from "react"
import { Section } from "@/src/components/system/Section"
import { CodeIcon, TechIcons } from "@/src/components/icons/TechIcons"
import type { SkillCategory } from "@/src/lib/types"

export function SkillsOverview({ skills }: { skills: SkillCategory[] }) {
    if (skills.length === 0) return null

    return (
        <Section eyebrow="Skills" title="Technical arsenal" className="bg-surface">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((category) => (
                    <div key={category.category}>
                        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                            {category.category}
                        </h3>
                        <ul className="mt-4 flex flex-col gap-2">
                            {category.items.map((item) => (
                                <li
                                    key={item.name}
                                    className="group flex min-h-11 items-center gap-3 rounded-lg border border-transparent px-2 py-2 text-sm transition-colors hover:border-border hover:bg-background/70"
                                >
                                    <span className="h-7 w-7 shrink-0" aria-hidden>
                                        {React.createElement(TechIcons[item.name] ?? CodeIcon)}
                                    </span>
                                    <span className="font-medium text-fg">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    )
}
