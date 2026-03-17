// components/skills/SkillsSection.tsx
"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { skills } from "@/data/skills"
import { Badge } from "@/src/components/ui/badge"
import { Card } from "@/src/components/ui/card"
import { SkillItem } from "./SkillItem"
import { ScrollVelocity } from "@/src/components/ui/ScrollVelocity"

export function SkillsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const [activeTab, setActiveTab] = useState(skills[0].category)

    return (
        <section id="skills" className="section-base section-muted">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Skills"
                    title="Technical Arsenal"
                    description="A comprehensive list of technologies and tools I've mastered over the years."
                />
                
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <Tabs defaultValue={skills[0].category} className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-10 w-full h-auto gap-2 bg-transparent p-0">
                            {skills.map((skill) => (
                                <TabsTrigger 
                                    key={skill.category} 
                                    value={skill.category} 
                                    className="text-xs sm:text-sm border border-zinc-200 dark:border-zinc-800 data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900 rounded-md py-2.5 transition-all"
                                >
                                    {skill.category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {skills.map((skill) => (
                            <TabsContent key={skill.category} value={skill.category} className="mt-0 outline-none">
                                <Card className="p-8 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                                    <h3 className="text-xl font-semibold mb-8 text-zinc-900 dark:text-zinc-100">
                                        {skill.category} Expertise
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {skill.items.map((item, index) => (
                                            <SkillItem key={item.name} skill={item} index={index} />
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <div className="mt-12 text-center">
                        <Badge variant="outline" className="text-xs px-4 py-1.5 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                            Currently focused on: {activeTab}
                        </Badge>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
