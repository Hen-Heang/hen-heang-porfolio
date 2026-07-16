"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const emptySubscribe = () => () => {}

/**
 * `next-themes` only knows the real theme after mount (it reads
 * localStorage/media queries client-side) — rendering an icon before that
 * would flash/mismatch between server and client, so we gate on hydration
 * via useSyncExternalStore (true on client, false during SSR) instead of a
 * setState-in-effect.
 */
export function ThemeToggle({
    className = "h-9 w-9 rounded-lg",
    iconSize = 16,
}: {
    className?: string
    iconSize?: number
}) {
    const { resolvedTheme, setTheme } = useTheme()
    const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false)

    if (!hydrated) {
        return <div className={className} aria-hidden="true" />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className={`flex items-center justify-center text-fg-muted hover:text-fg hover:bg-surface-hover transition-colors ${className}`}
        >
            {isDark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
        </button>
    )
}
