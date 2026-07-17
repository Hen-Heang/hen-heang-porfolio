import { MetricCard } from "@/src/components/lab/ui/MetricCard"
import type { LabMetric } from "@/src/lib/types/engineering-lab"

export function LabMetrics({ metrics }: { metrics: LabMetric[] }) {
    return (
        <section className="mb-6">
            <h2 className="mb-4 font-mono text-base font-semibold uppercase tracking-wider text-fg-muted">Lab metrics</h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {metrics.map((m) => (
                    <MetricCard key={m.label} label={m.label} value={m.value} suffix={m.suffix} />
                ))}
            </div>
        </section>
    )
}
