import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects } from "@/data/projects"
import { ProjectDetail } from "@/src/components/sections/projects/ProjectDetail"

function getProjectBySlug(slug: string) {
    return projects.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
    )
}

export function generateStaticParams() {
    return projects.map((p) => ({
        slug: p.title.toLowerCase().replace(/\s+/g, "-"),
    }))
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
