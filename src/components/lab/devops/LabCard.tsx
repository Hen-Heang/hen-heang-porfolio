import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Lab } from "@/src/lib/types/devops-lab"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"

export function LabCard({ lab }: { lab: Lab }) {
    return (
        <Link
            href={`/lab/devops/labs/${lab.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-[#27272a] bg-[#18181b] p-5 transition-all hover:border-[#3f3f46] hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between">
                <DifficultyBadge difficulty={lab.difficulty} />
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#52525b]">
                    <Clock size={11} />
                    {lab.estimatedTime}
                </span>
            </div>
            <div>
                <h3 className="mb-1.5 text-sm font-semibold text-[#fafafa] group-hover:text-white">{lab.title}</h3>
                <p className="text-xs leading-relaxed text-[#71717a] line-clamp-2">{lab.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-[#27272a] pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#52525b]">{lab.steps.length} steps</span>
                <ArrowRight size={13} className="text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}
