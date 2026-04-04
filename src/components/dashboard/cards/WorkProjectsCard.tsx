"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { workProjects } from "@/data/dashboard"

export function WorkProjectsCard() {
    return (
        <BentoCard className="col-span-4 md:col-span-4 lg:col-span-4 p-6 md:p-8">
            <p className="text-[#52525b] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Work Projects @KSHRD & @KOSIGN
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-5">
                {workProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-[#09090b] border border-[#27272a] hover:border-[#6366f1]/50 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all hover:bg-[#111113] hover:-translate-y-1 group"
                    >
                        <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{project.emoji}</span>
                        <div>
                            <p className="text-[#fafafa] text-sm md:text-base font-bold leading-tight tracking-tight">{project.title}</p>
                            <p className="text-[#52525b] text-[11px] md:text-xs font-medium mt-1.5 uppercase tracking-wider">{project.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </BentoCard>
    )
}
