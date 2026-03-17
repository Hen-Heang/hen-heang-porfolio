import { Languages } from "lucide-react"
import { CVSection } from "./CVSection"
import { cvData } from "@/data/cv-data"

export function CVLanguages() {
  return (
    <CVSection title="Languages" icon={Languages}>
      <div className="space-y-4">
        {cvData.languages.map((lang) => (
          <div key={lang.name} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-800">
                  {lang.name}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                  {lang.level}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#1a365d]">
                {lang.proficiency}%
              </span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1a365d] group-hover:bg-[#3182ce] transition-all duration-500"
                style={{ width: `${lang.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CVSection>
  )
}
