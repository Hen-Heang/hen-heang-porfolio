import type { Diagram } from "@/src/lib/types/devops-lab"

export const deploymentPipelineDiagram: Diagram = {
    title: "From a git push to production",
    nodes: [
        { label: "Developer", sublabel: "writes code" },
        { label: "Git", sublabel: "local commits" },
        { label: "GitHub", sublabel: "push / PR" },
        { label: "GitHub Actions", sublabel: "test + build" },
        { label: "Docker", sublabel: "image built" },
        { label: "Railway", sublabel: "deploy" },
        { label: "Production", sublabel: "live traffic" },
    ],
}

export const requestFlowDiagram: Diagram = {
    title: "How a request reaches your data",
    nodes: [
        { label: "Browser", sublabel: "user's request" },
        { label: "Next.js", sublabel: "frontend, Vercel" },
        { label: "Spring Boot", sublabel: "REST API" },
        { label: "PostgreSQL", sublabel: "data" },
    ],
}
