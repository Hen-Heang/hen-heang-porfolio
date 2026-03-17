import { Zap } from "lucide-react"
import { CVSection } from "./CVSection"
import { cvData } from "@/data/cv-data"

export function CVSkills() {
  return (
    <CVSection title="Technical Expertise" icon={Zap}>
      <div className="space-y-6">
        {cvData.skills.map((group) => (
          <div key={group.category} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#1a365d] uppercase tracking-wider group-hover:text-[#3182ce] transition-colors">
                {group.category}
              </span>
              <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                {group.proficiency}%
              </span>
            </div>
            
            {/* Minimalist progress bar */}
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-[#1a365d] transition-all duration-1000 ease-out group-hover:bg-[#3182ce]"
                style={{ width: `${group.proficiency}%` }}
              />
            </div>

            {/* Modern skill pills */}
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white text-gray-600 border border-gray-200 shadow-sm hover:border-[#3182ce]/30 hover:text-[#1a365d] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CVSection>
  )
}
