"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Download, Mail, Home, User, Briefcase, BarChart, GraduationCap, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import type { NavItem } from "@/src/lib/types"
import { personalInfo } from "@/data/personal-info"

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

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen]);

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

    const handleDownloadResume = async () => {
        try {
            console.log('Starting resume download from navbar...')
            
            const response = await fetch('/api/download-resume')
            
            console.log('Response status:', response.status)
            
            if (response.ok) {
                const blob = await response.blob()
                console.log('Blob size:', blob.size, 'bytes')
                
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'Hen_Heang_CV.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
                
                console.log('Download successful from navbar')
                alert('Resume downloaded successfully!')
            } else {
                const errorData = await response.json()
                console.error('Download failed:', errorData)
                throw new Error(`Download failed: ${errorData.error}`)
            }
        } catch (error) {
            console.error('Download error from navbar:', error)
            
            try {
                console.log('Trying fallback download from navbar...')
                window.open('/Hen_Heang_Personal Application Form_KO_EN.pdf', '_blank')
                alert('Opening resume in new tab as fallback')
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError)
                alert('Download failed. Please try again or contact me directly.')
            }
        }
    }

    // Icon mapping for better visual consistency
    const getIcon = (id: string) => {
        const iconMap: { [key: string]: React.ReactNode } = {
            home: <Home size={18} />,
            about: <User size={18} />,
            projects: <Briefcase size={18} />,
            skills: <BarChart size={18} />,
            education: <GraduationCap size={18} />,
            achievements: <Trophy size={18} />,
            contact: <Mail size={18} />
        };
        return iconMap[id] || navItems.find(item => item.id === id)?.icon;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                    scrolled
                        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-2xl"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo/Brand - Just the image */}
                        

                        {/* Enhanced Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="relative"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavItemClick(item.id);
                                        }}
                                        className={`relative px-6 py-3 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 flex items-center gap-2 group ${
                                            activeSection === item.id 
                                                ? "text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-900/20" 
                                                : "hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                                        }`}
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                    >
                                        <motion.span 
                                            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                            whileHover={{ rotate: 5 }}
                                        >
                                            {getIcon(item.id)}
                                        </motion.span>
                                        {item.label}
                                        {activeSection === item.id && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"
                                                layoutId="activeNavIndicator"
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Enhanced Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Download Resume Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadResume}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium border border-teal-400/20"
                                aria-label="Download resume"
                            >
                                <Download size={16} />
                                Resume
                            </motion.button>

                            {/* Enhanced Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme}
                                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={darkMode ? 'sun' : 'moon'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            {/* Enhanced Contact Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:flex bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                                onClick={() => handleNavItemClick("contact")}
                                aria-label="Contact me">
                                Contact Me
                            </motion.button>

                            {/* Enhanced Profile Section - Moved to the very end */}
                            <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l border-gray-200/50 dark:border-gray-700/50">
                               
                                <motion.div
                            className="flex items-center cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/")}
                            role="button"
                            tabIndex={0}
                            aria-label="Go to home page"
                            onKeyDown={(e) => e.key === 'Enter' && router.push("/")}>
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-3 border-white/20 shadow-2xl group-hover:border-teal-400/50 transition-all duration-500 ring-2 ring-transparent group-hover:ring-teal-400/30">
                                <Image
                                    src={personalInfo.profileImage}
                                    alt={personalInfo.fullName || personalInfo.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                            </div>

                            {/* Enhanced Mobile Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileMenuOpen}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={mobileMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        
                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-x-0 top-20 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-2xl"
                        >
                            <div className="container mx-auto px-4 py-6">
                                <nav className="flex flex-col space-y-3" role="navigation" aria-label="Mobile navigation">
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavItemClick(item.id);
                                            }}
                                            className={`flex items-center gap-3 p-4 rounded-xl text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                                                activeSection === item.id
                                                    ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold shadow-lg"
                                                    : "hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400"
                                            }`}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            aria-current={activeSection === item.id ? "page" : undefined}
                                        >
                                            <motion.span 
                                                className="opacity-70"
                                                whileHover={{ rotate: 5 }}
                                            >
                                                {getIcon(item.id)}
                                            </motion.span>
                                            {item.label}
                                        </motion.a>
                                    ))}
                                    
                                    {/* Mobile Download Resume */}
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDownloadResume}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold shadow-lg text-left"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: navItems.length * 0.1 }}
                                        aria-label="Download resume"
                                    >
                                        <Download size={18} />
                                        Download Resume
                                    </motion.button>

                                    {/* Mobile Contact */}
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white font-semibold text-left transition-all duration-300"
                                        onClick={() => handleNavItemClick("contact")}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (navItems.length + 1) * 0.1 }}
                                        aria-label="Contact me"
                                    >
                                        <Mail size={18} />
                                        Contact Me
                                    </motion.button>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer to account for fixed header */}
            <div className="h-20"></div>
        </>
    );
}