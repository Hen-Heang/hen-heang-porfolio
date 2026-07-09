import type { InfraTerm } from "@/src/lib/types/devops-lab"

export function InfraTermCard({ term }: { term: InfraTerm }) {
    return (
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6366f1]">{term.category}</span>
            <h3 className="mt-1 mb-2 text-sm font-semibold text-[#fafafa]">{term.term}</h3>
            <p className="mb-3 text-xs leading-relaxed text-[#a1a1aa]">{term.definition}</p>
            <div className="rounded-lg border border-[#27272a] bg-[#0c0c0e] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#52525b] mb-1">Why it matters for backend</p>
                <p className="text-xs leading-relaxed text-[#a1a1aa]">{term.whyItMattersForBackend}</p>
            </div>
        </div>
    )
}
