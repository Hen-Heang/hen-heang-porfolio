"use client"

import { skills } from "@/data/skills"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerChildren from "@/components/animations/stagger-children"
import StaggerItem from "@/components/animations/stagger-item"
import { motion } from "framer-motion"

export default function SkillsSection() {
    return (
        <section className="py-16 bg-white dark:bg-[#0a0426]">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">My Skills</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Here are some of the technologies and tools I work with.
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((category) => (
                        <StaggerItem key={category.title}>
                            <div className="bg-gray-50 dark:bg-[#1a103f] p-6 rounded-lg shadow-md dark:shadow-purple-900/30 h-full border border-gray-200 dark:border-purple-900/20">
                                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">{category.title}</h3>
                                <div className="space-y-4">
                                    {category.items.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-700 dark:text-gray-200">{skill.name}</span>
                                                <span className="text-purple-700 dark:text-purple-300">{skill.level}/5</span>
                                            </div>
                                            <div className="skill-bar">
                                                <motion.div
                                                    className="skill-progress"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    viewport={{ once: true }}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}
