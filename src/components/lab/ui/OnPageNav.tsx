"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

interface OnPageNavSection {
    id: string
    title: string
}

function NavLinks({ sections, activeId }: { sections: OnPageNavSection[]; activeId: string | null }) {
    return (
        <ol className="mt-3 space-y-1.5">
            {sections.map((section) => (
                <li key={section.id}>
                    <a
                        href={`#${section.id}`}
                        aria-current={activeId === section.id ? "location" : undefined}
                        className={`block border-l-2 py-1 pl-2.5 text-sm leading-5 transition-colors ${
                            activeId === section.id
                                ? "border-brand font-medium text-brand"
                                : "border-transparent text-fg-muted hover:text-fg"
                        }`}
                    >
                        {section.title}
                    </a>
                </li>
            ))}
        </ol>
    )
}

export function OnPageNav({ sections, title = "On this page" }: { sections: OnPageNavSection[]; title?: string }) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting)
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id)
                }
            },
            { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
        )

        const elements = sections
            .map((section) => document.getElementById(section.id))
            .filter((el): el is HTMLElement => el !== null)
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [sections])

    if (sections.length === 0) return null

    return (
        <>
            <details className="group rounded-2xl border border-border bg-surface p-4 lg:hidden">
                <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-3 marker:content-none">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{title} · {sections.length} sections</span>
                    <ChevronDown size={14} className="text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <NavLinks sections={sections} activeId={activeId} />
            </details>
            <nav aria-label={title} className="hidden rounded-2xl border border-border bg-surface p-4 lg:block">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{title}</p>
                <NavLinks sections={sections} activeId={activeId} />
            </nav>
        </>
    )
}
