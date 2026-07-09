import type { Snippet } from "@/src/lib/types/ai-engineering"
import { CodeBlock } from "@/src/components/ai-engineering/CodeBlock"
import { Tag } from "@/src/components/ai-engineering/Tag"

export function SnippetCard({ snippet }: { snippet: Snippet }) {
    return (
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#fafafa]">{snippet.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                    {snippet.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                    ))}
                </div>
            </div>
            <p className="mb-1 text-xs leading-relaxed text-[#71717a]">{snippet.explanation}</p>
            <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
    )
}
