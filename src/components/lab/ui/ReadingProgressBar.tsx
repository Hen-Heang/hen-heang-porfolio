"use client"

import { useEffect, useState } from "react"

/**
 * Subtle scroll-position indicator for lesson/article pages. Purely a
 * reading cue — never marks anything complete, never causes layout shift
 * (fixed, zero-height track), and collapses to a static line under
 * `prefers-reduced-motion` instead of animating on every scroll tick.
 */
export function ReadingProgressBar() {
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        function onScroll() {
            const doc = document.documentElement
            const scrollable = doc.scrollHeight - doc.clientHeight
            setPercent(scrollable > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / scrollable) * 100)) : 0)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    return (
        <div
            aria-hidden="true"
            className="fixed inset-x-0 top-0 z-[95] h-0.5 bg-transparent print:hidden"
        >
            <div
                className="h-full bg-brand transition-[width] duration-150 ease-linear motion-reduce:transition-none"
                style={{ width: `${percent}%` }}
            />
        </div>
    )
}
