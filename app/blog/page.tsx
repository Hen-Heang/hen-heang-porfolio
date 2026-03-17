import { PageLayout } from "@/src/components/layout/PageLayout"
import { blogPosts } from "@/src/data/blog-posts"
import { Badge } from "@/src/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
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

                        {/* Blog Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <Link 
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block"
                                >
                                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                        {/* Blog Post Image */}
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
                                            {/* Category Badge */}
                                            <div className="mb-4">
                                                <Badge className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0">
                                                    {post.category}
                                                </Badge>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            {/* Metadata */}
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

                                            {/* Read More */}
                                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium group-hover:gap-3 transition-all duration-300 text-sm">
                                                <span>Read More</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

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
