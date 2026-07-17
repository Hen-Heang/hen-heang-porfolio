import type { EducationItem } from "@/src/lib/types"

/** Public-content guard for education records intentionally hidden from the portfolio timeline. */
export function isPublishedEducation(item: EducationItem): boolean {
    const title = item.title.trim().toLowerCase()
    const period = item.period.trim()

    return !(title === "basic computer" && period === "2020")
}

export function filterPublishedEducation(items: EducationItem[]): EducationItem[] {
    return items.filter(isPublishedEducation)
}
