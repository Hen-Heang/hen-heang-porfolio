import { Info, Lightbulb, ShieldCheck, TriangleAlert } from "lucide-react"
import { cn } from "@/src/lib/utils/utils"

const config = {
    tip: { icon: Lightbulb, label: "Tip", classes: "border-brand/20 bg-brand/5 text-brand" },
    warning: { icon: TriangleAlert, label: "Warning", classes: "border-warning/20 bg-warning/5 text-warning" },
    "best-practice": { icon: ShieldCheck, label: "Best Practice", classes: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" },
    info: { icon: Info, label: "Info", classes: "border-sky-500/20 bg-sky-500/5 text-sky-400" },
} as const

export function Callout({ variant, title, text }: { variant: keyof typeof config; title?: string; text: string }) {
    const { icon: Icon, label, classes } = config[variant]
    return (
        <div className={cn("my-6 flex gap-3 rounded-xl border px-4 py-3.5", classes)}>
            <Icon size={18} className="mt-0.5 shrink-0" />
            <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1">{title || label}</p>
                <p className="text-sm leading-relaxed text-fg-secondary">{text}</p>
            </div>
        </div>
    )
}
