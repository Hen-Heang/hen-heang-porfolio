export interface TerminalLine {
    type?: "command" | "output" | "comment" | "success" | "error"
    text: string
}

const LINE_STYLE: Record<NonNullable<TerminalLine["type"]>, string> = {
    command: "text-surface-code-foreground",
    output: "pl-4 text-surface-code-foreground/80",
    comment: "text-surface-code-foreground/50",
    success: "pl-4 text-success",
    error: "pl-4 text-error",
}

export function Terminal({ title = "session", prompt = "$", lines }: { title?: string; prompt?: string; lines: TerminalLine[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-code">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </span>
                <span className="font-mono text-xs text-fg-muted">{title}</span>
            </div>
            <div className="space-y-1.5 p-4 font-mono text-[12.5px] leading-relaxed">
                {lines.map((line, i) => {
                    const type = line.type ?? "output"
                    if (type === "command") {
                        return (
                            <p key={i} className="whitespace-pre-wrap break-words text-surface-code-foreground">
                                <span className="text-brand">{prompt}</span> {line.text}
                            </p>
                        )
                    }
                    return (
                        <p key={i} className={`whitespace-pre-wrap break-words ${LINE_STYLE[type]}`}>
                            {line.text}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}
