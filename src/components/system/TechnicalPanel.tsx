"use client"

import React, { useState } from "react"
import { ArrowDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

export interface ApiTabData {
    kind: "request"
    method: string
    path: string
    responseLines: string[]
    caption: string
}

export interface ArchitectureTabData {
    kind: "architecture"
    layers: string[]
    caption: string
}

export interface DatabaseTabData {
    kind: "database"
    tables: string[]
    caption: string
}

export interface PipelineTabData {
    kind: "pipeline"
    stages: { label: string; detail: string }[]
    caption: string
}

export type TechnicalTabData = ApiTabData | ArchitectureTabData | DatabaseTabData | PipelineTabData

export interface TechnicalTab {
    id: string
    label: string
    data: TechnicalTabData
}

const methodColor: Record<string, string> = {
    GET: "text-sky-600 dark:text-sky-400",
    POST: "text-success",
    PUT: "text-amber-600 dark:text-amber-400",
    PATCH: "text-amber-600 dark:text-amber-400",
    DELETE: "text-red-500",
}

function TabContent({ data }: { data: TechnicalTabData }) {
    switch (data.kind) {
        case "request":
            return (
                <div className="flex h-full flex-col font-mono text-[13px] leading-relaxed">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${methodColor[data.method] ?? "text-fg"}`}>{data.method}</span>
                        <span className="truncate text-fg">{data.path}</span>
                    </div>
                    <div className="mt-3 flex-1 overflow-x-auto rounded-lg bg-background/60 p-4">
                        {data.responseLines.map((line, i) => (
                            <div key={i} className="whitespace-pre text-fg-secondary">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            )
        case "architecture":
            return (
                <div className="flex h-full flex-col justify-center gap-1.5">
                    {data.layers.map((layer, i) => (
                        <React.Fragment key={layer}>
                            {i > 0 && (
                                <ArrowDown size={13} className="mx-auto shrink-0 text-fg-muted" aria-hidden />
                            )}
                            <div className="rounded-lg border border-border bg-background/60 px-4 py-2 text-center font-mono text-[13px] text-fg-secondary">
                                {layer}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )
        case "database":
            return (
                <div className="grid h-full content-center grid-cols-2 gap-1.5">
                    {data.tables.map((table) => (
                        <div
                            key={table}
                            className="truncate rounded-lg border border-border bg-background/60 px-3 py-2 font-mono text-xs text-fg-secondary"
                        >
                            {table}
                        </div>
                    ))}
                </div>
            )
        case "pipeline":
            return (
                <div className="flex h-full flex-col justify-center gap-1.5">
                    {data.stages.map((stage, i) => (
                        <React.Fragment key={stage.label}>
                            {i > 0 && (
                                <ArrowDown size={13} className="mx-auto shrink-0 text-fg-muted" aria-hidden />
                            )}
                            <div className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-background/60 px-4 py-2">
                                <span className="font-mono text-[13px] text-fg">{stage.label}</span>
                                <span className="truncate font-mono text-xs text-fg-muted">{stage.detail}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )
    }
}

/**
 * Interactive hero visual: a window-chrome panel with small tabs switching
 * between real backend-engineering views (API, architecture, database,
 * pipeline). Values come from real project data; anything illustrative is
 * labeled in its caption. Tab semantics (roving tabindex, arrow-key nav,
 * aria-selected) come from the shared Radix `Tabs` primitive.
 */
export function TechnicalPanel({ tabs }: { tabs: TechnicalTab[] }) {
    const [activeId, setActiveId] = useState(tabs[0]?.id)
    const active = tabs.find((t) => t.id === activeId) ?? tabs[0]

    if (!active) return null

    return (
        <Tabs value={active.id} onValueChange={setActiveId} className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <div className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="hidden font-mono text-[11px] text-fg-muted sm:inline" aria-hidden>
                    service://hen-heang/backend
                </span>
                <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-success sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    200 OK · operational
                </span>
            </div>
            {tabs.length > 1 && (
                <div className="hidden border-b border-border px-3 py-2 sm:block">
                    <TabsList aria-label="Engineering views" className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-0">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg-secondary data-[state=active]:bg-surface-hover data-[state=active]:text-fg data-[state=active]:shadow-none"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            )}

            {tabs.map((tab) => (
                <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="mt-0 h-[240px] p-4 outline-none animate-in fade-in-0 sm:h-[320px] sm:p-5"
                >
                    <TabContent data={tab.data} />
                </TabsContent>
            ))}

            <div className="border-t border-border px-5 py-3">
                <p className="font-mono text-xs leading-relaxed text-fg-muted">{active.data.caption}</p>
            </div>
        </Tabs>
    )
}
