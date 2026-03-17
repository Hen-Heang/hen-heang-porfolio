import { GraduationCap } from "lucide-react"
import { CVSection } from "./CVSection"
import { cvData } from "@/data/cv-data"

export function CVEducation() {
  return (
    <CVSection title="Education" icon={GraduationCap}>
      <div className="space-y-6 print:space-y-4">
        {cvData.education.map((item, i) => (
          <div key={i} className="group">
            <div className="flex flex-col mb-1">
              <span className="text-[11px] font-bold text-[#3182ce] uppercase tracking-wider mb-1">
                {item.startDate} — {item.endDate}
              </span>
              <h3 className="font-bold text-[#1a365d] text-sm leading-tight group-hover:text-[#3182ce] transition-colors">
                {item.school}
              </h3>
            </div>
            <p className="text-[13px] font-medium text-gray-700 mb-1">{item.degree}</p>
            {item.description && (
              <p className="text-[11px] text-gray-500 leading-relaxed italic border-l-2 border-gray-100 pl-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </CVSection>
  )
}
