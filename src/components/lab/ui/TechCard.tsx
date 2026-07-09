import { TechIcons, CodeIcon } from "@/src/components/icons/TechIcons"

/** Tech names in project/status data often carry a version suffix (e.g. "Java 17", "React 19") that isn't in the icon map. */
function resolveIcon(name: string) {
    if (TechIcons[name]) return TechIcons[name]
    const stripped = name.replace(/\s+\d+\+?$/, "").trim()
    return TechIcons[stripped] ?? CodeIcon
}

export function TechCard({ name, category }: { name: string; category?: string }) {
    const Icon = resolveIcon(name)
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#27272a] bg-[#18181b] px-3.5 py-3">
            <span className="h-6 w-6 shrink-0" aria-hidden="true">
                <Icon />
            </span>
            <span className="min-w-0">
                <span className="block truncate text-xs font-medium text-[#fafafa]">{name}</span>
                {category && <span className="block font-mono text-[9px] uppercase tracking-wider text-[#52525b]">{category}</span>}
            </span>
        </div>
    )
}
