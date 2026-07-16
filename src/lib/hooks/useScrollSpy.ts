"use client"

import { useEffect, useState } from "react"

/**
 * Tracks which of the given element ids is currently in view, for
 * highlighting the active entry in a sticky table of contents.
 */
export function useScrollSpy(ids: string[]): string | null {
    const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

    useEffect(() => {
        if (ids.length === 0) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting)
                if (visible) setActiveId(visible.target.id)
            },
            { rootMargin: "-100px 0px -70% 0px" },
        )
        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- re-observe only when the id set changes, not on every render
    }, [ids.join(",")])

    return activeId
}
