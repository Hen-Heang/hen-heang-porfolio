import { ResumeSection } from "./ResumeSection"
import type { CVData } from "@/data/cv-data"

export function ResumeEducation({ cv }: { cv: CVData }) {
  return (
    <ResumeSection title="EDUCATION">
      <div className="space-y-2">
        {cv.education.map((item) => (
          <div key={`${item.school}-${item.startDate}`} className="print:break-inside-avoid">
            <div className="flex flex-wrap justify-between items-baseline gap-x-3">
              <h3 className="text-[11.5px] font-bold text-black">
                {item.degree} — {item.school}
              </h3>
              <span className="text-[10.5px] text-black whitespace-nowrap">
                {item.startDate} – {item.endDate}
              </span>
            </div>
            {item.description && <p className="text-[10.5px] text-black leading-[1.4]">{item.description}</p>}
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}
