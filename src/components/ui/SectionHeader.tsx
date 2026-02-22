import { Badge } from "@/src/components/ui/badge"

interface SectionHeaderProps {
    badge: string
    title: string
    description: string
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
    return (
        <div className="max-w-3xl mx-auto text-center mb-14">
            <Badge className="mb-4 px-3 py-1 bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-500/30">
                {badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">{title}</h2>
            {description ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
            ) : null}
        </div>
    )
}
