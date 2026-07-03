import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects } from "@/data/projects"
import { profileData } from "@/data/profile"
import { ProjectDetail } from "@/src/components/sections/projects/ProjectDetail"

function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug)
}

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            url: `${profileData.portfolioUrl}/projects/${project.slug}`,
            type: "article",
        },
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) notFound()

    return <ProjectDetail project={project} />
}
