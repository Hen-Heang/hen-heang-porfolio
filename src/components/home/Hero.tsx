import React from "react"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import { TechnicalPanel, type TechnicalTab } from "@/src/components/system/TechnicalPanel"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

const backendSignature = [
    { label: "Runtime", value: "Java · Spring Boot" },
    { label: "Data layer", value: "MyBatis · PostgreSQL" },
    { label: "System focus", value: "APIs · auth · transactions" },
] as const

/**
 * Builds the hero's technical views from real project data. The API response
 * body and pipeline stages are labeled illustrative in their captions.
 */
function buildTabs(projects: Project[]): TechnicalTab[] {
    const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
    const tabs: TechnicalTab[] = []

    const authhub = bySlug("authhub")
    const authEndpoint = authhub?.apiEndpoints?.[0]
    if (authEndpoint) {
        tabs.push({
            id: "api",
            label: "api",
            data: {
                kind: "request",
                method: authEndpoint.method,
                path: authEndpoint.path,
                responseLines: [
                    "HTTP/1.1 200 OK",
                    "{",
                    '  "accessToken":  "eyJhbGciOiJIUzI1…",',
                    '  "refreshToken": "d290f1ee-6c54-4b01…",',
                    '  "tokenType":    "Bearer",',
                    '  "expiresIn":    900',
                    "}",
                ],
                caption: `Real endpoint from ${authhub.title.split("—")[0].trim()} (JWT with refresh + revocation). Response body illustrative.`,
            },
        })
    }

    const hphsar = bySlug("h-phsar")
    if (hphsar?.architecture?.length) {
        tabs.push({
            id: "architecture",
            label: "architecture",
            data: {
                kind: "architecture",
                layers: hphsar.architecture,
                caption: "H-Phsar marketplace API — request flow through the real production layers.",
            },
        })
    }

    const moneyFlow = bySlug("money-flow")
    if (moneyFlow?.dataModel?.length) {
        tabs.push({
            id: "database",
            label: "database",
            data: {
                kind: "database",
                tables: moneyFlow.dataModel.slice(0, 10),
                caption: "Money Flow schema — per-user access enforced with Postgres Row Level Security.",
            },
        })
    }

    tabs.push({
        id: "pipeline",
        label: "pipeline",
        data: {
            kind: "pipeline",
            stages: [
                { label: "git push", detail: "feature branch" },
                { label: "GitHub Actions", detail: "postgres:16 service" },
                { label: "build + test", detail: "Flyway validates schema" },
                { label: "deploy", detail: "on green" },
            ],
            caption: "CI pipeline as run on AuthHub (GitHub Actions + postgres:16). Stages illustrative.",
        },
    })

    return tabs
}

export function Hero({ profile, projects }: { profile: ProfileContentParsed; projects: Project[] }) {
    const tabs = buildTabs(projects)

    return (
        <section className="pb-section pt-16 md:pt-24">
            <Container>
                <Eyebrow className="mb-6">
                    Backend Developer · Java &amp; Spring Boot · {profile.location}
                </Eyebrow>
                <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-fg sm:text-5xl lg:text-7xl">
                    I build the systems <span className="text-brand">behind the screen.</span>
                </h1>

                <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
                    <div className="flex max-w-xl flex-col items-start">
                        <p className="text-lg leading-relaxed text-fg-secondary">
                            {profile.bio}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/projects"
                                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
                            >
                                Inspect backend work
                                <ArrowRight size={15} aria-hidden />
                            </Link>
                            <a
                                href={profile.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface-hover"
                            >
                                <Github size={16} aria-hidden />
                                View GitHub
                            </a>
                        </div>

                        <dl className="mt-10 grid w-full gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                            {backendSignature.map((item) => (
                                <div key={item.label} className="bg-surface px-4 py-4">
                                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                                        {item.label}
                                    </dt>
                                    <dd className="mt-1.5 text-sm font-medium leading-snug text-fg">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-10 flex flex-wrap gap-2.5">
                            <StatusBadge status="live" pulse>
                                {profile.available ? "Open to backend roles" : "Currently engaged"}
                            </StatusBadge>
                            <StatusBadge status="archived">Based in {profile.location.split(",")[0]}</StatusBadge>
                            <StatusBadge status="archived">{profile.yearsExperience} years in enterprise teams</StatusBadge>
                        </div>
                    </div>

                    <TechnicalPanel tabs={tabs} />
                </div>
            </Container>
        </section>
    )
}
