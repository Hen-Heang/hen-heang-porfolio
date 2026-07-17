import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { profileData } from "@/data/profile"
import { getBackendAdjacentItems } from "@/src/lib/backend/navigation"
import { getBackendItemBySlug, getPublishedBackendItems, getRelatedBackendItems, resolveBackendItems } from "@/src/lib/backend/catalog"
import { BackendDetail } from "@/src/components/lab/backend/BackendDetail"

interface BackendDetailPageProps {
    params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
    return getPublishedBackendItems().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: BackendDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const item = getBackendItemBySlug(slug)
    if (!item || item.status !== "published") return { title: "Backend content not found" }
    const url = `${profileData.portfolioUrl}/lab/backend/${item.slug}`
    return {
        title: item.title,
        description: item.description,
        alternates: { canonical: url },
        openGraph: { title: `${item.title} | Hen Heang`, description: item.description, url, type: "article" },
    }
}

export default async function BackendDetailPage({ params }: BackendDetailPageProps) {
    const { slug } = await params
    const item = getBackendItemBySlug(slug)
    if (!item || item.status !== "published") notFound()

    const schema = {
        "@context": "https://schema.org",
        "@type": item.type === "lab" ? "LearningResource" : "TechArticle",
        headline: item.title,
        description: item.description,
        dateModified: item.updatedAt,
        author: { "@type": "Person", name: profileData.name, url: profileData.portfolioUrl },
        url: `${profileData.portfolioUrl}/lab/backend/${item.slug}`,
        educationalLevel: item.difficulty,
        about: item.technologies,
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
            <BackendDetail
                item={item}
                prerequisites={resolveBackendItems(item.prerequisiteIds)}
                related={getRelatedBackendItems(item)}
                adjacent={getBackendAdjacentItems(item.id)}
            />
        </>
    )
}
