import type { ProcessStep } from "@/src/lib/types"

/** Numbered discovery → deployment timeline, rendered from a project's real `process` steps. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
    return (
        <ol className="flex flex-col">
            {steps.map((step, i) => (
                <li key={step.phase} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < steps.length - 1 && (
                        <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-border" aria-hidden />
                    )}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-fg-secondary">
                        {i + 1}
                    </span>
                    <div className="pt-1">
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-fg">{step.phase}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{step.detail}</p>
                    </div>
                </li>
            ))}
        </ol>
    )
}
