"use client"

import React, { useState } from "react"
import { Database, PanelsTopLeft, ServerCog, ShieldCheck, type LucideIcon } from "lucide-react"
import { Section } from "@/src/components/system/Section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

interface Capability {
    id: string
    title: string
    description: string
    icon: LucideIcon
    example: { label: string; lines: string[] }
}

const capabilities: Capability[] = [
    {
        id: "backend",
        title: "API & Domain Systems",
        description: "Spring Boot services that turn business rules into explicit, testable flows.",
        icon: ServerCog,
        example: {
            label: "Order write path",
            lines: [
                "POST /api/v1/orders",
                "→ validate API contract",
                "→ @Transactional service",
                "→ enforce state transition",
                "→ persist + publish event",
            ],
        },
    },
    {
        id: "data",
        title: "Data & Persistence",
        description: "PostgreSQL and Oracle schemas, MyBatis/JPA mappings, migrations, and query tuning.",
        icon: Database,
        example: {
            label: "Query plan check",
            lines: [
                "EXPLAIN ANALYZE",
                "SELECT * FROM orders",
                "WHERE status = 'PENDING'",
                "  AND store_id = $1;",
                "→ Index Scan using idx_orders_store_status",
            ],
        },
    },
    {
        id: "security",
        title: "Security & Reliability",
        description: "Spring Security, JWT/MFA, rate limiting, testing, and observable failure paths.",
        icon: ShieldCheck,
        example: {
            label: "Authentication boundary",
            lines: [
                "Bearer JWT",
                "→ SecurityFilterChain",
                "→ signature + expiry",
                "→ revoked-token lookup",
                "→ role / permission guard",
            ],
        },
    },
    {
        id: "integration",
        title: "Product Integration",
        description: "Stable API contracts carried through to Next.js clients when the product needs it.",
        icon: PanelsTopLeft,
        example: {
            label: "Client ↔ service contract",
            lines: [
                "GET /api/v1/orders?store={id}",
                "→ typed response envelope",
                "→ TanStack Query cache",
                "→ optimistic UI update",
            ],
        },
    },
]

/** Four capability tabs; hovering/focusing a row previews its technical example (also reachable by touch/click and arrow keys). */
export function Capabilities() {
    const [activeId, setActiveId] = useState<string>(capabilities[0].id)

    return (
        <Section
            eyebrow="Capabilities"
            title="What I own on the backend"
            description="From the first request to the final database write: API contracts, domain logic, persistence, security, and the client integration around them."
        >
            <Tabs
                value={activeId}
                onValueChange={setActiveId}
                orientation="vertical"
                className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16"
            >
                {/* No `divide-{color}` here — its `:not()` combinator selector
                    outranks each row's own `border-brand`/`border-transparent`
                    active-state class, silently overriding it. */}
                <TabsList
                    aria-label="Engineering capabilities"
                    className="h-auto flex-col divide-y divide-border rounded-none border-y border-border bg-transparent p-0"
                >
                    {capabilities.map((cap, i) => (
                        <TabsTrigger
                            key={cap.id}
                            value={cap.id}
                            onMouseEnter={() => setActiveId(cap.id)}
                            className="group flex h-auto w-full items-start justify-start gap-6 rounded-none border-l-2 border-transparent py-6 pl-4 -ml-0.5 text-left shadow-none transition-all duration-150 hover:border-border-strong hover:bg-surface data-[state=active]:border-brand data-[state=active]:bg-surface data-[state=active]:shadow-none"
                        >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-fg-muted transition-colors group-data-[state=active]:border-brand/30 group-data-[state=active]:bg-brand/10 group-data-[state=active]:text-brand">
                                <cap.icon size={17} aria-hidden />
                            </span>
                            <span>
                                <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-fg">
                                    {cap.title}
                                    <span className="font-mono text-[10px] font-normal text-fg-muted" aria-hidden>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </span>
                                <span className="mt-1 block max-w-md text-sm leading-relaxed text-fg-secondary">
                                    {cap.description}
                                </span>
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {capabilities.map((cap) => (
                    <TabsContent
                        key={cap.id}
                        value={cap.id}
                        className="mt-0 rounded-xl border border-border bg-surface p-5"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                            {cap.example.label}
                        </p>
                        <pre className="mt-4 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-fg-secondary">
                            {cap.example.lines.join("\n")}
                        </pre>
                    </TabsContent>
                ))}
            </Tabs>
        </Section>
    )
}
