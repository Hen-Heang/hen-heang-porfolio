"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EducationItem as EducationItemType } from "@/types"

interface EducationItemProps {
    item: EducationItemType
    index: number
    isLast: boolean
}

export function EducationItem({ item, index, isLast }: EducationItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-6 mb-12 last:mb-0"
        >
            <div className="hidden sm:block pt-1">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                </div>
                {!isLast && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>}
            </div>

            <Card className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                    <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
                        {item.period}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{item.institution}</p>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
