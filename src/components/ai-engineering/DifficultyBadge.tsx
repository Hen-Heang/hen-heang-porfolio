import type { Difficulty } from "@/src/lib/types/ai-engineering"
import { cn } from "@/src/lib/utils/utils"

const styles: Record<Difficulty, string> = {
    beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
}

const labels: Record<Difficulty, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
}

export function DifficultyBadge({ difficulty, className }: { difficulty: Difficulty; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                styles[difficulty],
                className
            )}
        >
            {labels[difficulty]}
        </span>
    )
}
