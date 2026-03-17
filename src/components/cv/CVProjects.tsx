import { Github, ExternalLink, Rocket } from "lucide-react"
import { CVSection } from "./CVSection"
import { cvData } from "@/data/cv-data"

export function CVProjects() {
  return (
    <CVSection title="Selected Projects" icon={Rocket}>
      <div className="grid grid-cols-1 gap-6 print:gap-4">
        {cvData.projects.map((project, i) => (
          <div key={i} className="group p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-md transition-all">
            {/* Project name + links */}
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
              <h3 className="font-bold text-[#1a365d] text-[15px] group-hover:text-[#3182ce] transition-colors">
                {project.name}
              </h3>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-[#1a365d] transition-colors"
                  >
                    <Github size={12} /> CODE
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-bold text-[#3182ce] hover:underline"
                  >
                    <ExternalLink size={12} /> LIVE
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
              {project.description}
            </p>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white text-gray-500 border border-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CVSection>
  )
}
