import { profileKnowledge } from "./profile"
import { positioningKnowledge } from "./positioning"
import { buildExperienceKnowledge, experienceKnowledge } from "./experience"
import { careerKnowledge } from "./career"
import { buildProjectsKnowledge, projectsKnowledge } from "./projects"
import { buildSkillsKnowledge, skillsKnowledge } from "./skills"
import { aiEngineeringKnowledge } from "./ai-engineering"
import { articlesKnowledge } from "./articles"
import { contactKnowledge } from "./contact"
import { faqKnowledge } from "./faq"
import type { EducationItem, ExperienceItem, Project, SkillCategory } from "@/src/lib/types"
import type { KnowledgeSection } from "./types"

export type { KnowledgeSection, KnowledgeCategory } from "./types"

/**
 * Assembles a knowledge base from the given portfolio data. The live
 * knowledge layer calls this with Supabase rows; profile, positioning,
 * career, ai-engineering, articles, contact, and FAQ sections are always
 * static (they have no database counterpart).
 */
export function buildKnowledgeBase(data: {
    projects: Project[]
    experiences: ExperienceItem[]
    education: EducationItem[]
    skills: SkillCategory[]
}): KnowledgeSection[] {
    return [
        ...profileKnowledge,
        ...positioningKnowledge,
        ...buildExperienceKnowledge(data.experiences, data.education),
        ...careerKnowledge,
        ...buildProjectsKnowledge(data.projects),
        ...buildSkillsKnowledge(data.skills),
        ...aiEngineeringKnowledge,
        ...articlesKnowledge,
        ...contactKnowledge,
        ...faqKnowledge,
    ]
}

/** The complete, ordered knowledge base built from the static data files. */
export const knowledgeBase: KnowledgeSection[] = [
    ...profileKnowledge,
    ...positioningKnowledge,
    ...experienceKnowledge,
    ...careerKnowledge,
    ...projectsKnowledge,
    ...skillsKnowledge,
    ...aiEngineeringKnowledge,
    ...articlesKnowledge,
    ...contactKnowledge,
    ...faqKnowledge,
]

/** Sections that are always sent regardless of the question. */
export const coreSections = knowledgeBase.filter((s) => s.core)

/** Renders a set of sections as one markdown context block for the model, appending a source link line when the section has one. */
export function renderSections(sections: KnowledgeSection[]): string {
    return sections
        .map((section) => {
            const source = section.sourceUrl ? `\n\n(Source: ${section.sourceLabel ?? section.title} — ${section.sourceUrl})` : ""
            return `## ${section.title}\n\n${section.content}${source}`
        })
        .join("\n\n---\n\n")
}
