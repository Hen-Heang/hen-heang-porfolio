import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getProjectBySlug, getProjectSlugs, getAdjacentProjects } from "@/src/lib/db/portfolio"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { CaseStudy } from "@/src/components/projects/CaseStudy"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export async function generateStaticParams() {
    const slugs = await getProjectSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
        alternates: {
            canonical: `${profileData.portfolioUrl}/projects/${project.slug}`,
        },
        openGraph: {
            title: project.title,
            description: project.description,
            url: `${profileData.portfolioUrl}/projects/${project.slug}`,
            type: "article",
            images: project.image ? [{ url: project.image }] : undefined,
        },
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    if (!project) notFound()

    const { next } = await getAdjacentProjects(slug)

    return (
        <PageLayout>
            <CaseStudy project={project} nextProject={next} />
        </PageLayout>
    )
}
