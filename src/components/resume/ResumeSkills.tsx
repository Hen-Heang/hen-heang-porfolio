import { profileData } from "@/data/profile"
import { ResumeSection } from "./ResumeSection"
import type { CVData } from "@/data/cv-data"

// IDE names are a low-value signal for ATS parsing and recruiter scanning —
// keep them on the portfolio /cv only, drop them from the resume text.
const ideNames = new Set(profileData.ides.map((name) => name.toLowerCase()))

export function ResumeSkills({ cv }: { cv: CVData }) {
  return (
    <ResumeSection title="TECHNICAL SKILLS">
      <div className="space-y-1">
        {cv.skills.map((group) => {
          const items = group.items.filter((item) => !ideNames.has(item.toLowerCase()))
          if (items.length === 0) return null
          return (
            <p key={group.category} className="text-[10.5px] text-black leading-[1.4]">
              <span className="font-semibold">{group.category}: </span>
              {items.join(", ")}
            </p>
          )
        })}
      </div>
    </ResumeSection>
  )
}
