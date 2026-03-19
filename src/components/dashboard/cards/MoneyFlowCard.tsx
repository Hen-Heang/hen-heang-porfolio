"use client"

import { deployedProjects } from "@/data/dashboard"

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    )
}

export function KoriAISmallCard() {
    const project = deployedProjects[1] // KoriAI

    return (
        <div
            onClick={() => window.open(project.url, "_blank")}
            className="group col-span-4 md:col-span-4 lg:col-span-4 relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer min-h-[220px]"
            style={{
                background: `linear-gradient(145deg, ${(project as { gradientFrom?: string }).gradientFrom ?? "#0c1929"}, ${(project as { gradientTo?: string }).gradientTo ?? "#0f2744"})`,
                borderColor: project.borderColor,
            }}
        >
            {/* Orb */}
            <div
                className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)` }}
            />

            {/* Top: badge + github */}
            <div className="flex items-center justify-between relative z-10">
                <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ background: `${project.accentColor}18`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
                >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accentColor }} />
                    LIVE
                </span>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                    <GithubIcon />
                </a>
            </div>

            {/* Middle: emoji + title */}
            <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <div className="text-4xl mb-3">{project.emoji}</div>
                <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: project.accentColor }}>
                    {project.subtitle}
                </p>
                <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                    {project.description}
                </p>
            </div>

            {/* Bottom: tech tags */}
            <div className="flex flex-wrap gap-1.5 relative z-10">
                {project.tech.slice(0, 3).map((tech) => {
                    const name = typeof tech === "string" ? tech : tech.name
                    return (
                        <span key={name} className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-zinc-400 border border-white/10 rounded-md">
                            {name}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

// Keep the old export name so BentoDashboard import doesn't break
export { KoriAISmallCard as MoneyFlowCard }
