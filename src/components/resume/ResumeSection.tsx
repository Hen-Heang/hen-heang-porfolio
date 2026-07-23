import type { ReactNode } from "react"

interface ResumeSectionProps {
  /** Standard ATS heading text, e.g. "PROFESSIONAL EXPERIENCE". Pass already upper-cased. */
  title: string
  children: ReactNode
}

/** Plain section wrapper for the ATS resume — no borders, backgrounds, or icons. */
export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="text-[12px] font-bold tracking-wide text-black mb-2">{title}</h2>
      {children}
    </section>
  )
}
