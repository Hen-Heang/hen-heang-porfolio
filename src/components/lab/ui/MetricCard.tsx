"use client"

import { NumberTicker } from "@/src/components/ui/NumberTicker"

export function MetricCard({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
    return (
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-4">
            <p className="text-2xl font-bold text-[#fafafa]">
                <NumberTicker value={value} />
                {suffix && <span className="text-[#6366f1]">{suffix}</span>}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#71717a]">{label}</p>
        </div>
    )
}
