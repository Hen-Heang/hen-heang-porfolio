import type { CommandEntry } from "@/src/lib/types/devops-lab"
import { CopyButton } from "@/src/components/ai-engineering/CopyButton"

export function CommandCard({ entry }: { entry: CommandEntry }) {
    return (
        <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-1 font-mono text-base font-semibold text-fg">{entry.name}</h3>
            <p className="mb-3 text-sm leading-relaxed text-fg-muted">{entry.description}</p>
            <div className="mb-2 rounded-lg bg-surface-code px-3 py-2">
                <p className="font-mono text-xs text-surface-code-foreground/70">{entry.syntax}</p>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface-code px-3 py-2">
                <code className="font-mono text-sm text-brand">{entry.example}</code>
                <CopyButton text={entry.example} />
            </div>
        </div>
    )
}
