import type { InfraTerm } from "@/src/lib/types/devops-lab"

export function InfraTermCard({ term }: { term: InfraTerm }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">{term.category}</span>
            <h3 className="mt-1 mb-2 text-sm font-semibold text-fg">{term.term}</h3>
            <p className="mb-3 text-xs leading-relaxed text-fg-secondary">{term.definition}</p>
            <div className="rounded-lg border border-border bg-[#0c0c0e] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted mb-1">Why it matters for backend</p>
                <p className="text-xs leading-relaxed text-fg-secondary">{term.whyItMattersForBackend}</p>
            </div>
        </div>
    )
}
