import { Languages } from "lucide-react"
import { CVSection } from "./CVSection"
import { getLanguageFlag } from "@/src/lib/utils/language-flags"
import type { CVData } from "@/data/cv-data"

export function CVLanguages({ cv }: { cv: CVData }) {
  return (
    <CVSection title="Languages" icon={Languages}>
      <div className="space-y-3">
        {cv.languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2.5">
            <span className="text-base leading-none print:hidden" aria-hidden>
              {getLanguageFlag(lang.name)}
            </span>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-800">{lang.name}</span>
              <span className="text-[11px] text-slate-500">{lang.level}</span>
            </div>
          </div>
        ))}
      </div>
    </CVSection>
  )
}
