"use client"

import { NumberTicker } from "@/src/components/ui/NumberTicker"

export function MetricCard({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-2xl font-bold text-fg">
                <NumberTicker value={value} />
                {suffix && <span className="text-brand">{suffix}</span>}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted">{label}</p>
        </div>
    )
}
