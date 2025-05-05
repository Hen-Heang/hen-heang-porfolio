"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import type { NavItem } from "@/types"

interface HeaderProps {
    navItems: NavItem[]
    activeSection: string
    darkMode: boolean
    toggleTheme: () => void
    onNavItemClick?: (sectionId: string) => boolean
}

export function Header({ navItems, activeSection, darkMode, toggleTheme, onNavItemClick }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleNavItemClick = (sectionId: string) => {
        // Close mobile menu first
        setMobileMenuOpen(false);

        // If we have a custom handler, and it returns true, we're done
        if (onNavItemClick && onNavItemClick(sectionId)) {
            return;
        }

        // If we're not on the home page, navigate to home with hash
        if (pathname !== "/") {
            router.push(`/#${sectionId}`);
            return;
        }

        // Default behavior - scroll to section on home page
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-gradient-to-r from-indigo-800 to-purple-800 shadow-lg"
                        : "bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push("/")}
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                                HH
                            </div>
                            <span className="font-bold text-xl text-white hidden sm:block">Hen Heang</span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavItemClick(item.id);
                                    }}
                                    className={`relative px-4 py-2 text-white rounded-md transition-colors ${
                                        activeSection === item.id ? "font-medium" : "hover:text-teal-300"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500"
                                            layoutId="activeNavIndicator"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="md:hidden p-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                                onClick={() => handleNavItemClick("contact")}
                            >
                                Contact Me
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-0 top-16 z-40 bg-gradient-to-b from-indigo-800 to-purple-900 shadow-lg"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <nav className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavItemClick(item.id);
                                        }}
                                        className={`p-3 rounded-lg text-white ${
                                            activeSection === item.id
                                                ? "bg-indigo-700 font-medium"
                                                : "hover:bg-indigo-700/50"
                                        }`}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-medium text-left"
                                    onClick={() => handleNavItemClick("contact")}
                                >
                                    Contact Me
                                </motion.button>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to account for fixed header */}
            <div className="h-16"></div>
        </>
    );
}