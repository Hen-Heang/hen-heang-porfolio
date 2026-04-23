"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { EducationItem as EducationItemComponent } from "./EducationItem"
import { education as staticEducation } from "@/data/education"
import { getEducation } from "@/src/lib/db/portfolio"
import type { EducationItem } from "@/src/lib/types"
import { useState, useEffect } from "react"
import { Skeleton } from "@/src/components/ui/Skeleton"

export function EducationSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })
    const [education, setEducation] = useState<EducationItem[] | null>(null)

    useEffect(() => {
        getEducation().then((data) => setEducation(data.length ? data : staticEducation))
    }, [])

    return (
        <section id="education" className="section-base section-muted">
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
                    {education === null ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-4 pb-8">
                                <Skeleton className="w-2 h-2 rounded-full mt-2 shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        ))
                    ) : education.map((item, index) => (
                        <EducationItemComponent key={index} item={item} index={index} isLast={index === education.length - 1} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
