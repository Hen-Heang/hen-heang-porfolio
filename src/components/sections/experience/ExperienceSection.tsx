"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react"
import { experiences } from "@/data/experience"
import { Badge } from "@/src/components/ui/badge"
import { Card } from "@/src/components/ui/card"

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
}

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section
            id="experience"
            className="section-base section-plain"
            aria-label="Experience timeline"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div
                        variants={item}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium">
                            <Sparkles size={16} />
                            Experience
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                            <span className="text-slate-900 dark:text-white">Work</span>{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                                Journey
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Roles, responsibilities, and wins that shaped how I build products today.
                        </p>
                    </motion.div>

                    <div className="relative" ref={containerRef}>
                        {/* Animated Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
                        <motion.div 
                            style={{ height }}
                            className="absolute left-8 top-0 w-px bg-gradient-to-b from-teal-500 via-indigo-500 to-purple-500 hidden md:block origin-top" 
                        />
                        <div className="space-y-6">
                            {experiences.map((experience, idx) => (
                                <motion.div key={experience.company + experience.period} variants={item}>
                                    <Card className="relative overflow-hidden surface-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-indigo-500/5 to-transparent pointer-events-none" />
                                        <div className="p-6 md:p-8">
                                            <div className="flex items-start gap-4">
                                                <div className="hidden md:flex flex-col items-center">
                                                    <span className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_0_6px_rgba(20,184,166,0.15)]" />
                                                    {idx !== experiences.length - 1 && (
                                                        <span className="flex-1 w-px bg-slate-200 dark:bg-slate-800 mt-3" />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <Badge className="bg-teal-500 text-white border-0">
                                                            {experience.role}
                                                        </Badge>
                                                        <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                            <Briefcase size={16} />
                                                            {experience.company}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                        <span className="inline-flex items-center gap-2">
                                                            <Calendar size={16} />
                                                            {experience.period}
                                                        </span>
                                                        {experience.location && (
                                                            <span className="inline-flex items-center gap-2">
                                                                <MapPin size={16} />
                                                                {experience.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                                                        {experience.summary}
                                                    </p>

                                                    {experience.highlights && (
                                                        <ul className="space-y-2">
                                                            {experience.highlights.map((highlight) => (
                                                                <li
                                                                    key={highlight}
                                                                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                                                                >
                                                                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                                                                    <span>{highlight}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {experience.stack && (
                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            {experience.stack.map((tech) => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="outline"
                                                                    className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
