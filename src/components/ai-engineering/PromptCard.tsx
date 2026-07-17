"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Prompt } from "@/src/lib/types/ai-engineering"
import { CopyButton } from "@/src/components/ai-engineering/CopyButton"
import { Tag } from "@/src/components/ai-engineering/Tag"
import { promptCategoryLabels } from "@/data/ai-engineering/prompts"

export function PromptCard({ prompt }: { prompt: Prompt }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                        {promptCategoryLabels[prompt.category]}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-fg">{prompt.title}</h3>
                </div>
            </div>

            <p className="mb-3 text-xs leading-relaxed text-fg-muted">{prompt.description}</p>

            <div className="mb-3 rounded-lg border border-border bg-surface-code p-3">
                <p className="mb-2 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-surface-code-foreground">{prompt.prompt}</p>
                <CopyButton text={prompt.prompt} />
            </div>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between text-xs font-medium text-fg-secondary hover:text-fg transition-colors"
            >
                Expected output &amp; best practices
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="mt-3 space-y-3 border-t border-border pt-3">
                    <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Expected output</p>
                        <p className="text-xs leading-relaxed text-fg-secondary">{prompt.expectedOutput}</p>
                    </div>
                    <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Best practices</p>
                        <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-fg-secondary">
                            {prompt.bestPractices.map((bp, i) => (
                                <li key={i}>{bp}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
                {prompt.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                ))}
            </div>
        </div>
    )
}
