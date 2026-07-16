import React from "react"
import { cn } from "@/src/lib/utils/utils"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { SectionHeading } from "@/src/components/system/SectionHeading"

interface SectionProps {
    id?: string
    eyebrow?: string
    title?: string
    description?: string
    className?: string
    children: React.ReactNode
}

/** Full-width page section with the editorial vertical rhythm and an optional header. */
export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
    return (
        <section id={id} className={cn("scroll-mt-16 py-section", className)}>
            <Container>
                {(eyebrow || title) && (
                    <div className="mb-12 max-w-2xl md:mb-16">
                        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
                        {title && <SectionHeading>{title}</SectionHeading>}
                        {description && (
                            <p className="mt-4 text-base leading-relaxed text-fg-secondary sm:text-lg">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </Container>
        </section>
    )
}
