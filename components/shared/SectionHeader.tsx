import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps {
    badge: string
    title: string
    description: string
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
    return (
        <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-400/20">
                {badge}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    )
}
