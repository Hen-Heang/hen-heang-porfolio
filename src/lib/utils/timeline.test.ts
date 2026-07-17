import { describe, expect, it } from "vitest"
import { buildCareerTimeline } from "./timeline"
import type { ExperienceItem, EducationItem } from "@/src/lib/types"
import type { Achievement } from "@/data/achievements"

const experience: ExperienceItem[] = [
    { role: "Full-Stack Developer", company: "Bizplay", period: "October 2025 — Present", summary: "..." },
]

const education: EducationItem[] = [
    { period: "2023", title: "Full-Stack Bootcamp", institution: "Korea Software HRD Center", description: "..." },
    { period: "2020-2024", title: "Computer Science", institution: "Royal University of Phnom Penh", description: "..." },
    { period: "In progress", title: "Self study", institution: "Self-Learning", description: "..." },
]

describe("buildCareerTimeline with achievements", () => {
    it("attaches an achievement to the matching org entry as a credential", () => {
        const achievements: Achievement[] = [
            {
                id: "1",
                title: "Bachelor of Science",
                issuer: "Royal University of Phnom Penh",
                date: "2024",
                type: "graduation",
                image: "/rupp-certificate-redacted.png",
            },
        ]
        const items = buildCareerTimeline(experience, education, achievements)
        const rupp = items.find((i) => i.org === "Royal University of Phnom Penh")
        expect(rupp?.credentials).toEqual([
            {
                title: "Bachelor of Science",
                type: "graduation",
                image: "/rupp-certificate-redacted.png",
            },
        ])
    })

    it("matches an aliased issuer name (KSHRD) to its full org name", () => {
        const achievements: Achievement[] = [
            { id: "2", title: "Basic Course Certificate", issuer: "KSHRD", date: "2023", type: "certificate" },
        ]
        const items = buildCareerTimeline(experience, education, achievements)
        const bootcamp = items.find((i) => i.title === "Full-Stack Bootcamp")
        expect(bootcamp?.credentials).toHaveLength(1)
    })

    it("attaches a KOSIGN-issued certificate to the KOSIGN company entry", () => {
        const kosignExperience: ExperienceItem[] = [
            {
                role: "Software Engineer",
                company: "KOSIGN [Korea Software Innovation Global Network]",
                period: "January 2024 — October 2025",
                summary: "...",
            },
        ]
        const achievements: Achievement[] = [
            {
                id: "kosign-certificate",
                title: "Mindfulness for Wellbeing",
                issuer: "KOSIGN",
                date: "2024",
                type: "certificate",
                image: "/development-soft skill certification.png",
            },
        ]

        const items = buildCareerTimeline(kosignExperience, [], achievements)
        const kosign = items.find((item) => item.org.startsWith("KOSIGN"))

        expect(kosign?.credentials).toEqual([
            {
                title: "Mindfulness for Wellbeing",
                type: "certificate",
                image: "/development-soft skill certification.png",
            },
        ])
    })

    it("keeps the Addbook certificate without showing a Basic Computer education entry", () => {
        const achievements: Achievement[] = [
            {
                id: "addbook-certificate",
                title: "Word, Excel, PowerPoint & Internet Certificate",
                issuer: "Addbook Computer Centre",
                date: "2021",
                type: "certificate",
                image: "/basic-computer-certificate-redacted.png",
            },
        ]

        const items = buildCareerTimeline([], [], achievements)

        expect(items).toEqual([
            {
                period: "2021",
                title: "Word, Excel, PowerPoint & Internet Certificate",
                org: "Addbook Computer Centre",
                description: "",
                image: "/basic-computer-certificate-redacted.png",
                kind: "certificate",
            },
        ])
        expect(items.some((item) => item.title === "Basic Computer")).toBe(false)
    })

    it("creates a standalone entry for an achievement with no matching org, without dropping it", () => {
        const achievements: Achievement[] = [
            { id: "3", title: "Claude 101", issuer: "Anthropic", date: "2026", type: "certificate", image: "/cert.png", link: "/cert.pdf" },
        ]
        const items = buildCareerTimeline(experience, education, achievements)
        const standalone = items.find((i) => i.title === "Claude 101")
        expect(standalone).toMatchObject({ org: "Anthropic", period: "2026", kind: "certificate", image: "/cert.png" })
    })

    it("keeps the self-learning entry last regardless of achievement years", () => {
        const achievements: Achievement[] = [
            { id: "4", title: "Recent cert", issuer: "Somewhere Else", date: "2026", type: "certificate" },
        ]
        const items = buildCareerTimeline(experience, education, achievements)
        expect(items[items.length - 1].kind).toBe("direction")
    })

    it("defaults to no achievements and behaves exactly as before when omitted", () => {
        const items = buildCareerTimeline(experience, education)
        expect(items.every((i) => !i.credentials)).toBe(true)
    })
})
