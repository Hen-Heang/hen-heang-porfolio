import { getSkills, getEducation, getExperience } from "@/src/lib/db/portfolio"
import { AboutPageClient } from "./AboutPageClient"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export default async function AboutPage() {
    const [skills, education, experience] = await Promise.all([
        getSkills(),
        getEducation(),
        getExperience(),
    ])

    return <AboutPageClient skills={skills} education={education} experience={experience} />
}

