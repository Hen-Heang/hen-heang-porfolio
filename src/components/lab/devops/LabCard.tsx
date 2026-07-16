import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Lab } from "@/src/lib/types/devops-lab"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"

export function LabCard({ lab }: { lab: Lab }) {
    return (
        <Link
            href={`/lab/devops/labs/${lab.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-border-strong hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between">
                <DifficultyBadge difficulty={lab.difficulty} />
                <span className="flex items-center gap-1 text-[10px] font-medium text-fg-muted">
                    <Clock size={11} />
                    {lab.estimatedTime}
                </span>
            </div>
            <div>
                <h3 className="mb-1.5 text-sm font-semibold text-fg group-hover:text-white">{lab.title}</h3>
                <p className="text-xs leading-relaxed text-fg-muted line-clamp-2">{lab.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">{lab.steps.length} steps</span>
                <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}
