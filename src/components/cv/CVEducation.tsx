import { GraduationCap } from "lucide-react"
import { CVSection } from "./CVSection"
import type { CVData } from "@/data/cv-data"

export function CVEducation({ cv }: { cv: CVData }) {
  return (
    <CVSection title="Education" icon={GraduationCap}>
      <div className="space-y-5 print:space-y-4">
        {cv.education.map((item) => (
          <div key={`${item.school}-${item.startDate}`} className="print:break-inside-avoid">
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
              {item.startDate} – {item.endDate}
            </span>
            <h3 className="font-bold text-slate-900 text-sm leading-tight mt-0.5">{item.school}</h3>
            <p className="text-[13px] font-medium text-slate-700 mt-0.5">{item.degree}</p>
            {item.description && (
              <p className="text-[12px] text-slate-500 leading-relaxed mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </CVSection>
  )
}
