"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Trophy, Award, GraduationCap, Calendar, Building, X, Eye, ExternalLink } from "lucide-react"
import { groupedAchievements, type Achievement } from "@/data/achievements"
import { useTranslations } from 'next-intl'
import Image from "next/image"

export function AchievementsSection() {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
    const t = useTranslations()

    const openModal = (achievement: Achievement) => {
        setSelectedAchievement(achievement)
    }

    const closeModal = () => {
        setSelectedAchievement(null)
    }

    return (
        <section id="achievements" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge={t('achievements.badge')}
                    title={t('achievements.title')}
                    description={t('achievements.description')}
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
                                                        {t(`common.${achievement.type}`)}
                                                    </Badge>
                                                </div>

                                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                                    {t(achievement.titleKey)}
                                                </h3>

                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {achievement.date}
                                                </div>

                                                {achievement.descriptionKey && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                        {t(achievement.descriptionKey)}
                                                    </p>
                                                )}

                                                {achievement.image && (
                                                    <div className="relative overflow-hidden rounded-lg mb-4">
                                                        <Image
                                                            src={achievement.image}
                                                            alt={t(achievement.titleKey)}
                                                            width={400}
                                                            height={128}
                                                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                                                            onClick={() => openModal(achievement)}
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                            <Eye className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    {achievement.link && (
                                                        <a
                                                            href={achievement.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                                                        >
                                                            {t('common.viewCertificate')}
                                                            <ExternalLink className="w-4 h-4 ml-1" />
                                                        </a>
                                                    )}
                                                    
                                                    {achievement.image && (
                                                        <button
                                                            onClick={() => openModal(achievement)}
                                                            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                                        >
                                                            {t('common.viewDetails')}
                                                            <Eye className="w-4 h-4 ml-1" />
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
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        {selectedAchievement.type === 'certificate' && (
                                            <Award className="w-8 h-8 text-teal-500" />
                                        )}
                                        {selectedAchievement.type === 'graduation' && (
                                            <GraduationCap className="w-8 h-8 text-blue-500" />
                                        )}
                                        {selectedAchievement.type === 'award' && (
                                            <Trophy className="w-8 h-8 text-yellow-500" />
                                        )}
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {t(selectedAchievement.titleKey)}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    <div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <Building className="w-4 h-4 mr-2" />
                                            <span className="font-medium">{t('common.issuer')}:</span>
                                            <span className="ml-2">{selectedAchievement.issuer}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="font-medium">{t('common.date')}:</span>
                                            <span className="ml-2">{selectedAchievement.date}</span>
                                        </div>

                                        <Badge variant="secondary" className="mb-4">
                                            {t(`common.${selectedAchievement.type}`)}
                                        </Badge>

                                        {selectedAchievement.descriptionKey && (
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {t(selectedAchievement.descriptionKey)}
                                            </p>
                                        )}

                                        {selectedAchievement.link && (
                                            <a
                                                href={selectedAchievement.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                                            >
                                                {t('common.viewCertificateOnline')}
                                                <ExternalLink className="w-4 h-4 ml-1" />
                                            </a>
                                        )}
                                    </div>

                                    {selectedAchievement.image && (
                                        <div className="flex items-center justify-center">
                                            <div className="relative w-full">
                                                                                                                                                 <Image
                                                    src={selectedAchievement.image}
                                                    alt={t(selectedAchievement.titleKey)}
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
