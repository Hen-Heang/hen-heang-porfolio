"use client"

import { motion } from "framer-motion"
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { blogPosts, getFeaturedPosts } from "@/src/data/blog-posts"

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
        <section id="blog" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <BookOpen size={16} />
                            Latest Articles
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-slate-900 dark:text-white">My </span>
                            <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                                Blog
                            </span>
                        </h2>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Sharing knowledge, experiences, and insights about web development, 
                            technology trends, and my journey as a developer.
                        </p>
                    </motion.div>

                    {/* Blog Posts Grid */}
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {getFeaturedPosts().slice(0, 3).map((post, index) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="relative h-48 bg-gradient-to-br from-teal-100 to-indigo-100 dark:from-teal-900/20 dark:to-indigo-900/20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BookOpen size={48} className="text-teal-500 opacity-50" />
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-teal-500/90 text-white border-0">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        
                                        <motion.a
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium hover:gap-3 transition-all duration-300"
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
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05, y: -2 }}
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
