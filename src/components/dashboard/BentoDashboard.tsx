"use client"

import { motion } from "framer-motion"
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { MobileDock } from "@/src/components/dashboard/MobileDock"
import { HeroProfileCard } from "@/src/components/dashboard/cards/HeroProfileCard"
import { StatsGrid } from "@/src/components/dashboard/cards/StatsGrid"
import { TechStackCard } from "@/src/components/dashboard/cards/TechStackCard"
import { WorkProjectsCard } from "@/src/components/dashboard/cards/WorkProjectsCard"
import { AchievementsCard } from "@/src/components/dashboard/cards/AchievementsCard"
import { JourneyTimeline } from "@/src/components/dashboard/cards/JourneyTimeline"
import { ContactCTA } from "@/src/components/dashboard/cards/ContactCTA"
import { ProjectCard } from "@/src/components/dashboard/cards/ProjectCard"
import { deployedProjects } from "@/data/dashboard"
import { Footer } from "@/src/components/ui/Footer"
import { ScrollToTop } from "@/src/components/ui/ScrollToTop"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
}

export function BentoDashboard() {
    return (
        <div className="min-h-screen bg-[#09090b] pb-24 md:pb-0">
            <MobileDock />
            
            <DashboardHeader />

            <main className="px-4 xs:px-6 md:px-8 lg:px-10 pb-12 max-w-7xl mx-auto pt-4 md:pt-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-auto"
                >
                    {/* Top Section: Hero (8) + Stats (4) */}
                    <HeroProfileCard />
                    <StatsGrid />

                    {/* Projects Section: 3 x (4) */}
                    {deployedProjects.map((project, idx) => (
                        <ProjectCard key={`${project.id}-${idx}`} project={project} />
                    ))}

                    {/* Middle Section: Tech (4) + Journey (8) */}
                    <TechStackCard />
                    <JourneyTimeline />

                    {/* Bottom Section: Work (4) + Achievements (8) */}
                    <WorkProjectsCard />
                    <AchievementsCard />

                    {/* Footer Section: (12) */}
                    <ContactCTA />
                </motion.div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    )
}
