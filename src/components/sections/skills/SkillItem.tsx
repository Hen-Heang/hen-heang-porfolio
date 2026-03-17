"use client"

import { motion } from "framer-motion"
import type { SkillItem as SkillItemType } from "@/src/lib/types"

import { TechIcons, CodeIcon } from "@/src/components/icons/TechIcons"

interface SkillItemProps {
    skill: SkillItemType;
    index: number;
}

export function SkillItem({ skill, index }: SkillItemProps) {
    const levelPercentage = (skill.level / 5) * 100;
    
    // Get icon for the skill, fallback to CodeIcon
    const Icon = TechIcons[skill.name] || CodeIcon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-950 hover:shadow-sm group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Icon />
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{skill.name}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">{skill.experience}</span>
            </div>

            <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-zinc-900 dark:bg-zinc-100"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelPercentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}/>
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">
                <span>Core</span>
                <span>Advanced</span>
            </div>
        </motion.div>
    );
}