"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { techStack } from "@/data/dashboard"
import { Coffee, Leaf, Database, Globe, Code, Layers, Server } from "lucide-react"

// Map tech names to Lucide icons
const getIcon = (skill: string) => {
    const iconProps = { size: 14, className: "shrink-0" }
    switch (skill.toLowerCase()) {
        case "java": return <Coffee {...iconProps} />
        case "spring boot": return <Leaf {...iconProps} />
        case "mybatis": return <Database {...iconProps} />
        case "next.js": return <Globe {...iconProps} />
        case "typescript": return <Code {...iconProps} />
        case "postgresql": return <Server {...iconProps} />
        default: return <Layers {...iconProps} />
    }
}

// Map tech names to accent colors
const getColor = (skill: string) => {
    switch (skill.toLowerCase()) {
        case "java": return "group-hover:text-[#f89820]"
        case "spring boot": return "group-hover:text-[#6db33f]"
        case "mybatis": return "group-hover:text-[#eab308]"
        case "next.js": return "group-hover:text-[#fafafa]"
        case "typescript": return "group-hover:text-[#3178c6]"
        case "postgresql": return "group-hover:text-[#336791]"
        default: return "group-hover:text-[#fafafa]"
    }
}

export function TechStackCard() {
    return (
        <BentoCard className="col-span-4 md:col-span-4 p-6">
            <p className="text-[#52525b] text-[10px] font-semibold uppercase tracking-widest mb-4">
                Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
                {techStack.map((skill) => (
                    <span
                        key={skill}
                        className={`group bg-[#27272a] hover:bg-[#3f3f46] text-[#a1a1aa] text-xs font-medium px-3.5 py-2 rounded-lg transition-all cursor-default flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getColor(skill)}`}
                    >
                        {getIcon(skill)}
                        {skill}
                    </span>
                ))}
            </div>
        </BentoCard>
    )
}
