import { PageLayout } from "@/src/components/layout/PageLayout"
import { blogPosts } from "@/src/data/blog-posts"
import { Badge } from "@/src/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                                My Blog
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
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
                                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                                        {/* Blog Post Image */}
                                        <div className="h-48 relative overflow-hidden">
                                            <Image 
                                                src={post.image} 
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        
                                        <div className="p-6">
                                            {/* Category Badge */}
                                            <div className="mb-4">
                                                <Badge className="bg-teal-500/90 text-white border-0">
                                                    {post.category}
                                                </Badge>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Metadata */}
                                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {post.readTime}
                                                </div>
                                            </div>

                                            {/* Read More */}
                                            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium group-hover:gap-3 transition-all duration-300">
                                                <span>Read More</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Categories */}
                        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
                                Browse by Category
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {Array.from(new Set(blogPosts.map(post => post.category))).map((category) => (
                                    <Link
                                        key={category}
                                        href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="px-6 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300"
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
