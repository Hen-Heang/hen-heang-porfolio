"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "../shared/SectionHeader"
import { SkillsTab } from "./SkillsTab"
import { StatsCard } from "./StatsCard"
import { skills } from "@/data/skills"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

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
                    description="I'm a junior web developer with a passion for learning new technologies and creating innovative solutions."
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">My Story</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            I&#39;m a junior web developer with a passion for learning new technologies and creating innovative solutions.
                            My goal is to combine design and functionality to create exceptional user experiences.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            I&#39;m currently focused on frontend development with React, but I also have experience with Node.js and
                            databases. I love solving problems and collaborating in multidisciplinary teams.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <StatsCard value="2+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />
                            <StatsCard value="10+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />
                        </div>

                        <Button
                            className="mt-8 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                            onClick={() => router.push("/about")}
                        >
                            Learn more about me
                        </Button>
                    </div>

                    <SkillsTab skills={skills} />
                </motion.div>
            </div>
        </section>
    )
}
