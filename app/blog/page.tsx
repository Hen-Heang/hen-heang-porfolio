import { PageLayout } from "@/src/components/layout/PageLayout"
import { blogPosts } from "@/src/data/blog-posts"
import { Badge } from "@/src/components/ui/badge"
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

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
    positive_reactions_count: number
    comments_count: number
    user: DevToUser
}

interface ApiResponse {
    data: DevToArticle[]
}

async function fetchDevToArticles(tag: string = 'java'): Promise<DevToArticle[]> {
    try {
        const res = await fetch(
            `http://localhost:8080/api/tech-news/devto?tag=${tag}&perPage=6`,
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return []
        const json: ApiResponse = await res.json()
        return json.data ?? []
    } catch {
        return []
    }
}

export default async function BlogPage() {
    const devToArticles = await fetchDevToArticles('java')

    return (
        <PageLayout>
            <div className="min-h-screen bg-transparent">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                                Blog Insights
                            </h1>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.
                            </p>
                        </div>

                        {/* My Blog Posts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block"
                                >
                                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="h-48 relative overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <div className="mb-4">
                                                <Badge className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0">
                                                    {post.category}
                                                </Badge>
                                            </div>

                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {post.readTime}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium group-hover:gap-3 transition-all duration-300 text-sm">
                                                <span>Read More</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Dev.to Articles Section */}
                        {devToArticles.length > 0 && (
                            <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                            From Dev.to
                                        </h2>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                            Latest Java articles from the community
                                        </p>
                                    </div>
                                    <a
                                        href="https://dev.to/t/java"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        View all <ExternalLink size={14} />
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {devToArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/blog/devto/${article.id}`}
                                            className="group block"
                                        >
                                            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                                                <div className="h-48 relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                                                    <Image
                                                        src={article.cover_image ?? article.social_image}
                                                        alt={article.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>

                                                <div className="p-6">
                                                    <div className="mb-4 flex flex-wrap gap-1">
                                                        {article.tag_list.slice(0, 2).map((tag) => (
                                                            <Badge key={tag} variant="outline" className="text-xs border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h3>

                                                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                                                        {article.description}
                                                    </p>

                                                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(article.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            {article.reading_time_minutes} min read
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium group-hover:gap-3 transition-all duration-300 text-sm">
                                                            <span>Read More</span>
                                                            <ArrowRight size={16} />
                                                        </div>
                                                        <span className="text-xs text-zinc-400">by {article.user.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
                            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8">
                                Browse by Category
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {Array.from(new Set(blogPosts.map(post => post.category))).map((category) => (
                                    <Link
                                        key={category}
                                        href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="px-6 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 text-sm font-medium"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
