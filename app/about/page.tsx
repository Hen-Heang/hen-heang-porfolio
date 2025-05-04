"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { skills } from "@/data/skills"
import {StatsCard} from "@/components/about/StatsCard";
import {SkillsTab} from "@/components/about/SkillsTab";

export default function AboutPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 py-20">
                <Button variant="ghost" onClick={() => router.push("/")} className="mb-8">
                    Back to Home
                </Button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 blur-2xl opacity-20 absolute -inset-4"></div>
                                    <div className="w-full aspect-square rounded-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden relative z-10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/placeholder.svg?height=400&width=400"
                                            alt="Your photo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <h2 className="text-3xl font-semibold mb-6">My Story</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    I&#39;m a junior web developer with a passion for learning new technologies and creating innovative
                                    solutions. My goal is to combine design and functionality to create exceptional user experiences.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    I&#39;m currently focused on frontend development with React, but I also have experience with Node.js and
                                    databases. I love solving problems and collaborating in multidisciplinary teams.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    When I&#39;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                                    or expanding my knowledge through online courses and tech meetups.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            <StatsCard value="2+" label="Years of experience" color="text-teal-500 dark:text-teal-400" />
                            <StatsCard value="10+" label="Completed projects" color="text-indigo-500 dark:text-indigo-400" />
                            <StatsCard value="5+" label="Happy clients" color="text-purple-500 dark:text-purple-400" />
                            <StatsCard value="3+" label="Awards" color="text-amber-500 dark:text-amber-400" />
                        </div>

                        <div className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">My Skills</h2>
                            <SkillsTab skills={skills} />
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold mb-6">My Journey</h2>
                            <div className="space-y-8">
                                <div className="relative pl-8 border-l-2 border-teal-500 pb-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500" />
                                    <div className="mb-1 text-teal-500">2023 - Present</div>
                                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                                    <p className="text-gray-400">Example Company</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Working on web applications using React, Next.js, and TypeScript.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-indigo-500 pb-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500" />
                                    <div className="mb-1 text-indigo-500">2021 - 2023</div>
                                    <h3 className="text-xl font-semibold">Junior Web Developer</h3>
                                    <p className="text-gray-400">Previous Company</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Developed and maintained websites using HTML, CSS, and JavaScript.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-purple-500">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                                    <div className="mb-1 text-purple-500">2020 - 2021</div>
                                    <h3 className="text-xl font-semibold">Web Development Intern</h3>
                                    <p className="text-gray-400">First Company</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Assisted in website development and learned industry best practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
