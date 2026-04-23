"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react"
import { experiences as staticExperiences } from "@/data/experience"
import { getExperience } from "@/src/lib/db/portfolio"
import type { ExperienceItem } from "@/src/lib/types"
import { useState, useEffect } from "react"
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
    const [experiences, setExperiences] = useState<ExperienceItem[]>(staticExperiences)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getExperience().then((data) => { if (data.length) setExperiences(data) })
    }, [])
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-medium">
                            <Sparkles size={16} />
                            Experience
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-zinc-900 dark:text-zinc-100">
                            Work Journey
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                            Roles, responsibilities, and wins that shaped how I build products today.
                        </p>
                    </motion.div>

                    <div className="relative" ref={containerRef}>
                        {/* Animated Line - Simplified to Monochrome */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
                        <motion.div 
                            style={{ height }}
                            className="absolute left-8 top-0 w-px bg-zinc-900 dark:bg-zinc-100 hidden md:block origin-top" 
                        />
                        <div className="space-y-6">
                            {experiences.map((experience, idx) => (
                                <motion.div key={experience.company + experience.period} variants={item}>
                                    <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="p-6 md:p-8">
                                            <div className="flex items-start gap-4">
                                                <div className="hidden md:flex flex-col items-center">
                                                    <span className="w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                                                    {idx !== experiences.length - 1 && (
                                                        <span className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 mt-3" />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-0">
                                                            {experience.role}
                                                        </Badge>
                                                        <span className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2 font-medium">
                                                            <Briefcase size={16} />
                                                            {experience.company}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-500">
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
                                                    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                        {experience.summary}
                                                    </p>

                                                    {experience.highlights && (
                                                        <ul className="space-y-2">
                                                            {experience.highlights.map((highlight) => (
                                                                <li
                                                                    key={highlight}
                                                                    className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                                                                >
                                                                    <span className="mt-1 h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
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
                                                                    className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
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
