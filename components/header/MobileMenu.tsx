"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import type { NavItem } from "@/types"

interface MobileMenuProps {
    isOpen: boolean
    navItems: NavItem[]
    activeSection: string
    onItemClick: (sectionId: string) => void
}

export function MobileMenu({ isOpen, navItems, activeSection, onItemClick }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-40 bg-white dark:bg-[#0f172a] pt-16"
                >
                    <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onItemClick(item.id)
                                }}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "rgba(0,0,0,0.05)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">{item.icon}</div>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <ChevronRight size={20} className="text-gray-400" />
                            </motion.a>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
