import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { AICategory, Article } from "@/src/lib/types/ai-engineering"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { Tag } from "@/src/components/ai-engineering/Tag"

export function ArticleCard({ article, category }: { article: Article; category?: AICategory }) {
    return (
        <Link
            href={`/ai-engineering/articles/${article.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-[#27272a] bg-[#18181b] p-5 transition-all hover:border-[#3f3f46] hover:-translate-y-0.5"
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#27272a] text-lg shrink-0">
                    <span aria-hidden>{article.coverEmoji}</span>
                </div>
                <DifficultyBadge difficulty={article.difficulty} />
            </div>

            <div className="flex-1">
                {category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6366f1]">{category.title}</span>
                )}
                <h3 className="mt-1 mb-1.5 text-sm font-semibold leading-snug text-[#fafafa] group-hover:text-white">
                    {article.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#71717a] line-clamp-2">{article.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#27272a] pt-3">
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#52525b]">
                    <Clock size={11} />
                    {article.readingTime} min read
                </span>
                <ArrowRight size={13} className="text-[#3f3f46] group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}
