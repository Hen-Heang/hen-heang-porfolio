import React from "react"
import { cn } from "@/src/lib/utils/utils"

/** Small mono overline label introducing a section or hero. */
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <p className={cn("font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-brand", className)}>
            {children}
        </p>
    )
}
