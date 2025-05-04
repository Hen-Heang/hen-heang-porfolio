import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Skill } from "@/types"

interface SkillsTabProps {
    skills: Skill[]
}

export function SkillsTab({ skills }: SkillsTabProps) {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
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
                                <div
                                    key={item}
                                    className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
