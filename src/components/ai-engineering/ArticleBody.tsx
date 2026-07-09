import type { ContentBlock } from "@/src/lib/types/ai-engineering"
import { CodeBlock } from "@/src/components/ai-engineering/CodeBlock"
import { Callout } from "@/src/components/ai-engineering/Callout"

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <div className="max-w-none text-[#d4d4d8]">
            {blocks.map((block, i) => {
                switch (block.type) {
                    case "paragraph":
                        return (
                            <p key={i} className="mb-5 text-[15px] leading-[1.8] text-[#a1a1aa]">
                                {block.text}
                            </p>
                        )
                    case "heading": {
                        const Tag = block.level === 2 ? "h2" : "h3"
                        return (
                            <Tag
                                key={i}
                                id={block.id}
                                className={
                                    block.level === 2
                                        ? "mt-10 mb-4 scroll-mt-24 text-xl font-bold text-[#fafafa]"
                                        : "mt-8 mb-3 scroll-mt-24 text-base font-semibold text-[#fafafa]"
                                }
                            >
                                {block.text}
                            </Tag>
                        )
                    }
                    case "code":
                        return <CodeBlock key={i} code={block.code} language={block.language} filename={block.filename} />
                    case "list":
                        return block.ordered ? (
                            <ol key={i} className="mb-5 list-decimal space-y-2 pl-5 text-[15px] leading-[1.8] text-[#a1a1aa]">
                                {block.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ol>
                        ) : (
                            <ul key={i} className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[#a1a1aa]">
                                {block.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        )
                    case "callout":
                        return <Callout key={i} variant={block.variant} title={block.title} text={block.text} />
                    case "quote":
                        return (
                            <blockquote
                                key={i}
                                className="my-6 border-l-2 border-[#6366f1] pl-4 text-[15px] italic leading-[1.8] text-[#d4d4d8]"
                            >
                                &ldquo;{block.text}&rdquo;
                                {block.cite && <footer className="mt-2 text-xs not-italic text-[#71717a]">— {block.cite}</footer>}
                            </blockquote>
                        )
                    case "table":
                        return (
                            <div key={i} className="my-6 overflow-x-auto rounded-xl border border-[#27272a]">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-[#27272a] bg-[#18181b]">
                                            {block.headers.map((h, j) => (
                                                <th key={j} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#71717a]">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.rows.map((row, j) => (
                                            <tr key={j} className="border-b border-[#27272a] last:border-0">
                                                {row.map((cell, k) => (
                                                    <td key={k} className="px-4 py-2.5 align-top text-[#a1a1aa]">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    case "timeline":
                        return (
                            <div key={i} className="my-6 space-y-0">
                                {block.steps.map((step, j) => (
                                    <div key={j} className="relative flex gap-4 pb-6 last:pb-0">
                                        {j < block.steps.length - 1 && (
                                            <span className="absolute left-[9px] top-6 h-full w-px bg-[#27272a]" />
                                        )}
                                        <span className="relative z-10 mt-1 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-2 border-[#6366f1] bg-[#09090b] text-[9px] font-bold text-[#6366f1]">
                                            {j + 1}
                                        </span>
                                        <div>
                                            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#6366f1]">{step.label}</p>
                                            <p className="text-sm leading-relaxed text-[#a1a1aa]">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    default:
                        return null
                }
            })}
        </div>
    )
}
