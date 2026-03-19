"use client"

import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { MobileDock } from "@/src/components/dashboard/MobileDock"
import { Footer } from "@/src/components/ui/Footer"
import { ScrollToTop } from "@/src/components/ui/ScrollToTop"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/src/lib/utils/animations"

interface PageLayoutProps {
    children: React.ReactNode
    showFooter?: boolean
    className?: string
}

export function PageLayout({ children, showFooter = true, className = "" }: PageLayoutProps) {
    return (
        <div className={`min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-[#09090b] dark:text-[#fafafa] font-sans pb-24 md:pb-0 ${className}`}>
            <MobileDock />
            <DashboardHeader />
            <motion.main 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="pt-4 md:pt-8"
            >
                {children}
            </motion.main>
            {showFooter && (
                <motion.div variants={staggerItem}>
                    <Footer />
                </motion.div>
            )}
            <ScrollToTop />
        </div>
    )
}
