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
    TypeScriptIcon,
    WebStormIcon,
    OracleIcon,
    BootstrapIcon,
    MyBatisIcon,
    MySqlIcon,
    GitIcon,
    TailwindIcon,
} from "@/src/components/icons/TechIcons"

interface SkillsTabProps {
    skills: SkillCategory[]
}

const getIconForSkill = (skillName: string) => {
    const skillNameLower = skillName.toLowerCase()
    
    // Exact or close matches
    if (skillNameLower === "javascript") return <JavaScriptIcon />
    if (skillNameLower === "typescript") return <TypeScriptIcon />
    if (skillNameLower === "next.js") return <NextJsIcon />
    if (skillNameLower === "react") return <ReactIcon />
    if (skillNameLower === "html") return <HtmlIcon />
    if (skillNameLower === "css") return <CssIcon />
    if (skillNameLower === "spring boot") return <SpringIcon />
    if (skillNameLower === "postgresql") return <PostgreSQLIcon />
    if (skillNameLower === "java") return <JavaIcon />
    if (skillNameLower === "git") return <GitIcon />
    if (skillNameLower === "github") return <GitHubIcon />
    if (skillNameLower === "intellij idea") return <IntellijIcon />
    if (skillNameLower === "webstorm") return <WebStormIcon />
    if (skillNameLower === "oracle") return <OracleIcon />
    if (skillNameLower === "bootstrap") return <BootstrapIcon />
    if (skillNameLower === "mybatis") return <MyBatisIcon />
    if (skillNameLower === "mysql") return <MySqlIcon />
    if (skillNameLower === "tailwind css") return <TailwindIcon />
    
    // Partial matches
    if (skillNameLower.includes("spring")) return <SpringIcon />
    if (skillNameLower.includes("sql")) return <PostgreSQLIcon /> // SQL fallback to Postgres style
    if (skillNameLower.includes("api")) return <div className="text-[10px] font-bold">API</div>

    return null
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
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl h-auto gap-1">
                    {skills.map((skill) => (
                        <TabsTrigger
                            key={skill.category}
                            value={skill.category}
                            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm"
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
                                <SkillCard key={`${skill.category}-${item.name}-${index}`} item={item} itemVariants={itemVariants} />
                            ))}
                        </motion.div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

function SkillCard({
    item,
    itemVariants,
}: {
    item: SkillCategory["items"][number]
    itemVariants: {
        hidden: { opacity: number; y: number }
        visible: { opacity: number; y: number; transition: { duration: number } }
    }
}) {
    const icon = getIconForSkill(item.name)

    return (
        <motion.div
            variants={itemVariants}
            className="group p-4 rounded-xl bg-white dark:bg-[#111113] border border-slate-200 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-center gap-4">
                {icon ? (
                    <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-zinc-900 rounded-lg group-hover:bg-teal-100 dark:group-hover:bg-indigo-500/10 transition-colors duration-300">
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-md">
                            {icon}
                        </div>
                    </div>
                ) : (
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-indigo-400 transition-colors duration-300 truncate">
                        {item.name}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-500">{item.experience}</div>
                </div>
            </div>
        </motion.div>
    )
}
