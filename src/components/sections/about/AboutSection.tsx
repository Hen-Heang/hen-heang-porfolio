"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { SkillsTab } from "./SkillsTab"
import { skills } from "@/data/skills"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"

export function AboutSection() {
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="About Me"
                    title="Get to know me better"
                    description="I'm a web application developer specializing in Spring Boot and Next.js, passionate about creating high-quality, scalable applications."/>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        {/*<h3 className="text-2xl font-semibold mb-4">My Story</h3>*/}
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            I&#39;m a full-stack web developer with a passion for creating modern applications that solve real business problems.
                            With experience in both frontend and backend technologies, I build cohesive solutions from database design to user interfaces.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            My expertise includes Spring Boot and Spring Data for backend development, and Next.js with TypeScript for
                            creating responsive, type-safe frontends. I use PostgreSQL for database management and TanStack Query for
                            efficient data fetching and state management.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            I enjoy tackling complex problems and continuously learning new technologies to improve my skillset.
                        </p>

                        {/*<div className="grid grid-cols-2 gap-4 mt-8">*/}
                        {/*    <StatsCard value="1.5+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />*/}
                        {/*    <StatsCard value="10+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />*/}
                        {/*</div>*/}

                        <Button
                            className="mt-8 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                            onClick={() => router.push("/about")}>
                            Learn more about me
                        </Button>
                    </div>
                    <SkillsTab skills={skills} />
                </motion.div>
            </div>
        </section>
    )
}