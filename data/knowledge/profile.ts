import { profileData } from "@/data/profile"
import type { KnowledgeSection } from "./types"

/**
 * Derived from data/profile.ts (single source of truth) so the assistant can
 * never drift from what the rest of the site displays.
 */
export const profileKnowledge: KnowledgeSection[] = [
    {
        id: "profile-overview",
        category: "profile",
        title: "Who is Hen Heang",
        keywords: [
            "hen", "heang", "who", "about", "introduction", "summary", "background",
            "developer", "backend", "bio", "overview", "himself", "career",
        ],
        core: true,
        content: [
            `**${profileData.fullName}** (Korean: ${profileData.koreanName}) is a ${profileData.title} based in ${profileData.location} ${profileData.locationEmoji}, currently working at **${profileData.company}**.`,
            "",
            profileData.description,
            "",
            `- Years of experience: ${profileData.yearsExperience}`,
            `- Currently available for opportunities: ${profileData.available ? "yes" : "no"}`,
            `- Portfolio: ${profileData.portfolioUrl}`,
            `- CV: ${profileData.cvUrl}`,
        ].join("\n"),
    },
    {
        id: "profile-languages",
        category: "profile",
        title: "Spoken languages",
        keywords: ["language", "languages", "speak", "khmer", "english", "korean", "communication"],
        content: profileData.languages
            .map((lang) => `- ${lang.name}: ${lang.level}`)
            .join("\n"),
    },
    {
        id: "profile-core-skills",
        category: "profile",
        title: "Core skills at a glance",
        keywords: ["core", "skills", "linkedin", "stack", "technologies", "tools", "main"],
        content: `Core skills (as listed on LinkedIn): ${profileData.linkedinCoreSkills.join(", ")}.\n\nDaily IDEs: ${profileData.ides.join(", ")}.`,
    },
]
