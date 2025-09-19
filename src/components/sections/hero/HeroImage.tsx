"use client"

import { motion } from "framer-motion"
import Image from "next/image";
import {personalInfo} from "@/data/personal-info";

interface HeroImageProps {
    useAvatar?: boolean;
}

export function HeroImage({ useAvatar = false }: HeroImageProps) {
    // Use either the cartoon avatar or the actual profile image
    const imageSrc = useAvatar ? personalInfo.myImage : personalInfo.profileImage;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center">
            <div className="relative">
                <motion.div
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 blur-3xl opacity-20 absolute -inset-4"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}></motion.div>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden relative z-10">
                    <Image
                        src={imageSrc}
                        alt={personalInfo.name}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 768px) 256px, 320px"
                        style={{ objectPosition: 'center 25%' }}
                    />
                </div>

                <motion.div
                    className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-20"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.6,
                    }}>
                    👨‍💻
                </motion.div>
            </div>
        </motion.div>
    )
}