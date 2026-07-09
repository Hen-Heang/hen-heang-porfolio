export interface TerminalLine {
    type?: "command" | "output" | "comment" | "success" | "error"
    text: string
}

const LINE_STYLE: Record<NonNullable<TerminalLine["type"]>, string> = {
    command: "text-[#fafafa]",
    output: "pl-4 text-[#a1a1aa]",
    comment: "text-[#52525b]",
    success: "pl-4 text-[#22c55e]",
    error: "pl-4 text-[#ef4444]",
}

export function Terminal({ title = "session", prompt = "$", lines }: { title?: string; prompt?: string; lines: TerminalLine[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#27272a] bg-[#0c0c0e]">
            <div className="flex items-center gap-2 border-b border-[#27272a] bg-[#18181b] px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
                </span>
                <span className="font-mono text-[11px] text-[#71717a]">{title}</span>
            </div>
            <div className="space-y-1.5 p-4 font-mono text-[12.5px] leading-relaxed">
                {lines.map((line, i) => {
                    const type = line.type ?? "output"
                    if (type === "command") {
                        return (
                            <p key={i} className="whitespace-pre-wrap break-words text-[#fafafa]">
                                <span className="text-[#6366f1]">{prompt}</span> {line.text}
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
