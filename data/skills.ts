// data/skills.ts
import type { SkillCategory } from "@/types"

export const skills: SkillCategory[] = [
    {
        category: "Frontend",
        items: [
            { name: "HTML", level: 4, experience: "4 years" },
            { name: "CSS", level: 4, experience: "4 years" },
            { name: "JavaScript", level: 4, experience: "3 years" },
            { name: "React", level: 4, experience: "2 years" },
            { name: "Tailwind CSS", level: 3, experience: "1 year" }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", level: 3, experience: "2 years" },
            { name: "Express", level: 3, experience: "2 years" },
            { name: "MongoDB", level: 3, experience: "2 years" },
            { name: "SQL", level: 2, experience: "1 year" }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Git", level: 4, experience: "3 years" },
            { name: "GitHub", level: 4, experience: "3 years" },
            { name: "VS Code", level: 4, experience: "4 years" },
            { name: "Figma", level: 3, experience: "1 year" }
        ]
    },
]