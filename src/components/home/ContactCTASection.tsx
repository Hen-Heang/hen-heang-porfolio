import React from "react"
import Link from "next/link"
import { Container } from "@/src/components/system/Container"

export function ContactCTASection() {
    return (
        <section className="border-t border-border py-section">
            <Container>
                <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-display-sm text-fg">Have a system to build?</h2>
                        <p className="mt-4 max-w-lg text-lg leading-relaxed text-fg-secondary">
                            I&apos;m available for backend, full-stack, and engineering collaboration.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                        >
                            Start a conversation
                        </Link>
                        <Link
                            href="/cv"
                            className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface-hover"
                        >
                            Download CV
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
