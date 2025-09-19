import { notFound } from 'next/navigation'
import { getPostBySlug, blogPosts } from '@/src/data/blog-posts'
import { PageLayout } from "@/src/components/layout/PageLayout"
import { Badge } from "@/src/components/ui/badge"
import { BlogPostRenderer } from "@/src/components/ui/BlogPostRenderer"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link 
                            href="/blog"
                            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors mb-8"
                        >
                            <ArrowLeft size={20} />
                            Back to Blog
                        </Link>

                        {/* Hero Image */}
                        <div className="mb-12">
                            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    src={post.image} 
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <Badge className="bg-teal-500/90 text-white border-0 mb-4">
                                        {post.category}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Article Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {post.readTime}
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="text-slate-900 dark:text-white">{post.title}</span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">H</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {post.author}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Full-Stack Developer
                                        </p>
                                    </div>
                                </div>

                                <button className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                    <Share2 size={20} className="text-slate-600 dark:text-slate-300" />
                                </button>
                            </div>
                        </header>

                        {/* Article Content */}
                        <article className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                            <BlogPostRenderer content={post.content} isDark={true} />
                        </article>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge 
                                        key={tag}
                                        variant="outline"
                                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                                Related Articles
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {blogPosts
                                    .filter(p => p.id !== post.id && p.category === post.category)
                                    .slice(0, 2)
                                    .map((relatedPost) => (
                                        <Link 
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="block p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg"
                                        >
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
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
