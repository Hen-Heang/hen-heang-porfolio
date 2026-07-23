import { displayUrl } from "@/src/lib/utils/display-url"
import { ResumeSection } from "./ResumeSection"
import type { CVData } from "@/data/cv-data"

export function ResumeProjects({ cv }: { cv: CVData }) {
  const projects = cv.projects.filter((p) => p.featured)

  return (
    <ResumeSection title="SELECTED PROJECTS">
      <div className="space-y-4">
        {projects.map((project) => {
          const link = project.github ?? project.live ?? project.caseStudy ?? null
          const linkLabel = project.github
            ? displayUrl(project.github)
            : project.live
              ? displayUrl(project.live)
              : project.caseStudy
                ? `henheang.site${project.caseStudy}`
                : null

          return (
            <div key={project.name} className="print:break-inside-avoid">
              <h3 className="text-[11.5px] font-bold text-black">
                {project.name}
                {project.category ? ` — ${project.category}` : ""}
              </h3>
              <p className="text-[10.5px] text-black">
                <span className="font-semibold">Technologies: </span>
                {project.technologies.join(", ")}
                {link && linkLabel && (
                  <>
                    {" | "}
                    <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                      {linkLabel}
                    </a>
                  </>
                )}
              </p>
              <p className="text-[10.5px] text-black mt-0.5 leading-[1.4]">{project.description}</p>

              {project.bullets && project.bullets.length > 0 && (
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="text-[10.5px] text-black leading-[1.4]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </ResumeSection>
  )
}
