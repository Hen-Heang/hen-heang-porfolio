
import LinkIn from "@/src/components/icons/linkIn";
import { motion } from "framer-motion";
import Telegram from "@/src/components/icons/telegram";
import Github from "@/src/components/icons/github";
import { Mail, MapPin, Heart, Code, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/personal-info";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const socialLinks = [
        {
            href: "https://github.com/Hen-Heang",
            icon: Github,
            label: "GitHub",
            color: "hover:text-gray-900 dark:hover:text-gray-100",
            bgColor: "hover:bg-gray-200 dark:hover:bg-gray-700"
        },
        {
            href: "https://www.linkedin.com/in/hen-heang",
            icon: LinkIn,
            label: "LinkedIn",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
            bgColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30"
        },
        {
            href: "https://t.me/henheang",
            icon: Telegram,
            label: "Telegram",
            color: "hover:text-teal-500 dark:hover:text-teal-400",
            bgColor: "hover:bg-teal-100 dark:hover:bg-teal-900/30"
        }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    variants={footerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <motion.div
                            className="flex items-center gap-3 mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👨‍💻</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                                    {personalInfo.fullName}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Full-Stack Developer
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.p 
                            variants={itemVariants}
                            className="text-slate-600 dark:text-slate-300 mb-6 max-w-md leading-relaxed"
                        >
                            Passionate about creating innovative web solutions with modern technologies. 
                            Let&apos;s build something amazing together!
                        </motion.p>

                        {/* Contact Info */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <motion.div 
                                className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Mail className="w-4 h-4 text-teal-500" />
                                <span className="text-sm">{personalInfo.email}</span>
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <MapPin className="w-4 h-4 text-teal-500" />
                                <span className="text-sm">Phnom Penh, Cambodia</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "About", href: "#about" },
                                { name: "Projects", href: "#projects" },
                                { name: "Skills", href: "#skills" },
                                { name: "Blog", href: "#blog" },
                                { name: "Contact", href: "#contact" }
                            ].map((link, index) => (
                                <motion.li key={link.name}>
                                    <motion.a
                                        href={link.href}
                                        className="text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300 text-sm"
                                        whileHover={{ x: 5 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 400, 
                                            damping: 10,
                                            delay: index * 0.1, 
                                            duration: 0.3 
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {link.name}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            Connect With Me
                        </h4>
                        <div className="flex flex-col gap-3">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 transition-all duration-300 ${link.color} ${link.bgColor} hover:shadow-md`}
                                    whileHover={{ 
                                        scale: 1.02, 
                                        y: -2,
                                        transition: { type: "spring", stiffness: 400, damping: 10 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <link.icon />
                                    </motion.div>
                                    <span className="text-sm font-medium">{link.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="pt-8 border-t border-slate-200/50 dark:border-slate-700/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <motion.div 
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span>© {currentYear} Made with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            >
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                            </motion.div>
                            <span>by {personalInfo.fullName}</span>
                        </motion.div>

                        <motion.div 
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Code className="w-4 h-4 text-teal-500" />
                            <span>Built with Next.js & Framer Motion</span>
                        </motion.div>

                        {/* Back to Top Button */}
                        <motion.button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ 
                                scale: 1.05, 
                                y: -2,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowUp className="w-4 h-4" />
                            <span>Back to Top</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
