"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "../shared/SectionHeader"
import { EducationItem } from "./EducationItem"
import { education } from "@/data/education"

export function EducationSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })

    return (
        <section id="education" className="py-20 bg-gray-100 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Education"
                    title="My Academic Background"
                    description="My educational journey and professional training."
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {education.map((item, index) => (
                        <EducationItem key={index} item={item} index={index} isLast={index === education.length - 1} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
