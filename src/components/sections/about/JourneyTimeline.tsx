"use client"

import { motion } from "framer-motion"
import { experiences } from "@/data/experience"
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react"

export function JourneyTimeline() {
    return (
        <div className="space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={`${exp.company}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-zinc-800"
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Briefcase size={18} className="text-teal-500" />
                                {exp.role}
                            </h3>
                            <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                                {exp.company}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-slate-500 dark:text-zinc-500">
                            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-full">
                                <Calendar size={14} />
                                {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-full">
                                <MapPin size={14} />
                                {exp.location}
                            </span>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed max-w-3xl">
                        {exp.summary}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {exp.highlights?.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-400 group">
                                <ChevronRight size={16} className="text-teal-500 mt-0.5 shrink-0 transition-transform group-hover:translate-x-1" />
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {exp.stack?.map((tech) => (
                            <span 
                                key={tech}
                                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800 hover:border-teal-500/30 dark:hover:border-indigo-500/30 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
