import type { Metadata } from "next"
import { CVPage } from "@/src/components/cv/CVPage"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { cvData as defaultCV, type CVData } from "@/data/cv-data"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export const metadata: Metadata = {
  title: "CV — Hen Heang | Full-Stack Software Engineer",
  description:
    "Professional CV of Hen Heang — Full-Stack Software Engineer specialising in Java, Spring Boot, and Next.js. Based in Seoul, South Korea.",
  openGraph: {
    title: "CV — Hen Heang",
    description: "Full-Stack Software Engineer · Java · Spring Boot · Next.js",
    type: "profile",
  },
}

export default async function CVRoute() {
  const cv = (await getSiteContent<CVData>("cv")) ?? defaultCV
  return <CVPage cv={cv} />
}
