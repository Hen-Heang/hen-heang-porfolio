import React from "react"
import { Code, Target, Users, Zap } from "lucide-react"
import { Section } from "@/src/components/system/Section"
import { cn, interactiveCard } from "@/src/lib/utils/utils"

const values = [
    {
        icon: Code,
        title: "Clean Code",
        description: "Maintainable, readable code that's easy for others to build on.",
    },
    {
        icon: Target,
        title: "Problem Solving",
        description: "Breaking down complex challenges into clear, reliable solutions.",
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working closely with cross-functional teams to ship user-focused results.",
    },
    {
        icon: Zap,
        title: "Growth Mindset",
        description: "Continuously learning new tools and practices to grow as an engineer.",
    },
]

export function Philosophy() {
    return (
        <Section eyebrow="Philosophy" title="How I work">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value) => (
                    <div
                        key={value.title}
                        className={cn("rounded-xl border border-border bg-surface p-6", interactiveCard)}
                    >
                        <value.icon size={22} className="text-brand" aria-hidden />
                        <h3 className="mt-4 text-base font-semibold text-fg">{value.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{value.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}
