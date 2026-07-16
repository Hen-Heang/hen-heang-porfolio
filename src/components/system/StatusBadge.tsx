import React from "react"
import { cn } from "@/src/lib/utils/utils"

type Status = "live" | "active" | "wip" | "archived"

const dotColor: Record<Status, string> = {
    live: "bg-success",
    active: "bg-success",
    wip: "bg-amber-500",
    archived: "bg-fg-muted",
}

/** Small mono status chip with a colored dot (green = live/active). */
export function StatusBadge({
    status = "live",
    pulse = false,
    className,
    children,
}: {
    status?: Status
    pulse?: boolean
    className?: string
    children: React.ReactNode
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-fg-secondary",
                className,
            )}
        >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
                {pulse && (
                    <span
                        className={cn(
                            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none",
                            dotColor[status],
                        )}
                    />
                )}
                <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotColor[status])} />
            </span>
            {children}
        </span>
    )
}
