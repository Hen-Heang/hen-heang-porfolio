import type { Metadata } from "next"
import { ResumePage } from "@/src/components/resume/ResumePage"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { profileData } from "@/data/profile"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export const metadata: Metadata = {
  title: "Resume — Hen Heang | Backend Developer",
  description:
    "ATS-friendly resume of Hen Heang, a Backend Developer working with Java, Spring Boot, MyBatis, PostgreSQL, and Oracle.",
  alternates: {
    canonical: `${profileData.portfolioUrl}/resume`,
  },
}

export default async function ResumeRoute() {
  const cv = await getSiteContent("cv")
  return <ResumePage cv={cv} />
}
