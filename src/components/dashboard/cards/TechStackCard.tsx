"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { techStack } from "@/data/dashboard"
import { 
    Coffee, 
    Leaf, 
    Database, 
    Globe, 
    Code, 
    Layers, 
    Server, 
    Cpu, 
    ShieldCheck, 
    GitBranch,
    Box,
    Zap,
    Sparkles,
    Terminal
} from "lucide-react"

// Map tech names to Lucide icons
const getIcon = (skill: string) => {
    const iconProps = { size: 14, className: "shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" }
    switch (skill.toLowerCase()) {
        case "java": return <Coffee {...iconProps} />
        case "spring boot": return <Leaf {...iconProps} />
        case "mybatis": return <Database {...iconProps} />
        case "next.js": return <Globe {...iconProps} />
        case "typescript": return <Code {...iconProps} />
        case "postgresql": return <Server {...iconProps} />
        case "react": return <Box {...iconProps} />
        case "tailwind css": return <Layers {...iconProps} />
        case "oracle": return <Database {...iconProps} />
        case "git": return <GitBranch {...iconProps} />
        case "redis": return <Zap {...iconProps} />
        case "openai": return <Sparkles {...iconProps} />
        case "spring security": return <ShieldCheck {...iconProps} />
        case "egovframework": return <Terminal {...iconProps} />
        case "rest apis": return <Cpu {...iconProps} />
        default: return <Layers {...iconProps} />
    }
}

// Map tech names to accent colors
const getColor = (skill: string) => {
    switch (skill.toLowerCase()) {
        case "java": return "group-hover:text-[#f89820] group-hover:border-[#f89820]/30"
        case "spring boot": return "group-hover:text-[#6db33f] group-hover:border-[#6db33f]/30"
        case "mybatis": return "group-hover:text-[#eab308] group-hover:border-[#eab308]/30"
        case "next.js": return "group-hover:text-[#fafafa] group-hover:border-[#fafafa]/30"
        case "typescript": return "group-hover:text-[#3178c6] group-hover:border-[#3178c6]/30"
        case "postgresql": return "group-hover:text-[#336791] group-hover:border-[#336791]/30"
        case "react": return "group-hover:text-[#61dafb] group-hover:border-[#61dafb]/30"
        case "tailwind css": return "group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/30"
        case "oracle": return "group-hover:text-[#f80000] group-hover:border-[#f80000]/30"
        case "git": return "group-hover:text-[#f05032] group-hover:border-[#f05032]/30"
        case "redis": return "group-hover:text-[#d82c20] group-hover:border-[#d82c20]/30"
        case "openai": return "group-hover:text-[#10a37f] group-hover:border-[#10a37f]/30"
        case "spring security": return "group-hover:text-[#6db33f] group-hover:border-[#6db33f]/30"
        case "egovframework": return "group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/30"
        case "rest apis": return "group-hover:text-[#00bcd4] group-hover:border-[#00bcd4]/30"
        default: return "group-hover:text-[#fafafa] group-hover:border-[#fafafa]/30"
    }
}

export function TechStackCard() {
    return (
        <BentoCard className="col-span-4 md:col-span-4 p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[#52525b] text-[10px] font-semibold uppercase tracking-widest">
                    Tech Stack
                </p>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f89820] opacity-50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6db33f] opacity-50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3178c6] opacity-50" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {techStack.map((skill) => (
                    <span
                        key={skill}
                        className={`group bg-[#27272a]/40 hover:bg-[#3f3f46]/40 border border-[#3f3f46]/30 text-[#a1a1aa] text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-300 cursor-default flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] ${getColor(skill)}`}
                    >
                        {getIcon(skill)}
                        {skill}
                    </span>
                ))}
            </div>
        </BentoCard>
    )
}
