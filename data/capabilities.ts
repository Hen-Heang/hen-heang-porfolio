export interface CapabilityGroup {
    label: string
    summary: string
    technologies: string[]
}

// Curated from data/skills.ts (Backend/Database/Frontend/Tools categories) and
// verified project technicalDetails (Swagger/OpenAPI, Docker, GitHub Actions
// CI) — regrouped by responsibility instead of the raw skill categories so
// the homepage can show "full technical scope" without repeating the same
// pill list shown elsewhere.
export const capabilityGroups: CapabilityGroup[] = [
    {
        label: "Backend",
        summary: "Designing REST APIs and business logic with Spring Boot and Spring Security.",
        technologies: ["Java", "Spring Boot", "Spring Security", "MyBatis", "REST APIs"],
    },
    {
        label: "Data",
        summary: "Modeling schemas and writing SQL across PostgreSQL, Oracle, and MySQL.",
        technologies: ["PostgreSQL", "Oracle", "MySQL", "SQL"],
    },
    {
        label: "AI-Assisted Engineering",
        summary: "Integrating practical LLM-powered features and using AI tools for codebase analysis, implementation, review, and documentation.",
        technologies: ["Claude Code", "Codex", "Google Gemini API", "Prompt Design"],
    },
    {
        label: "Delivery",
        summary: "Documenting APIs and shipping backend services with Maven, Docker, and CI pipelines.",
        technologies: ["Git", "Maven", "Swagger / OpenAPI", "Docker", "GitHub Actions"],
    },
    {
        label: "Frontend Support",
        summary: "Extending backend work into Next.js clients when a product needs a frontend.",
        technologies: ["Next.js", "TypeScript", "JavaScript", "jQuery"],
    },
]
