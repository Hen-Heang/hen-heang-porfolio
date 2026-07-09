import { ArrowRight, ArrowDown } from "lucide-react"
import type { Diagram } from "@/src/lib/types/devops-lab"

export function DiagramViewer({ diagram }: { diagram: Diagram }) {
    return (
        <div className="my-6 rounded-2xl border border-[#27272a] bg-[#18181b] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">{diagram.title}</p>
            <div className="flex flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-2">
                {diagram.nodes.map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                        <div className="flex min-w-[120px] flex-1 flex-col items-center gap-0.5 rounded-xl border border-[#27272a] bg-[#0c0c0e] px-3 py-3 text-center md:flex-none">
                            <span className="text-sm font-semibold text-[#fafafa]">{node.label}</span>
                            {node.sublabel && <span className="text-[10px] text-[#71717a]">{node.sublabel}</span>}
                        </div>
                        {i < diagram.nodes.length - 1 && (
                            <>
                                <ArrowDown size={16} className="shrink-0 text-[#3f3f46] md:hidden" />
                                <ArrowRight size={16} className="hidden shrink-0 text-[#3f3f46] md:block" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
