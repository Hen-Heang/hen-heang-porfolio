import { Quote } from "lucide-react"
import { StatusIndicator } from "@/src/components/lab/ui/StatusIndicator"
import type { SystemStatusEntry } from "@/data/lab/overview"

export function LabSystemStatus({ systemStatus, philosophy }: { systemStatus: SystemStatusEntry[]; philosophy: string }) {
    return (
        <section className="mb-12">
            <h2 className="mb-4 font-mono text-base font-semibold uppercase tracking-wider text-fg-muted">System status</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {systemStatus.map((entry) => (
                    <div key={entry.area} className="rounded-2xl border border-border bg-surface p-4">
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <p className="text-lg font-semibold text-fg">{entry.area}</p>
                            <StatusIndicator status={entry.status} />
                        </div>
                        <p className="mb-2 font-mono text-sm text-brand">{entry.tech}</p>
                        <p className="text-base leading-relaxed text-fg-secondary">{entry.detail}</p>
                    </div>
                ))}

                {/* Philosophy card fills the grid */}
                <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <Quote size={13} aria-hidden="true" className="text-brand" />
                        <p className="font-mono text-sm uppercase tracking-wider text-fg-muted">Engineering philosophy</p>
                    </div>
                    <p className="text-base leading-relaxed text-fg-secondary">{philosophy}</p>
                </div>
            </div>
        </section>
    )
}
