import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { infraTerms } from "@/data/lab/devops/infrastructure"
import { InfraTermCard } from "@/src/components/lab/devops/InfraTermCard"

export const metadata: Metadata = {
    title: "Backend Infrastructure — DevOps Basics",
    description: "Beginner-friendly explanations of reverse proxies, load balancers, caching, health checks, and observability for backend developers.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/devops/infrastructure` },
}

export default function InfrastructurePage() {
    return (
        <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="mb-1 text-3xl font-bold text-[#fafafa]">Backend Infrastructure</h1>
                <p className="text-sm text-[#71717a]">
                    The pieces that sit around your application in production — what each one does, and why a backend developer should care.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {infraTerms.map((term) => (
                    <InfraTermCard key={term.term} term={term} />
                ))}
            </div>
        </div>
    )
}
