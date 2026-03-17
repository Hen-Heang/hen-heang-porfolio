"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { personalInfo } from "@/data/personal-info"

interface HeroImageProps {
    useAvatar?: boolean
}

export function HeroImage({ useAvatar = false }: HeroImageProps) {
    // Default to myImage for a modern, minimalist look
    const imageSrc = useAvatar ? personalInfo.profileImage : personalInfo.myImage

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center items-center w-full h-full"
        >
            <div className="relative group">
                {/* Minimalist subtle background glow */}
                <div className="absolute -inset-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Clean Frame */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-sm transition-shadow duration-300 group-hover:shadow-md overflow-hidden z-10">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={personalInfo.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 288px, 384px"
                        />
                    </div>
                </div>

                {/* Minimalist Badge */}
                <motion.div
                    className="absolute -bottom-4 -right-4 w-14 h-14 bg-zinc-900 dark:bg-zinc-100 rounded-full flex items-center justify-center text-white dark:text-zinc-900 border-4 border-white dark:border-zinc-950 z-20 shadow-sm"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.8,
                    }}
                >
                    <span className="text-xl">👨‍💻</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
