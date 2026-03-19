"use client"

import { motion } from "framer-motion"
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { MobileDock } from "@/src/components/dashboard/MobileDock"
import { HeroProfileCard } from "@/src/components/dashboard/cards/HeroProfileCard"
import { KoriAICard } from "@/src/components/dashboard/cards/KoriAICard"
import { StatsGrid } from "@/src/components/dashboard/cards/StatsGrid"
import { DevNotesCard } from "@/src/components/dashboard/cards/DevNotesCard"
import { MoneyFlowCard } from "@/src/components/dashboard/cards/MoneyFlowCard"
import { TechStackCard } from "@/src/components/dashboard/cards/TechStackCard"
import { WorkProjectsCard } from "@/src/components/dashboard/cards/WorkProjectsCard"
import { JourneyTimeline } from "@/src/components/dashboard/cards/JourneyTimeline"
import { ContactCTA } from "@/src/components/dashboard/cards/ContactCTA"
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
                    {/* Row 1+2: Profile (col-4) | KoriAI (col-8, row-span-2) */}
                    <HeroProfileCard />
                    <KoriAICard />

                    {/* Row 2 left: Stats (col-4, fills under profile) */}
                    <StatsGrid />

                    {/* Row 3: DevNotes | MoneyFlow (KoriAI) | TechStack */}
                    <DevNotesCard />
                    <MoneyFlowCard />
                    <TechStackCard />

                    {/* Row 4: WorkProjects | JourneyTimeline */}
                    <WorkProjectsCard />
                    <JourneyTimeline />

                    {/* Row 5: ContactCTA full width */}
                    <ContactCTA />
                </motion.div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    )
}
