import React from "react"
import Image from "next/image"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

export function AboutIntro({ profile }: { profile: ProfileContentParsed }) {
    return (
        <div className="pb-section pt-16 md:pt-20">
            <Container>
                <Eyebrow className="mb-4">About</Eyebrow>
                <h1 className="max-w-3xl text-display-sm text-fg">
                    {profile.fullName} — {profile.title}
                </h1>

                <div className="mt-10 grid gap-10 md:grid-cols-[160px_1fr] md:items-start">
                    <div className="relative aspect-square w-32 overflow-hidden rounded-xl border border-border md:w-full">
                        <Image
                            src={profile.myImage}
                            alt={profile.fullName}
                            fill
                            className="object-cover"
                            style={{ objectPosition: "center 20%" }}
                            priority
                        />
                    </div>

                    <div className="max-w-2xl">
                        <p className="text-lg leading-relaxed text-fg-secondary">
                            {profile.bio}
                        </p>
                        <p className="mt-4 leading-relaxed text-fg-secondary">
                            I&apos;ve worked in both Cambodia and South Korea — trained at the Korea
                            Software HRD Center, then hired into Korean-language enterprise teams
                            at KOSIGN and now Bizplay. Most of my day is spent on the systems side:
                            APIs, schemas, and the transactions in between.
                        </p>

                        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                            <div>
                                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Location</dt>
                                <dd className="mt-1 text-sm text-fg">{profile.location}</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Experience</dt>
                                <dd className="mt-1 text-sm text-fg">{profile.yearsExperience} years</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Email</dt>
                                <dd className="mt-1 truncate text-sm text-fg">{profile.email}</dd>
                            </div>
                            {profile.languages && profile.languages.length > 0 && (
                                <div>
                                    <dt className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Languages</dt>
                                    <dd className="mt-1 text-sm text-fg">
                                        {profile.languages.map((l) => l.name).join(" · ")}
                                    </dd>
                                </div>
                            )}
                            <div>
                                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Availability</dt>
                                <dd className="mt-1 text-sm text-fg">
                                    {profile.available ? "Open to opportunities" : "Currently engaged"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Container>
        </div>
    )
}
