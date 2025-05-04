"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SocialLinks } from "../shared/SocialLinks"
import { useRouter } from "next/navigation"

export function HeroContent() {
    const router = useRouter()

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    }

    return (
        <div className="order-2 md:order-1">
            <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
                <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-400/20">
                    Junior Web Application Developer
                </Badge>
            </motion.div>

            <motion.h1
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-6xl font-bold mb-4">
                Hello, I&#39;m{" "}
                <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">Heang</span>
            </motion.h1>

            <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
                Frontend developer passionate about creating attractive and functional web experiences.
            </motion.p>

            <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
            >
                <Button
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                    onClick={() => router.push("/projects")}
                >
                    View projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                    onClick={() => router.push("/about")}
                >
                    About me
                </Button>
            </motion.div>

            <motion.div custom={4} variants={textVariants} initial="hidden" animate="visible" className="mt-12">
                <SocialLinks />
            </motion.div>
        </div>
    )
}
