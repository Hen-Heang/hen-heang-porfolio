// components/about/SkillsTab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SkillCategory } from "@/types"
import { motion } from "framer-motion"
import {
    CssIcon,
    NextJsIcon,
    PostgreSQLIcon,
    SpringBootIcon,
    SpringDataIcon,
    TanStackIcon
} from "@/components/ICON/TechIcons";


interface SkillsTabProps {
    skills: SkillCategory[]
}

// Map skill names to their respective icon components
const getIconForSkill = (skillName: string) => {
    const skillNameLower = skillName.toLowerCase();
    if (skillNameLower.includes('next.js')) return <NextJsIcon />;
    if (skillNameLower.includes('spring boot')) return <SpringBootIcon />;
    if (skillNameLower.includes('spring data')) return <SpringDataIcon />;
    if (skillNameLower.includes('postgresql')) return <PostgreSQLIcon />;
    if (skillNameLower.includes('tanstack')) return <TanStackIcon />;
    if (skillNameLower.includes('css')) return <CssIcon/>;


    // Default icon or return null
    return null;
};

export function SkillsTab({ skills }: SkillsTabProps) {
    return (
        <div>
            {/*<h3 className="text-2xl font-semibold mb-6">My Skills</h3>*/}
            <Tabs defaultValue={skills[0].category} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                    {skills.map((skill) => (
                        <TabsTrigger key={skill.category} value={skill.category}>
                            {skill.category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {skills.map((skill) => (
                    <TabsContent key={skill.category} value={skill.category} className="mt-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skill.items.map((item) => (
                                <motion.div
                                    key={item.name}
                                    className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3"
                                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {getIconForSkill(item.name) ? (
                                        <div className="flex-shrink-0">
                                            {getIconForSkill(item.name)}
                                        </div>
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                                    )}
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.experience}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}