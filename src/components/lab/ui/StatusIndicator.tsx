export type StatusLevel = "production" | "active" | "learning" | "experimenting"

const STATUS_CONFIG: Record<StatusLevel, { label: string; dot: string; text: string }> = {
    production: { label: "Production", dot: "bg-success", text: "text-success" },
    active: { label: "Active", dot: "bg-brand", text: "text-brand" },
    learning: { label: "Learning", dot: "bg-warning", text: "text-warning" },
    experimenting: { label: "Experimenting", dot: "bg-sky-500 dark:bg-sky-400", text: "text-sky-600 dark:text-sky-400" },
}

export function StatusIndicator({ status, pulse = false }: { status: StatusLevel; pulse?: boolean }) {
    const config = STATUS_CONFIG[status]
    return (
        <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider ${config.text}`}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${config.dot}`} />}
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dot}`} />
            </span>
            {config.label}
        </span>
    )
}
