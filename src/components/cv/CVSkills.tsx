import { Zap } from "lucide-react"
import { CVSection } from "./CVSection"
import type { CVData } from "@/data/cv-data"

export function CVSkills({ cv }: { cv: CVData }) {
  return (
    <CVSection title="Technical Expertise" icon={Zap}>
      <div className="space-y-6">
        {cv.skills.map((group) => (
          <div key={group.category} className="group">
            <div className="flex items-center mb-3">
              <span className="text-xs font-bold text-[#1a365d] uppercase tracking-wider group-hover:text-[#3182ce] transition-colors">
                {group.category}
              </span>
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
