import { ExternalLink } from "lucide-react"
import type { LearningCard } from "@/src/lib/types/devops-lab"
import { Callout } from "@/src/components/ai-engineering/Callout"
import { CopyButton } from "@/src/components/ai-engineering/CopyButton"

export function LearningCardView({ card }: { card: LearningCard }) {
    return (
        <div className="text-[#d4d4d8]">
            <h2 className="mb-3 text-lg font-bold text-fg">Overview</h2>
            <p className="mb-8 text-[15px] leading-[1.8] text-fg-secondary">{card.overview}</p>

            <h2 className="mb-3 text-lg font-bold text-fg">Why it matters</h2>
            <p className="mb-8 text-[15px] leading-[1.8] text-fg-secondary">{card.whyItMatters}</p>

            <h2 className="mb-3 text-lg font-bold text-fg">How backend developers use it</h2>
            <p className="mb-8 text-[15px] leading-[1.8] text-fg-secondary">{card.howBackendDevsUseIt}</p>

            <h2 className="mb-3 text-lg font-bold text-fg">Common mistakes</h2>
            <div className="mb-8 space-y-3">
                {card.commonMistakes.map((mistake, i) => (
                    <Callout key={i} variant="warning" text={mistake} />
                ))}
            </div>

            <h2 className="mb-3 text-lg font-bold text-fg">Example commands</h2>
            <div className="mb-8 space-y-3">
                {card.exampleCommands.map((c, i) => (
                    <div key={i} className="rounded-xl border border-border bg-[#0c0c0e] p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="text-xs text-fg-muted">{c.description}</p>
                            <CopyButton text={c.command} />
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#d4d4d8]">{c.command}</pre>
                    </div>
                ))}
            </div>

            {card.resources.length > 0 && (
                <>
                    <h2 className="mb-3 text-lg font-bold text-fg">Resources</h2>
                    <ul className="space-y-2">
                        {card.resources.map((r) => (
                            <li key={r.url}>
                                <a
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm text-brand hover:text-[#818cf8] transition-colors"
                                >
                                    {r.label}
                                    <ExternalLink size={12} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
