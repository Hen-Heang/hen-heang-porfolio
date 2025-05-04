// components/skills/SkillsSection.tsx
"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "../shared/SectionHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { skills } from "@/data/skills"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SkillItem } from "./SkillItem"

export function SkillsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const [activeTab, setActiveTab] = useState(skills[0].category)

    return (
        <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Skills"
                    title="My Technical Skills"
                    description="Here are the technologies and tools I work with."
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <Tabs defaultValue={skills[0].category} className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-3 mb-8 w-full">
                            {skills.map((skill) => (
                                <TabsTrigger key={skill.category} value={skill.category}>
                                    {skill.category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {skills.map((skill) => (
                            <TabsContent key={skill.category} value={skill.category} className="mt-0">
                                <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                    <h3 className="text-xl font-semibold mb-6 text-center">
                    <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                      {skill.category} Skills
                    </span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {skill.items.map((item, index) => (
                                            <SkillItem key={item.name} skill={item} index={index} />
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <div className="mt-12 text-center">
                        <Badge className="text-sm px-3 py-1 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-400/20">
                            Currently focused on: {activeTab}
                        </Badge>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}