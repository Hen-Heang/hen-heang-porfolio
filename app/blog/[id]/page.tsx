import { blogPosts } from "@/data/blog"
import BlogPostClientPage from "./BlogPostClientPage"
import type { Metadata } from "next"

// Updated Props to match Next.js expectations
type Props = {
    params: { id: string }
    searchParams?: Record<string, string | string[] | undefined>
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }))
}

export function generateMetadata({ params }: Props): Metadata {
    const post = blogPosts.find((p) => p.id === params.id)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
    }
}

// Making the component async to match Next.js expectations
export default async function BlogPostPage({ params }: Props) {
    return <BlogPostClientPage params={params} />
}