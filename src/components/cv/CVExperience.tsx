import { Briefcase } from "lucide-react"
import { CVSection } from "./CVSection"
import { cvData } from "@/data/cv-data"

export function CVExperience() {
  return (
    <CVSection title="Professional Experience" icon={Briefcase}>
      <div className="relative border-l-2 border-[#1a365d]/10 ml-2.5 pl-6 space-y-10 print:space-y-6">
        {cvData.experience.map((job, i) => (
          <div key={i} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-[#1a365d] shadow-sm" />

            {/* Company + Dates */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1 mb-1">
              <h3 className="font-extrabold text-[#1a365d] text-base tracking-tight">
                {job.company}
              </h3>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
                {job.startDate} — {job.current ? <span className="text-[#3182ce]">Present</span> : job.endDate}
              </span>
            </div>

            {/* Title + Location */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
              <span className="text-sm font-semibold text-gray-700 italic">
                {job.title}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                • {job.location}
              </span>
            </div>

            {/* Bullet points */}
            <ul className="space-y-2 mb-4">
              {job.bullets.map((bullet, j) => (
                <li key={j} className="flex gap-3 text-[13px] text-gray-600 leading-relaxed group">
                  <span className="mt-1.5 h-1 w-1.5 flex-shrink-0 rounded-full bg-[#3182ce]/40 group-hover:bg-[#3182ce] transition-colors" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Tech stack tags */}
            {job.stack && (
              <div className="flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#1a365d]/5 text-[#1a365d] border border-[#1a365d]/10 uppercase tracking-tighter"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </CVSection>
  )
}
