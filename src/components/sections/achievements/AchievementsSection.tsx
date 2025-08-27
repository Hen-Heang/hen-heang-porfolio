"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Trophy, Award, GraduationCap, Calendar, Building } from "lucide-react"
import { groupedAchievements, type AchievementGroup } from "@/data/achievements"

export function AchievementsSection() {
    return (
        <section id="achievements" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Achievements"
                    title="Achievements & Certificates"
                    description="My academic and professional accomplishments"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 space-y-12"
                >
                    {groupedAchievements.map((group, groupIndex) => (
                        <motion.div
                            key={`${group.year}-${group.issuer}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Group Header */}
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center space-x-3">
                                    <Building className="w-6 h-6 text-teal-500" />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {group.issuer}
                                    </h2>
                                </div>
                                <Badge variant="outline" className="text-sm">
                                    {group.year}
                                </Badge>
                            </div>

                            {/* Achievements Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-teal-500 dark:hover:border-teal-400">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        {achievement.type === 'certificate' && (
                                                            <Award className="w-8 h-8 text-teal-500" />
                                                        )}
                                                        {achievement.type === 'graduation' && (
                                                            <GraduationCap className="w-8 h-8 text-blue-500" />
                                                        )}
                                                        {achievement.type === 'award' && (
                                                            <Trophy className="w-8 h-8 text-yellow-500" />
                                                        )}
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {achievement.type}
                                                    </Badge>
                                                </div>

                                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                                    {achievement.title}
                                                </h3>

                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {achievement.date}
                                                </div>

                                                {achievement.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                        {achievement.description}
                                                    </p>
                                                )}

                                                {achievement.image && (
                                                    <div className="relative overflow-hidden rounded-lg mb-4">
                                                        <img
                                                            src={achievement.image}
                                                            alt={achievement.title}
                                                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}

                                                {achievement.link && (
                                                    <a
                                                        href={achievement.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                                                    >
                                                        View Certificate
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
