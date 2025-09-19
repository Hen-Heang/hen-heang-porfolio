
import type { SkillCategory } from "@/src/lib/types"
export const skills: SkillCategory[] = [

    {
        category: "Frontend",
        items: [
            {name : "HTML", level: 4, experience: "2 years"},
            { name: "css", level: 4, experience: "2 years" },
            { name: "JavaScript", level: 4, experience: "1.5 years" },
            { name: "TypeScript", level: 4, experience: "1.5 years" },
            { name: "React", level: 4, experience: "1.5 years" },
            { name: "Next.js", level: 4, experience: "1.5 years" },
            { name: "TanStack Query", level: 3, experience: "1 year" },
            { name: "Tailwind CSS", level: 4, experience: "1.5 years" },
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Java 8+", level: 4, experience: "2.5 years" },
            { name: "Spring Boot", level: 4, experience: "2 years" },
            { name: "Spring Web/REST", level: 4, experience: "2 years" },
            { name: "Spring Security", level: 3, experience: "1.5 years" },
            { name: "Spring Data JPA", level: 4, experience: "2 years" },
            { name: "Hibernate", level: 3, experience: "1.5 years" },
            { name: "Maven", level: 4, experience: "2 years" },
            { name: "PostgreSQL", level: 4, experience: "2 years" },
            { name: "MySQL", level: 3, experience: "1.5 years" },
            { name: "Redis", level: 3, experience: "1 year" },
        ]
    },
    {
        category: "Java 8+ Features",
        items: [
            { name: "Lambda Expressions", level: 4, experience: "2 years" },
            { name: "Stream API", level: 4, experience: "2 years" },
            { name: "Optional", level: 4, experience: "2 years" },
            { name: "CompletableFuture", level: 3, experience: "1.5 years" },
            { name: "Method References", level: 4, experience: "2 years" },
            { name: "Functional Interfaces", level: 4, experience: "2 years" },
            { name: "Date/Time API", level: 3, experience: "1.5 years" },
        ]
    },
    {
        category: "Tools",
        items: [
             { name: "Git", level: 4, experience: "1.5 years" },
            { name: "IntelliJ IDEA", level: 3, experience: "1 year" },
            { name: "WebStorm", level: 4, experience: "1.5 years" },
            { name: "GitHub", level: 4, experience: "1.5 years" }
        ]
    }
]