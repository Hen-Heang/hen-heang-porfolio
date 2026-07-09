"use client"

import { useEffect, useState } from "react"

interface TocItem {
    id: string
    text: string
    level: 2 | 3
}

export function TableOfContents({ items }: { items: TocItem[] }) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        if (items.length === 0) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting)
                if (visible) setActiveId(visible.target.id)
            },
            { rootMargin: "-100px 0px -70% 0px" }
        )
        items.forEach((item) => {
            const el = document.getElementById(item.id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [items])

    if (items.length === 0) return null

    return (
        <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#52525b]">On this page</p>
            <ul className="space-y-2 border-l border-[#27272a]">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1.75rem" : "1rem" }}>
                        <a
                            href={`#${item.id}`}
                            className={`block border-l -ml-px pl-3 text-xs leading-snug transition-colors ${
                                activeId === item.id
                                    ? "border-[#6366f1] text-[#fafafa] font-medium"
                                    : "border-transparent text-[#71717a] hover:text-[#a1a1aa]"
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
