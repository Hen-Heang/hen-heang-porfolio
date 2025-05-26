"use client"

import { motion } from "framer-motion"

interface StatsCardProps {
    value: string
    label: string
    color: string
}

export function StatsCard({ value, label, color }: StatsCardProps) {
    return (
        <motion.div
            className="p-6 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}>
            <motion.div
                className={`text-3xl md:text-4xl font-bold ${color} mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {value}
            </motion.div>
            <div className="text-slate-600 dark:text-slate-300 font-medium">{label}</div>
        </motion.div>
    )
}
