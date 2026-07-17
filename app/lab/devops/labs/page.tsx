import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { labs } from "@/data/lab/devops/labs"
import { LabCard } from "@/src/components/lab/devops/LabCard"

export const metadata: Metadata = {
    title: "Hands-on Labs — DevOps Basics",
    description: "Dockerize a Spring Boot app, run a full stack with Docker Compose, configure Nginx with HTTPS, and set up a GitHub Actions pipeline.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/devops/labs` },
}

export default function LabsPage() {
    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="mb-1 text-3xl md:text-4xl font-bold tracking-tight text-fg">Hands-on Labs</h1>
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-fg-secondary">
                    Practical walkthroughs — architecture, commands, expected result, and what actually went wrong the first time.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                {labs.map((lab) => (
                    <LabCard key={lab.slug} lab={lab} />
                ))}
            </div>
        </div>
    )
}
