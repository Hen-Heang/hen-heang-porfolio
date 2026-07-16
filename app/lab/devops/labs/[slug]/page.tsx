import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { profileData } from "@/data/profile"
import { labs, getLab } from "@/data/lab/devops/labs"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { LabDetail } from "@/src/components/lab/devops/LabDetail"

export async function generateStaticParams() {
    return labs.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const lab = getLab(slug)
    if (!lab) return {}
    const url = `${profileData.portfolioUrl}/lab/devops/labs/${lab.slug}`
    return {
        title: `${lab.title} — Lab`,
        description: lab.description,
        alternates: { canonical: url },
        openGraph: { title: lab.title, description: lab.description, url, type: "article" },
    }
}

export default async function LabPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const lab = getLab(slug)
    if (!lab) notFound()

    return (
        <div className="px-4 md:px-8 py-10 max-w-3xl mx-auto">
            <header className="mb-8">
                <div className="mb-3">
                    <DifficultyBadge difficulty={lab.difficulty} />
                </div>
                <h1 className="mb-3 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-fg">{lab.title}</h1>
                <p className="mb-4 text-sm md:text-base leading-relaxed text-fg-secondary">{lab.description}</p>
                <span className="flex items-center gap-1 text-xs text-fg-muted">
                    <Clock size={12} />
                    {lab.estimatedTime}
                </span>
            </header>

            <LabDetail lab={lab} />
        </div>
    )
}
