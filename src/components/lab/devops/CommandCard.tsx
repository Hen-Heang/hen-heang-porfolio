import type { CommandEntry } from "@/src/lib/types/devops-lab"
import { CopyButton } from "@/src/components/ai-engineering/CopyButton"

export function CommandCard({ entry }: { entry: CommandEntry }) {
    return (
        <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-1 font-mono text-sm font-semibold text-fg">{entry.name}</h3>
            <p className="mb-3 text-xs leading-relaxed text-fg-muted">{entry.description}</p>
            <div className="mb-2 rounded-lg bg-[#0c0c0e] px-3 py-2">
                <p className="font-mono text-[11px] text-fg-muted">{entry.syntax}</p>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-[#0c0c0e] px-3 py-2">
                <code className="font-mono text-[12px] text-[#a5b4fc]">{entry.example}</code>
                <CopyButton text={entry.example} />
            </div>
        </div>
    )
}
