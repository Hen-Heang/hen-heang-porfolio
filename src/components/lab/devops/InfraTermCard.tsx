import type { InfraTerm } from "@/src/lib/types/devops-lab"

export function InfraTermCard({ term }: { term: InfraTerm }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">{term.category}</span>
            <h3 className="mt-1 mb-2 text-base font-semibold text-fg">{term.term}</h3>
            <p className="mb-3 text-sm leading-relaxed text-fg-secondary">{term.definition}</p>
            <div className="rounded-lg border border-border bg-surface-code px-3 py-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-code-foreground/60 mb-1">Why it matters for backend</p>
                <p className="text-sm leading-relaxed text-surface-code-foreground">{term.whyItMattersForBackend}</p>
            </div>
        </div>
    )
}
