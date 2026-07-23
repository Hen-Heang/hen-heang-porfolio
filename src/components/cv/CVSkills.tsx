import { Zap } from "lucide-react"
import { CVSection } from "./CVSection"
import type { CVData } from "@/data/cv-data"

export function CVSkills({ cv }: { cv: CVData }) {
  return (
    <CVSection title="Technical Skills" icon={Zap}>
      <div className="space-y-5">
        {cv.skills.map((group) => (
          <div key={group.category}>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-50 text-slate-600 border border-slate-200"
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
