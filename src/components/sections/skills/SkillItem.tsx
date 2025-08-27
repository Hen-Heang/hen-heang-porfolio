"use client"

import { motion } from "framer-motion"
import type { SkillItem as SkillItemType } from "@/src/lib/types"

interface SkillItemProps {
    skill: SkillItemType;
    index: number;
}

export function SkillItem({ skill, index }: SkillItemProps) {
    const levelPercentage = (skill.level / 5) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                    <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{skill.experience}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelPercentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}/>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Beginner</span>
                <span>Expert</span>
            </div>
        </motion.div>
    );
}