import React from "react"
import { cn } from "@/src/lib/utils/utils"

interface SectionHeadingProps {
    as?: "h1" | "h2" | "h3"
    size?: "display" | "lg" | "md"
    className?: string
    children: React.ReactNode
}

const sizeClasses = {
    display: "text-display",
    lg: "text-display-sm",
    md: "text-2xl font-semibold tracking-tight sm:text-3xl",
}

export function SectionHeading({ as: Tag = "h2", size = "lg", className, children }: SectionHeadingProps) {
    return <Tag className={cn("text-balance text-fg", sizeClasses[size], className)}>{children}</Tag>
}
