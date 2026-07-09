"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { LabSidebar } from "./LabSidebar"
import { LabHeader } from "./LabHeader"
import { ScrollToTop } from "@/src/components/ui/ScrollToTop"

export function LabShell({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    // Close the mobile drawer whenever the route changes
    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 border-r border-[#27272a] lg:block">
                <LabSidebar />
            </aside>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                            aria-hidden="true"
                        />
                        <motion.aside
                            initial={{ x: -260 }}
                            animate={{ x: 0 }}
                            exit={{ x: -260 }}
                            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
                            className="fixed inset-y-0 left-0 z-50 w-60 border-r border-[#27272a] lg:hidden"
                        >
                            <LabSidebar onNavigate={() => setMenuOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Content */}
            <div className="lg:pl-60">
                <LabHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
                <main>{children}</main>
            </div>

            <ScrollToTop />
        </div>
    )
}
