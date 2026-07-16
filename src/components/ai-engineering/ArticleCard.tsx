import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { AICategory, Article } from "@/src/lib/types/ai-engineering"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { Tag } from "@/src/components/ai-engineering/Tag"

export function ArticleCard({ article, category }: { article: Article; category?: AICategory }) {
    return (
        <Link
            href={`/ai-engineering/articles/${article.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-border-strong hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-elevated text-lg shrink-0">
                    <span aria-hidden>{article.coverEmoji}</span>
                </div>
                <DifficultyBadge difficulty={article.difficulty} />
            </div>

            <div className="flex-1">
                {category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">{category.title}</span>
                )}
                <h3 className="mt-1 mb-1.5 text-sm font-semibold leading-snug text-fg group-hover:text-white">
                    {article.title}
                </h3>
                <p className="text-xs leading-relaxed text-fg-muted line-clamp-2">{article.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1 text-[10px] font-medium text-fg-muted">
                    <Clock size={11} />
                    {article.readingTime} min read
                </span>
                <ArrowRight size={13} className="text-border-strong group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}
