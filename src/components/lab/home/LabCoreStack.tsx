import { TechCard } from "@/src/components/lab/ui/TechCard"

/** Derives the deduplicated tech list from system-status entries — pure, server-side, no client memoization needed. */
export function coreStackFrom(systemStatus: { area: string; tech: string }[]): { name: string; category: string }[] {
    const seen = new Set<string>()
    const stack: { name: string; category: string }[] = []
    for (const entry of systemStatus) {
        for (const tech of entry.tech.split("·").map((t) => t.trim())) {
            if (seen.has(tech)) continue
            seen.add(tech)
            stack.push({ name: tech, category: entry.area })
        }
    }
    return stack
}

export function LabCoreStack({ coreStack }: { coreStack: { name: string; category: string }[] }) {
    return (
        <section className="mb-12">
            <h2 className="mb-4 font-mono text-base font-semibold uppercase tracking-wider text-fg-muted">Core stack</h2>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {coreStack.map((tech) => (
                    <TechCard key={tech.name} name={tech.name} category={tech.category} />
                ))}
            </div>
        </section>
    )
}
