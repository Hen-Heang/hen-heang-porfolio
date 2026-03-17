"use client"

import { BentoCard } from "@/src/components/dashboard/BentoCard"
import { journey } from "@/data/dashboard"

export function JourneyTimeline() {
    return (
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-7 p-6">
            <p className="text-[#52525b] text-[10px] font-semibold uppercase tracking-widest mb-8">
                My Journey
            </p>

            {/* Timeline container: vertical on mobile, horizontal on md+ */}
            <div className="relative flex flex-col md:flex-row items-start justify-between px-2 gap-8 md:gap-0">
                {/* Horizontal line (md+) */}
                <div
                    className="absolute top-[18px] left-6 right-6 h-px hidden md:block"
                    style={{
                        background: "linear-gradient(to right, #3f3f46, #6366f1)",
                    }}
                />
                
                {/* Vertical line (mobile) */}
                <div
                    className="absolute top-6 bottom-6 left-[25px] w-px md:hidden"
                    style={{
                        background: "linear-gradient(to bottom, #3f3f46, #6366f1)",
                    }}
                />

                {journey.map((item, i) => (
                    <div key={i} className="relative flex flex-row md:flex-col items-center md:items-center text-left md:text-center z-10 flex-1 w-full gap-4 md:gap-0">
                        {/* Dot */}
                        <div
                            className="w-9 h-9 shrink-0 rounded-full border-2 flex items-center justify-center md:mb-3 text-xs font-bold"
                            style={
                                item.current
                                    ? {
                                          backgroundColor: "#6366f1",
                                          borderColor: "#8b5cf6",
                                          boxShadow: "0 0-16px rgba(99,102,241,0.5)",
                                          color: "#fff",
                                      }
                                    : {
                                          backgroundColor: "#18181b",
                                          borderColor: "#3f3f46",
                                          color: "#71717a",
                                      }
                            }
                        >
                            {item.year.slice(2)}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col">
                            <p
                                className="text-xs font-semibold leading-tight mb-1"
                                style={{ color: item.current ? "#fafafa" : "#a1a1aa" }}
                            >
                                {item.company}
                            </p>
                            <p className="text-[11px]" style={{ color: item.current ? "#71717a" : "#52525b" }}>
                                {item.location || item.year}
                            </p>
                            {item.current && (
                                <span className="mt-1 md:mt-2 inline-flex items-center gap-1 bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide w-fit">
                                    <span className="w-1 h-1 bg-[#6366f1] rounded-full animate-pulse" />
                                    Now
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </BentoCard>
    )
}
