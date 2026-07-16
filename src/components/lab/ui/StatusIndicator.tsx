export type StatusLevel = "production" | "active" | "learning" | "experimenting"

const STATUS_CONFIG: Record<StatusLevel, { label: string; dot: string; text: string }> = {
    production: { label: "Production", dot: "bg-success", text: "text-success" },
    active: { label: "Active", dot: "bg-brand", text: "text-brand" },
    learning: { label: "Learning", dot: "bg-[#f59e0b]", text: "text-[#f59e0b]" },
    experimenting: { label: "Experimenting", dot: "bg-[#22d3ee]", text: "text-[#22d3ee]" },
}

export function StatusIndicator({ status, pulse = false }: { status: StatusLevel; pulse?: boolean }) {
    const config = STATUS_CONFIG[status]
    return (
        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider ${config.text}`}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${config.dot}`} />}
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dot}`} />
            </span>
            {config.label}
        </span>
    )
}
