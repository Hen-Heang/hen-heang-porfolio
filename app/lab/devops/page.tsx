import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { roadmap } from "@/data/lab/devops/roadmap"
import { DevOpsLabHubClient } from "@/src/components/lab/devops/DevOpsLabHubClient"

export const metadata: Metadata = {
    title: "DevOps Basics — Engineering Lab",
    description:
        "Learning how modern backend applications are built, deployed, monitored, and maintained — Docker, CI/CD, Nginx, and deployment, from a backend developer's perspective.",
    alternates: {
        canonical: `${profileData.portfolioUrl}/lab/devops`,
    },
    openGraph: {
        title: "DevOps for Backend Developers | Hen Heang",
        description:
            "Learning how modern backend applications are built, deployed, monitored, and maintained.",
        url: `${profileData.portfolioUrl}/lab/devops`,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DevOps for Backend Developers | Hen Heang",
        description: "Learning how modern backend applications are built, deployed, monitored, and maintained.",
    },
}

export default function DevOpsLabPage() {
    return <DevOpsLabHubClient topics={roadmap} />
}
