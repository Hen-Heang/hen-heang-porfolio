export type EngineeringLabSource = "AI Engineering" | "Backend Engineering" | "DevOps Basics"

export interface EngineeringLabSearchItem {
    title: string
    description: string
    href: string
    source: EngineeringLabSource
    type: string
    tags: string[]
}

export interface LabMetric {
    label: string
    value: number
    suffix?: string
}

export interface FeaturedWork {
    slug: string
    title: string
    description: string
    architecture: string[]
}
