"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/src/lib/utils/utils"

export function CopyButton({ text, className }: { text: string; className?: string }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // clipboard unavailable — silently ignore
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-fg-secondary hover:text-fg hover:border-border-strong transition-colors",
                className
            )}
        >
            {copied ? (
                <>
                    <Check size={12} className="text-emerald-500" />
                    Copied
                </>
            ) : (
                <>
                    <Copy size={12} />
                    Copy
                </>
            )}
        </button>
    )
}
