import { User } from "lucide-react"
import { CVHeader } from "./CVHeader"
import { CVSection } from "./CVSection"
import { CVExperience } from "./CVExperience"
import { CVEducation } from "./CVEducation"
import { CVSkills } from "./CVSkills"
import { CVProjects } from "./CVProjects"
import { CVLanguages } from "./CVLanguages"
import { CVDownloadButton } from "./CVDownloadButton"
import { cvData } from "@/data/cv-data"

/**
 * CVPage — the full CV layout.
 * The wrapping <div id="cv-content"> is the target for PDF generation.
 */
export function CVPage() {
  return (
    <div id="cv-print-root" className="min-h-screen bg-[#f8fafc] py-12 px-4 print:bg-white print:p-0">
      {/* Toolbar (hidden when printing) */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-end print:hidden">
        <CVDownloadButton />
      </div>

      {/* CV Document */}
      <div
        id="cv-content"
        className="
          max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]
          print:shadow-none print:rounded-none print:max-w-none
        "
      >
        <div className="px-8 py-12 md:px-16 md:py-16 print:px-10 print:py-8">
          <CVHeader />

          {/* Professional Summary */}
          <CVSection title="About Me" icon={User} className="mb-12 print:mb-8">
            <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
              {cvData.summary}
            </p>
          </CVSection>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 print:grid-cols-12 print:gap-10">
            {/* Left Column - Main Experience & Projects */}
            <div className="lg:col-span-8 print:col-span-8 space-y-12 print:space-y-8">
              <CVExperience />
              <CVProjects />
            </div>

            {/* Right Column - Skills, Education, Languages */}
            <div className="lg:col-span-4 print:col-span-4 space-y-12 print:space-y-8">
              <div className="lg:sticky lg:top-8 space-y-12 print:space-y-8">
                <CVSkills />
                <CVEducation />
                <CVLanguages />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer hint for users */}
      <div className="max-w-5xl mx-auto mt-8 text-center text-gray-400 text-xs print:hidden">
        <p>© {new_short_year()} Hen Heang — Built with Next.js & Tailwind CSS</p>
      </div>
    </div>
  )
}

function new_short_year() {
  return new Date().getFullYear()
}
