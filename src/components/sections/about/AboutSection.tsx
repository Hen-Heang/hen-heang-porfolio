"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { AboutBento } from "./AboutBento"

export function AboutSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section id="about" className="section-base section-muted">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="About Me"
                    title="Get to know me better"
                    description=""
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                   <AboutBento />
                </motion.div>
            </div>
        </section>
    )
}
