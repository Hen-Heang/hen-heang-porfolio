"use client"

import { useScrollSpy } from "@/src/lib/hooks/useScrollSpy"

interface TocItem {
    id: string
    text: string
    level: 2 | 3
}

export function TableOfContents({ items }: { items: TocItem[] }) {
    const activeId = useScrollSpy(items.map((item) => item.id))

    if (items.length === 0) return null

    return (
        <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-fg-muted">On this page</p>
            <ul className="space-y-2 border-l border-border">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1.75rem" : "1rem" }}>
                        <a
                            href={`#${item.id}`}
                            className={`block border-l -ml-px pl-3 text-xs leading-snug transition-colors ${
                                activeId === item.id
                                    ? "border-brand text-fg font-medium"
                                    : "border-transparent text-fg-muted hover:text-fg-secondary"
                            }`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
