import { PageLayout } from "@/src/components/layout/PageLayout"
import { Badge } from "@/src/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface DevToUser {
    name: string
    username: string
    profile_image: string
}

interface DevToArticle {
    id: number
    title: string
    url: string
    description: string
    published_at: string
    reading_time_minutes: number
    tag_list: string[]
    cover_image: string | null
    social_image: string
    body_html: string
    user: DevToUser
}

async function fetchArticle(id: string): Promise<DevToArticle | null> {
    try {
        const res = await fetch(
            `https://dev.to/api/articles/${id}`,
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return null
        return await res.json()
    } catch {
        return null
    }
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function DevToArticlePage({ params }: PageProps) {
    const { id } = await params
    const article = await fetchArticle(id)

    if (!article) notFound()

    const coverImage = article.cover_image ?? article.social_image

    return (
        <PageLayout>
            <div className="min-h-screen bg-transparent">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
                        >
                            <ArrowLeft size={18} />
                            Back to Blog
                        </Link>

                        {/* Cover Image */}
                        {coverImage && (
                            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
                                <Image
                                    src={coverImage}
                                    alt={article.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    priority
                                />
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {article.tag_list.map((tag) => (
                                <Badge key={tag} variant="outline" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
                            {article.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                {article.user.profile_image && (
                                    <Image
                                        src={article.user.profile_image}
                                        alt={article.user.name}
                                        width={28}
                                        height={28}
                                        unoptimized
                                        className="rounded-full"
                                    />
                                )}
                                <span>{article.user.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(article.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {article.reading_time_minutes} min read
                            </div>
                        </div>

                        {/* Article Body */}
                        <article
                            className="prose prose-zinc dark:prose-invert max-w-none
                                prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
                                prose-p:text-zinc-700 dark:prose-p:text-zinc-300
                                prose-a:text-blue-600 dark:prose-a:text-blue-400
                                prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:rounded prose-code:px-1
                                prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950"
                            dangerouslySetInnerHTML={{ __html: article.body_html }}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
