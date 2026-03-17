import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"
import { cvData } from "@/data/cv-data"

export function CVHeader() {
  const { personal } = cvData

  return (
    <header className="mb-10 print:mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Photo */}
        {personal.photo && (
          <div className="flex-shrink-0 relative group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-2deg] transition-transform group-hover:rotate-0">
              <Image
                src={personal.photo}
                alt={personal.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Subtle accent background for photo */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#1a365d] to-[#3182ce] rounded-2xl -z-10 blur-sm opacity-20" />
          </div>
        )}

        {/* Name & Title */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a365d] leading-none mb-2">
              {personal.name}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-500 tracking-wide">
              {personal.title}
            </p>
            <div className="h-1 w-20 bg-[#3182ce] mt-4 mx-auto md:mx-0 rounded-full" />
          </div>

          <p className="text-sm md:text-base text-gray-600 font-medium max-w-2xl mb-6">
            {personal.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center">
                  <MapPin size={12} className="text-[#1a365d]" />
                </div>
                {personal.location}
              </span>
              {personal.phone && (
                <span className="flex items-center gap-2 text-gray-600">
                  <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center">
                    <Phone size={12} className="text-[#1a365d]" />
                  </div>
                  {personal.phone}
                </span>
              )}
              <a href={`mailto:${personal.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[#3182ce] transition-colors group">
                <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center group-hover:bg-[#3182ce]/10 transition-colors">
                  <Mail size={12} className="text-[#1a365d] group-hover:text-[#3182ce]" />
                </div>
                {personal.email}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#3182ce] transition-colors group">
                <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center group-hover:bg-[#3182ce]/10 transition-colors">
                  <Linkedin size={12} className="text-[#1a365d] group-hover:text-[#3182ce]" />
                </div>
                LinkedIn
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#3182ce] transition-colors group">
                <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center group-hover:bg-[#3182ce]/10 transition-colors">
                  <Github size={12} className="text-[#1a365d] group-hover:text-[#3182ce]" />
                </div>
                GitHub
              </a>
              <a href={personal.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#3182ce] transition-colors group">
                <div className="w-6 h-6 rounded-md bg-[#1a365d]/5 flex items-center justify-center group-hover:bg-[#3182ce]/10 transition-colors">
                  <Globe size={12} className="text-[#1a365d] group-hover:text-[#3182ce]" />
                </div>
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
