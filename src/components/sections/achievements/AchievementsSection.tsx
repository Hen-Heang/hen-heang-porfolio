"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Trophy, Award, GraduationCap, Calendar, Building, X, Eye, ExternalLink } from "lucide-react"
import { groupedAchievements, type Achievement } from "@/data/achievements"
import Image from "next/image"

export function AchievementsSection() {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

    const openModal = (achievement: Achievement) => {
        setSelectedAchievement(achievement)
    }

    const closeModal = () => {
        setSelectedAchievement(null)
    }

    return (
        <section id="achievements" className="section-base section-plain">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Achievements"
                    title="Recognition & Credentials"
                    description="Academic milestones and professional certifications."
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 space-y-16"
                >
                    {groupedAchievements.map((group, groupIndex) => (
                        <motion.div
                            key={`${group.year}-${group.issuer}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Group Header */}
                            <div className="flex items-center space-x-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
                                <div className="flex items-center space-x-3">
                                    <Building className="w-5 h-5 text-zinc-400" />
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                                        {group.issuer}
                                    </h2>
                                </div>
                                <Badge variant="outline" className="text-xs border-zinc-200 dark:border-zinc-800 text-zinc-500">
                                    {group.year}
                                </Badge>
                            </div>

                            {/* Achievements Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {group.achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-md transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                                                        {achievement.type === 'certificate' && (
                                                            <Award className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                                                        )}
                                                        {achievement.type === 'graduation' && (
                                                            <GraduationCap className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                                                        )}
                                                        {achievement.type === 'award' && (
                                                            <Trophy className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                                                        )}
                                                    </div>
                                                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-0">
                                                        {achievement.type}
                                                    </Badge>
                                                </div>

                                                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 leading-tight">
                                                    {achievement.title}
                                                </h3>

                                                <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-500 mb-4">
                                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                    {achievement.date}
                                                </div>

                                                {achievement.description && (
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed line-clamp-3">
                                                        {achievement.description}
                                                    </p>
                                                )}

                                                {achievement.image && (
                                                    <div className="relative overflow-hidden rounded-xl mb-6 aspect-video border border-zinc-100 dark:border-zinc-900">
                                                        <Image
                                                            src={achievement.image}
                                                            alt={achievement.title}
                                                            fill
                                                            className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500 cursor-pointer"
                                                            onClick={() => openModal(achievement)}
                                                        />
                                                        <div 
                                                            className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                                                            onClick={() => openModal(achievement)}
                                                        >
                                                            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4">
                                                    {achievement.link && (
                                                        <a
                                                            href={achievement.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:opacity-70 transition-opacity"
                                                        >
                                                            Verify
                                                            <ExternalLink className="w-3 h-3 ml-1" />
                                                        </a>
                                                    )}
                                                    
                                                    {achievement.image && (
                                                        <button
                                                            onClick={() => openModal(achievement)}
                                                            className="inline-flex items-center text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:opacity-70 transition-opacity"
                                                        >
                                                            Details
                                                            <Eye className="w-3 h-3 ml-1" />
                                                        </button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal for viewing certificate details */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-900">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                                            {selectedAchievement.type === 'certificate' ? <Award className="w-5 h-5" /> : 
                                             selectedAchievement.type === 'graduation' ? <GraduationCap className="w-5 h-5" /> : 
                                             <Trophy className="w-5 h-5" />}
                                        </div>
                                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            {selectedAchievement.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-zinc-500" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center text-sm text-zinc-500">
                                                    <Building className="w-4 h-4 mr-3" />
                                                    <span className="font-medium mr-2 text-zinc-900 dark:text-zinc-100">Issuer:</span>
                                                    {selectedAchievement.issuer}
                                                </div>
                                                <div className="flex items-center text-sm text-zinc-500">
                                                    <Calendar className="w-4 h-4 mr-3" />
                                                    <span className="font-medium mr-2 text-zinc-900 dark:text-zinc-100">Date:</span>
                                                    {selectedAchievement.date}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Description</h4>
                                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    {selectedAchievement.description}
                                                </p>
                                            </div>

                                            {selectedAchievement.link && (
                                                <a
                                                    href={selectedAchievement.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-semibold transition-all hover:shadow-md"
                                                >
                                                    Verify Online
                                                    <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            )}
                                        </div>

                                        {selectedAchievement.image && (
                                            <div className="relative aspect-[4/3] lg:aspect-auto w-full border border-zinc-100 dark:border-zinc-900 rounded-xl overflow-hidden shadow-sm">
                                                <Image
                                                    src={selectedAchievement.image}
                                                    alt="Achievement Detail"
                                                    fill
                                                    className="object-contain bg-zinc-50 dark:bg-zinc-900"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
