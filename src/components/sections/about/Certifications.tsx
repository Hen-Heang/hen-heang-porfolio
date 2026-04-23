"use client"

import { motion } from "framer-motion"
import { rawAchievements } from "@/data/achievements"
import { Award, ExternalLink, Calendar, GraduationCap, Medal } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/src/components/ui/card"

export function Certifications() {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'graduation': return <GraduationCap size={18} className="text-blue-500" />
            case 'award': return <Medal size={18} className="text-amber-500" />
            default: return <Award size={18} className="text-teal-500" />
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {rawAchievements.map((achievement, index) => (
                <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="h-full overflow-hidden border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm group hover:border-teal-500/30 transition-all duration-300 shadow-sm hover:shadow-xl">
                        <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                            {achievement.image && (
                                <div className="relative w-full sm:w-40 h-48 sm:h-auto overflow-hidden bg-slate-100 dark:bg-zinc-800 shrink-0">
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                                </div>
                            )}
                            <div className="p-6 flex flex-col justify-between flex-1">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 group-hover:bg-teal-500/10 transition-colors">
                                            {getTypeIcon(achievement.type)}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <Calendar size={12} />
                                            {achievement.date}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-bold leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500 mt-1">
                                            {achievement.issuer}
                                        </p>
                                    </div>
                                    
                                    <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>

                                {achievement.link && (
                                    <a 
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 hover:gap-3 transition-all"
                                    >
                                        Verify Credential
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
