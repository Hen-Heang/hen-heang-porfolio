"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { useProfile } from "@/src/providers/site-content-provider"
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
    Sparkles
} from "lucide-react"

// Map tech names to Lucide icons
const getIcon = (skill: string) => {
    const iconProps = { size: 16, className: "shrink-0 transition-transform duration-300 group-hover/tech:scale-110 group-hover/tech:rotate-3" }
    switch (skill.toLowerCase()) {
        case "java": return <Coffee {...iconProps} />
        case "spring boot": return <Leaf {...iconProps} />
        case "mybatis": return <Database {...iconProps} />
        case "next.js": return <Globe {...iconProps} />
        case "typescript": return <Code {...iconProps} />
        case "postgresql": return <Server {...iconProps} />
        case "react": return <Box {...iconProps} />
        case "tailwind css": return <Layers {...iconProps} />
        case "git": return <GitBranch {...iconProps} />
        case "openai": return <Sparkles {...iconProps} />
        case "spring security": return <ShieldCheck {...iconProps} />
        case "rest apis": return <Cpu {...iconProps} />
        default: return <Layers {...iconProps} />
    }
}

// Map tech names to accent colors
const getColor = (skill: string) => {
    switch (skill.toLowerCase()) {
        case "java": return "group-hover/tech:!text-[#f89820] group-hover/tech:!border-[#f89820]/30"
        case "spring boot": return "group-hover/tech:!text-[#6db33f] group-hover/tech:!border-[#6db33f]/30"
        case "mybatis": return "group-hover/tech:!text-[#eab308] group-hover/tech:!border-[#eab308]/30"
        case "next.js": return "group-hover/tech:!text-[#fafafa] group-hover/tech:!border-[#fafafa]/30"
        case "typescript": return "group-hover/tech:!text-[#3178c6] group-hover/tech:!border-[#3178c6]/30"
        case "postgresql": return "group-hover/tech:!text-[#336791] group-hover/tech:!border-[#336791]/30"
        case "react": return "group-hover/tech:!text-[#61dafb] group-hover/tech:!border-[#61dafb]/30"
        case "tailwind css": return "group-hover/tech:!text-[#38bdf8] group-hover/tech:!border-[#38bdf8]/30"
        case "git": return "group-hover/tech:!text-[#f05032] group-hover/tech:!border-[#f05032]/30"
        case "openai": return "group-hover/tech:!text-[#10a37f] group-hover/tech:!border-[#10a37f]/30"
        case "spring security": return "group-hover/tech:!text-[#6db33f] group-hover/tech:!border-[#6db33f]/30"
        case "rest apis": return "group-hover/tech:!text-[#00bcd4] group-hover/tech:!border-[#00bcd4]/30"
        default: return "group-hover/tech:!text-[#fafafa] group-hover/tech:!border-[#fafafa]/30"
    }
}

export function TechStackCard() {
    const techStack = useProfile().linkedinCoreSkills
    return (
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-12 p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-widest">
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
                    <div
                        key={skill}
                        aria-label={skill}
                        className={`group/tech relative w-10 h-10 flex items-center justify-center bg-[#27272a]/40 hover:bg-[#3f3f46]/40 border border-[#3f3f46]/30 text-[#a1a1aa] rounded-lg transition-all duration-300 cursor-default hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] ${getColor(skill)}`}
                    >
                        {getIcon(skill)}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover/tech:!opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5 z-10">
                            {skill}
                        </span>
                    </div>
                ))}
            </div>
        </BentoCard>
    )
}
