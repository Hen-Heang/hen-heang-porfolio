import { profileKnowledge } from "./profile"
import { buildExperienceKnowledge, experienceKnowledge } from "./experience"
import { buildProjectsKnowledge, projectsKnowledge } from "./projects"
import { buildSkillsKnowledge, skillsKnowledge } from "./skills"
import { articlesKnowledge } from "./articles"
import { contactKnowledge } from "./contact"
import { faqKnowledge } from "./faq"
import type { EducationItem, ExperienceItem, Project, SkillCategory } from "@/src/lib/types"
import type { KnowledgeSection } from "./types"

export type { KnowledgeSection, KnowledgeCategory } from "./types"

/**
 * Assembles a knowledge base from the given portfolio data. The live
 * knowledge layer calls this with Supabase rows; profile, articles, contact,
 * and FAQ sections are always static (they have no database counterpart).
 */
export function buildKnowledgeBase(data: {
    projects: Project[]
    experiences: ExperienceItem[]
    education: EducationItem[]
    skills: SkillCategory[]
}): KnowledgeSection[] {
    return [
        ...profileKnowledge,
        ...buildExperienceKnowledge(data.experiences, data.education),
        ...buildProjectsKnowledge(data.projects),
        ...buildSkillsKnowledge(data.skills),
        ...articlesKnowledge,
        ...contactKnowledge,
        ...faqKnowledge,
    ]
}

/** The complete, ordered knowledge base built from the static data files. */
export const knowledgeBase: KnowledgeSection[] = [
    ...profileKnowledge,
    ...experienceKnowledge,
    ...projectsKnowledge,
    ...skillsKnowledge,
    ...articlesKnowledge,
    ...contactKnowledge,
    ...faqKnowledge,
]

/** Sections that are always sent regardless of the question. */
export const coreSections = knowledgeBase.filter((s) => s.core)

/** Renders a set of sections as one markdown context block for the model. */
export function renderSections(sections: KnowledgeSection[]): string {
    return sections
        .map((section) => `## ${section.title}\n\n${section.content}`)
        .join("\n\n---\n\n")
}
