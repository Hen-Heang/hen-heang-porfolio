export type EngineeringLabSource = "AI Engineering" | "Backend Engineering" | "DevOps Basics"

export interface EngineeringLabSearchItem {
    title: string
    description: string
    href: string
    source: EngineeringLabSource
    type: string
    tags: string[]
}
