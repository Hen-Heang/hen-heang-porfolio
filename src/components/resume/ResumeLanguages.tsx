import { ResumeSection } from "./ResumeSection"
import type { CVData } from "@/data/cv-data"

export function ResumeLanguages({ cv }: { cv: CVData }) {
  return (
    <ResumeSection title="LANGUAGES">
      <p className="text-[10.5px] text-black leading-[1.4]">
        {cv.languages.map((lang) => `${lang.name} — ${lang.level}`).join(" | ")}
      </p>
    </ResumeSection>
  )
}
