"use client"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { SocialLinks } from "@/src/components/ui/SocialLinks"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { personalInfo } from "@/data/personal-info"

const HeroSection = () => {
    const pathname = usePathname()
    const router = useRouter()
    const useAvatar = pathname !== "/"

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
            },
        },
    }

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            },
        },
    }

    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            },
        },
    }

    // Use either the cartoon avatar or the actual profile image
    const imageSrc = useAvatar ? personalInfo.myImage : personalInfo.profileImage

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
            aria-label="Hero section"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-xl"
                    variants={pulseVariants}
                    animate="animate"
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
                    variants={pulseVariants}
                    animate="animate"
                    style={{ animationDelay: "2s" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
                    variants={pulseVariants}
                    animate="animate"
                    style={{ animationDelay: "4s" }}
                />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Content Section */}
                    <motion.div className="order-2 lg:order-1 text-center lg:text-left" variants={itemVariants}>
                        <motion.div variants={itemVariants}>
                            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-400/20 hover:from-teal-500/20 hover:to-indigo-500/20 transition-all duration-300">
                <span className="relative flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                  {personalInfo.title}
                </span>
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="block text-slate-900 dark:text-white">Hello, I&#39;m</span>
                            <span className="block bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {personalInfo.fullName}
              </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            {personalInfo.description}
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="group bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                onClick={() => router.push("/projects")}
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="group border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-all duration-300"
                                onClick={() => router.push("/about")}
                            >
                                About Me
                            </Button>
                            {/* <Button
                                size="lg"
                                variant="outline"
                                className="group border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all duration-300">
                                <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
                                Resume
                            </Button> */}
                        </motion.div>

                        {/* Quick Info Cards */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <Card className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                                        <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Location</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">     {personalInfo.location}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Experience</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">{personalInfo.experience}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                        <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Status</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Available</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <SocialLinks />
                        </motion.div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div className="order-1 lg:order-2 flex justify-center lg:justify-end" variants={imageVariants}>
                        <div className="relative">
                            {/* Floating background elements */}
                            <motion.div
                                className="absolute -inset-8 bg-gradient-to-br from-teal-400/20 via-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"
                                variants={floatingVariants}
                                animate="animate"
                            />

                            {/* Main image container */}
                            <motion.div
                                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Gradient border */}
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-500 rounded-full p-1">
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                                        <Image
                                            src={imageSrc || "/placeholder.svg"}
                                            alt={`${personalInfo.name} - Full-Stack Developer`}
                                            fill
                                            className={`${
                                                useAvatar
                                                    ? "object-contain bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
                                                    : "object-cover"
                                            } transition-transform duration-300 hover:scale-110`}
                                            priority
                                            sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                                        />
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <motion.div
                                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-20"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.8,
                                    }}
                                    whileHover={{ rotate: 360 }}
                                >
                                    👨‍💻
                                </motion.div>

                                {/* Floating tech icons */}
                                <motion.div
                                    className="absolute -top-6 -left-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    variants={floatingVariants}
                                >
                                    <span className="text-lg">⚛️</span>
                                </motion.div>

                                <motion.div
                                    className="absolute -top-2 -right-8 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                    variants={floatingVariants}
                                    style={{ animationDelay: "1s" }}
                                >
                                    <span className="text-sm">🚀</span>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-2 -left-8 w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.4, duration: 0.5 }}
                                    variants={floatingVariants}
                                    style={{ animationDelay: "2s" }}
                                >
                                    <span className="text-lg">💻</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                    <motion.div
                        className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroSection
