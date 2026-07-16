import { cn } from "@/src/lib/utils/utils"

export function Tag({ label, active, onClick, className }: { label: string; active?: boolean; onClick?: () => void; className?: string }) {
    const Comp = onClick ? "button" : "span"
    return (
        <Comp
            onClick={onClick}
            className={cn(
                "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium transition-colors",
                active
                    ? "bg-brand text-white"
                    : "bg-surface-elevated text-fg-secondary hover:text-fg",
                onClick && "cursor-pointer",
                className
            )}
        >
            {label}
        </Comp>
    )
}
