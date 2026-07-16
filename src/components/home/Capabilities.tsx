"use client"

import React, { useState } from "react"
import { Section } from "@/src/components/system/Section"

interface Capability {
    id: string
    title: string
    description: string
    example: { label: string; lines: string[] }
}

const capabilities: Capability[] = [
    {
        id: "backend",
        title: "Backend Systems",
        description: "Spring Boot, REST APIs, MyBatis, security and transactions.",
        example: {
            label: "Controller → Service → Mapper",
            lines: [
                "@RestController",
                "class OrderController {",
                "  orderService.create(dto)",
                "}",
                "→ OrderService (transaction boundary)",
                "→ OrderMapper.xml (MyBatis SQL)",
            ],
        },
    },
    {
        id: "data",
        title: "Data & Reliability",
        description: "PostgreSQL, Oracle, schema design, SQL tuning and monitoring.",
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
        id: "product",
        title: "Product Engineering",
        description: "Next.js applications connected to production backend systems.",
        example: {
            label: "Frontend ↔ API contract",
            lines: [
                "useQuery(['orders', storeId], () =>",
                "  api.get(`/api/v1/orders?store=${storeId}`)",
                ")",
                "→ typed response envelope",
                "→ optimistic cache update",
            ],
        },
    },
    {
        id: "ai",
        title: "AI-assisted Development",
        description: "Claude Code, Codex, implementation planning and automated review.",
        example: {
            label: "AI development workflow",
            lines: [
                "1. Plan mode → scoped implementation plan",
                "2. Implement in small, gated phases",
                "3. lint · typecheck · test · build after each",
                "4. Review diff before merge",
            ],
        },
    },
]

/** Four capability rows; hovering/focusing a row reveals a small technical example (also reachable by touch/click). */
export function Capabilities() {
    const [activeId, setActiveId] = useState<string>(capabilities[0].id)
    const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0]

    return (
        <Section
            eyebrow="Capabilities"
            title="What I build with"
            description="Four areas cover most of the work — backend systems, the data underneath them, the products in front of them, and AI-assisted delivery."
        >
            <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
                {/* No `divide-{color}` here — its `:not()` combinator selector
                    outranks each row's own `border-brand`/`border-transparent`
                    active-state class, silently overriding it. */}
                <div className="flex flex-col divide-y border-y border-border">
                    {capabilities.map((cap, i) => (
                        <button
                            key={cap.id}
                            type="button"
                            aria-expanded={activeId === cap.id}
                            onMouseEnter={() => setActiveId(cap.id)}
                            onFocus={() => setActiveId(cap.id)}
                            onClick={() => setActiveId(cap.id)}
                            className={`flex w-full items-start gap-6 border-l-2 py-6 pl-4 -ml-0.5 text-left transition-all duration-150 ${
                                activeId === cap.id
                                    ? "border-brand bg-surface"
                                    : "border-transparent hover:border-border-strong hover:bg-surface"
                            }`}
                        >
                            <span className="pt-0.5 font-mono text-sm text-fg-muted">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                                <span className="block text-lg font-semibold tracking-tight text-fg">
                                    {cap.title}
                                </span>
                                <span className="mt-1 block max-w-md text-sm leading-relaxed text-fg-secondary">
                                    {cap.description}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>

                <div className="rounded-xl border border-border bg-surface p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                        {active.example.label}
                    </p>
                    <pre className="mt-4 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-fg-secondary">
                        {active.example.lines.join("\n")}
                    </pre>
                </div>
            </div>
        </Section>
    )
}
