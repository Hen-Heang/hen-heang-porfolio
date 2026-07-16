import Link from "next/link"
import {
    ArrowRight,
    BookOpen,
    Compass,
    FileCode2,
    FlaskConical,
    MessageSquareCode,
    Network,
    NotebookPen,
    ServerCog,
    Workflow,
} from "lucide-react"
import type { AICategory } from "@/src/lib/types/ai-engineering"

const iconMap = {
    Workflow,
    MessageSquareCode,
    ServerCog,
    Network,
    FileCode2,
    NotebookPen,
    FlaskConical,
    Compass,
}

export function CategoryCard({ category, count }: { category: AICategory; count: number }) {
    const Icon = iconMap[category.icon as keyof typeof iconMap] || BookOpen
    return (
        <Link
            href={`/ai-engineering?category=${category.slug}`}
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-border-strong hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-xl">
                    <span aria-hidden>{category.emoji}</span>
                </div>
                <Icon size={16} className="text-border-strong group-hover:text-brand transition-colors" />
            </div>
            <div>
                <h3 className="mb-1 text-sm font-semibold text-fg">{category.title}</h3>
                <p className="text-xs leading-relaxed text-fg-muted line-clamp-2">{category.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                    {count} {count === 1 ? "article" : "articles"}
                </span>
                <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}
