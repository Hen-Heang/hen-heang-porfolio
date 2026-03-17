"use client"

import { motion } from "framer-motion"
import { BookOpen, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { getFeaturedPosts } from "@/src/data/blog-posts"
import Image from 'next/image'

export function BlogSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    return (
        <section id="blog" className="section-base section-muted">
            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-full text-sm font-medium mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Sparkles size={16} />
                            Latest Articles
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                            Blog Insights
                        </h2>
                        
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Sharing knowledge, experiences, and insights about web development, 
                            technology trends, and my journey as a developer.
                        </p>
                    </motion.div>

                    {/* Blog Posts Grid */}
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {getFeaturedPosts().slice(0, 3).map((post) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden h-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-md transition-all duration-300 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image 
                                            src={post.image} 
                                            alt={post.title}
                                            fill
                                            className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 border-0">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="p-6">
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
                                        
                                        <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        
                                        <motion.a
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium hover:gap-3 transition-all duration-300 text-sm"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read More
                                            <ArrowRight size={16} />
                                        </motion.a>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View All Posts Button */}
                    <motion.div variants={itemVariants} className="text-center">
                        <motion.a
                            href="/blog"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Posts
                            <ArrowRight size={20} />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
