"use client"

import { blogPosts } from "@/data/blog"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import FadeIn from "@/components/animations/fade-in"

type CustomPageProps = {
    params: { id: string };
};
export default function BlogPostClientPage({ params }: { params: { id: string } }) {
    const post = blogPosts.find((p) => p.id === params.id)

    if (!post) {
        notFound()
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <FadeIn direction="up">
                        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
                            ← Back to Blog
                        </Link>
                    </FadeIn>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="relative h-80 w-full">
                            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                        </div>

                        <div className="p-8">
                            <FadeIn direction="up" delay={0.2}>
                                <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                                <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
                            </FadeIn>

                            <div className="prose max-w-none">
                                {post.content.map((paragraph, index) => (
                                    <FadeIn key={index} direction="up" delay={0.3 + index * 0.1}>
                                        <p className="mb-4">{paragraph}</p>
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn direction="up" delay={0.5} className="mt-8 pt-6 border-t">
                                <h3 className="text-lg font-bold mb-4">Share this article</h3>
                                <div className="flex space-x-4">
                                    <motion.a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </FadeIn>
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    )
}
