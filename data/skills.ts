
import type { SkillCategory } from "@/types"
export const skills: SkillCategory[] = [

    {
        category: "Frontend",
        items: [
            {name : "HTML", level: 4, experience: "1.5 years"},
            { name: "css", level: 4, experience: "1.5 years" },
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
            { name: "Java", level: 3, experience: "1 year" },
            { name: "Spring Boot", level: 3, experience: "1 year" },
            // { name: "Spring Data", level: 3, experience: "1 year" },
            // { name: "RESTful APIs", level: 3, experience: "1.5 years" },
            { name: "PostgreSQL", level: 3, experience: "1 year" },
        ]
    },
    {
        category: "Tools",
        items: [
            // { name: "Git", level: 4, experience: "1.5 years" },
            { name: "IntelliJ IDEA", level: 3, experience: "1 year" },
            { name: "WebStorm", level: 4, experience: "1.5 years" },
            // { name: "Docker", level: 2, experience: "6 months" },
            { name: "GitHub", level: 4, experience: "1.5 years" },
            // { name: "Data Grid", level: 3, experience: "8 months" }
        ]
    },
]