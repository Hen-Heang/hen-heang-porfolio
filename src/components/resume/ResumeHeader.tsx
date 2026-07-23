import { displayUrl } from "@/src/lib/utils/display-url"
import type { CVData } from "@/data/cv-data"

export function ResumeHeader({ cv }: { cv: CVData }) {
  const { personal } = cv

  const links: { label: string; href: string }[] = []
  if (personal.linkedin) links.push({ label: "LinkedIn", href: personal.linkedin })
  if (personal.github) links.push({ label: displayUrl(personal.github), href: personal.github })
  if (personal.portfolio) links.push({ label: displayUrl(personal.portfolio), href: personal.portfolio })

  return (
    <header className="mb-6">
      <h1 className="text-[24px] font-bold text-black leading-tight">{personal.name}</h1>
      <p className="text-[13px] font-medium text-black mt-0.5">
        {personal.title}
        {personal.subtitle ? ` | ${personal.subtitle}` : ""}
      </p>

      <p className="text-[11px] text-black mt-2 leading-normal">
        {personal.location}
        {personal.phone ? ` | ${personal.phone}` : ""}
        {" | "}
        <a href={`mailto:${personal.email}`} className="underline">
          {personal.email}
        </a>
        {links.map((link) => (
          <span key={link.href}>
            {" | "}
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </header>
  )
}
