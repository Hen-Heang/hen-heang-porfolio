import { blogPosts } from "@/data/blog"
import BlogPostClientPage from "./BlogPostClientPage"
import type { Metadata } from "next"

type Props = {
    params: { id: string }
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

export default function BlogPostPage({ params }: Props) {
    return <BlogPostClientPage params={params} />
}