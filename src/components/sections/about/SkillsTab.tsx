"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import type { SkillCategory } from "@/src/lib/types"
import { motion } from "framer-motion"
import {
    CssIcon,
    GitHubIcon,
    HtmlIcon,
    IntellijIcon,
    JavaIcon,
    JavaScriptIcon,
    NextJsIcon,
    PostgreSQLIcon,
    ReactIcon,
    SpringIcon,
    TanStackIcon,
    TypeScriptIcon,
    WebstormIcon,
} from "@/components/ICON/TechIcons"

interface SkillsTabProps {
    skills: SkillCategory[]
}

const getIconForSkill = (skillName: string) => {
    const skillNameLower = skillName.toLowerCase()
    let IconComponent = null

    if (skillNameLower.includes("next.js")) IconComponent = <NextJsIcon />
    if (skillNameLower.includes("tanstack")) IconComponent = <TanStackIcon />
    if (skillNameLower.includes("css")) IconComponent = <CssIcon />
    if (skillNameLower.includes("html")) IconComponent = <HtmlIcon />
    if (skillNameLower.includes("javascript")) IconComponent = <JavaScriptIcon />
    if (skillNameLower.includes("typescript")) IconComponent = <TypeScriptIcon />
    if (skillNameLower.includes("react")) IconComponent = <ReactIcon />
    if (skillNameLower.includes("java")) IconComponent = <JavaIcon />
    if (skillNameLower.includes("spring")) IconComponent = <SpringIcon />
    if (skillNameLower.includes("postgresql")) IconComponent = <PostgreSQLIcon />
    if (skillNameLower.includes("git")) IconComponent = <GitHubIcon />
    if (skillNameLower.includes("intellij")) IconComponent = <IntellijIcon />
    if (skillNameLower.includes("webstorm")) IconComponent = <WebstormIcon />

    return IconComponent ? <div className="icon-wrapper">{IconComponent}</div> : null
}

export function SkillsTab({ skills }: SkillsTabProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <div>
            <Tabs defaultValue={skills[0].category} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    {skills.map((skill) => (
                        <TabsTrigger
                            key={skill.category}
                            value={skill.category}
                            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm transition-all duration-200"
                        >
                            {skill.category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {skills.map((skill) => (
                    <TabsContent key={skill.category} value={skill.category} className="mt-0">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {skill.items.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    variants={itemVariants}
                                    className="group p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300 hover:shadow-lg"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex items-center gap-4">
                                        {getIconForSkill(item.name) ? (
                                            <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors duration-300">
                                                {getIconForSkill(item.name)}
                                            </div>
                                        ) : (
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex-shrink-0"></div>
                                        )}
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{item.experience}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
