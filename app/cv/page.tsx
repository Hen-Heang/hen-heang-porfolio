import type { Metadata } from "next"
import { CVPage } from "@/src/components/cv/CVPage"

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

export default function CVRoute() {
  return <CVPage />
}
