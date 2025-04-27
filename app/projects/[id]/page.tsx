import { projects } from "@/data/projects"
import ProjectClientPage from "./ProjectClientPage"
import type { Metadata } from "next"

type Props = {
    params: { id: string }
}

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }))
}

export function generateMetadata({ params }: Props): Metadata {
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
        return {
            title: "Project Not Found",
        }
    }

    return {
        title: project.title,
        description: project.description,
    }
}

export default function ProjectPage({ params }: Props) {
    return <ProjectClientPage params={params} />
}