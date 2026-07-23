import { ResumeSection } from "./ResumeSection"
import type { CVData } from "@/data/cv-data"

export function ResumeExperience({ cv }: { cv: CVData }) {
  return (
    <ResumeSection title="PROFESSIONAL EXPERIENCE">
      <div className="space-y-4">
        {cv.experience.map((job) => (
          <div key={`${job.company}-${job.startDate}`} className="print:break-inside-avoid">
            <div className="flex flex-wrap justify-between items-baseline gap-x-3">
              <h3 className="text-[11.5px] font-bold text-black">
                {job.title} — {job.company}
              </h3>
              <span className="text-[10.5px] text-black whitespace-nowrap">
                {job.startDate} – {job.current ? "Present" : job.endDate}
              </span>
            </div>
            <p className="text-[10.5px] text-black">{job.location}</p>

            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="text-[10.5px] text-black leading-[1.4]">
                  {bullet}
                </li>
              ))}
            </ul>

            {job.stack && job.stack.length > 0 && (
              <p className="text-[10.5px] text-black mt-1">
                <span className="font-semibold">Technologies: </span>
                {job.stack.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}
