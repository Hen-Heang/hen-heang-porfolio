'use client'
import React from "react"
import { blogPosts } from "@/data/blog"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerChildren from "@/components/animations/stagger-children"
import StaggerItem from "@/components/animations/stagger-item"
import HoverCard from "@/components/animations/hover-card"

export default function BlogPage() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Blog</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Read my thoughts on web development, technology, and more.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <StaggerItem key={post.id}>
                            <HoverCard className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                                <div className="relative h-48 w-full">
                                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                                </div>

                                <div className="p-6">
                                    <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                                    <Link href={`/blog/${post.id}`} className="text-blue-600 font-medium hover:text-blue-800">
                                        Read More →
                                    </Link>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}