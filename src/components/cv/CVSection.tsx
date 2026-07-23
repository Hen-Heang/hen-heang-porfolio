import type { ReactNode, ElementType } from "react"

interface CVSectionProps {
  title: string
  icon?: ElementType
  children: ReactNode
  className?: string
}

/** Reusable section wrapper with heading + bottom border divider. */
export function CVSection({ title, icon: Icon, children, className = "" }: CVSectionProps) {
  return (
    <section className={`mb-8 last:mb-0 print:mb-6 ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-5 print:mb-4">
        {Icon && <Icon size={15} className="text-blue-600 print:hidden" aria-hidden />}
        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  )
}
