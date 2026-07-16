import type { EducationItem, ExperienceItem } from "@/src/lib/types"
import type { TimelineEntry } from "@/src/components/system/Timeline"

/**
 * Best-effort chronological key: the first 4-digit year found in a
 * human-readable period string (e.g. "July 2023 — April 2024" → 2023).
 * Entries with no parseable year (e.g. "In progress") sort last.
 */
function startYear(period: string): number {
    const match = period.match(/\d{4}/)
    return match ? Number(match[0]) : Number.POSITIVE_INFINITY
}

/**
 * Builds the Cambodia → Korea career timeline from all real education +
 * experience data, merged in chronological order. The self-directed
 * "in progress" learning entry always renders last regardless of its
 * nominal start year. Ties within the same year keep the source arrays'
 * relative order (Array.prototype.sort is stable).
 */
export function buildCareerTimeline(experience: ExperienceItem[], education: EducationItem[]): TimelineEntry[] {
    const direction = education.find((e) => e.institution.trim().toLowerCase() === "self-learning")
    const isUniversity = (e: EducationItem) => e.institution.toLowerCase().includes("university")

    const educationEntries: TimelineEntry[] = education
        .filter((e) => e !== direction)
        .map((e) => ({
            period: e.period,
            title: e.title,
            org: e.institution.trim(),
            location: isUniversity(e) ? "Phnom Penh, Cambodia" : undefined,
            description: e.description,
            kind: "education",
        }))

    // Work history is stored newest-first; the story reads oldest-first.
    const workEntries: TimelineEntry[] = [...experience].reverse().map((job) => ({
        period: job.period,
        title: job.role,
        org: job.company,
        location: job.location,
        description: job.summary,
        highlights: job.highlights,
        stack: job.stack,
        kind: "work",
    }))

    const merged = [...educationEntries, ...workEntries].sort(
        (a, b) => startYear(a.period) - startYear(b.period),
    )

    if (direction) {
        merged.push({
            period: direction.period,
            title: direction.title,
            org: direction.institution.trim(),
            description: direction.description,
            kind: "direction",
        })
    }

    return merged
}
