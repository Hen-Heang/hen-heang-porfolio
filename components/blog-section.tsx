import { blogPosts } from "@/data/blog"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerChildren from "@/components/animations/stagger-children"
import StaggerItem from "@/components/animations/stagger-item"
import HoverCard from "@/components/animations/hover-card"

export default function BlogSection() {
    // Only show the first 3 blog posts on the homepage
    const featuredPosts = blogPosts.slice(0, 3)

    return (
        <section className="py-16 bg-gray-50 dark:bg-github-bg-light">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-github-text-primary">Latest Articles</h2>
                        <p className="text-gray-600 dark:text-github-text-secondary max-w-2xl mx-auto">
                            Read my thoughts on web development, technology, and more.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => (
                        <StaggerItem key={post.id}>
                            <HoverCard className="bg-white dark:bg-github-bg-dark rounded-lg overflow-hidden shadow-md dark:shadow-github border border-gray-200 dark:border-github-border h-full">
                                <div className="relative h-48 w-full">
                                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                                </div>

                                <div className="p-6">
                                    <p className="text-github-purple dark:text-github-purple-light text-sm mb-2">{post.date}</p>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-github-text-primary">{post.title}</h3>
                                    <p className="text-gray-600 dark:text-github-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-github-purple dark:text-github-purple-light font-medium hover:text-github-purple-dark dark:hover:text-white"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerChildren>

                <ScrollReveal direction="up" className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="px-6 py-3 bg-github-purple text-white font-medium rounded-md hover:bg-github-purple-dark transition-colors"
                    >
                        View All Articles
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    )
}