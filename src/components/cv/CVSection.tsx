import type { ReactNode, ElementType } from "react"

interface CVSectionProps {
  title: string
  icon?: ElementType
  children: ReactNode
  className?: string
}

/** Reusable section wrapper with navy heading + bottom border divider. */
export function CVSection({ title, icon: Icon, children, className = "" }: CVSectionProps) {
  return (
    <section className={`mb-8 last:mb-0 print:mb-6 ${className}`}>
      <div className="flex items-center gap-2 border-b-2 border-[#1a365d]/10 pb-1.5 mb-5 print:mb-4">
        {Icon && <Icon size={16} className="text-[#1a365d] print:text-[#1a365d]" />}
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a365d]">
          {title}
        </h2>
      </div>
      <div className="px-1">
        {children}
      </div>
    </section>
  )
}
