import Link from "next/link"
import {
    Sparkles,
    Terminal,
    MessageSquareCode,
    FileCode2,
    FlaskConical,
    BookOpen,
    ScrollText,
} from "lucide-react"

const browseLinks = [
    { href: "/lab/backend", icon: BookOpen, label: "Backend curriculum", group: "Guided learning" },
    { href: "/lab/devops", icon: Terminal, label: "DevOps curriculum", group: "Guided learning" },
    { href: "/ai-engineering", icon: Sparkles, label: "AI concepts", group: "Explanations" },
    { href: "/lab/devops/labs", icon: FlaskConical, label: "Hands-on projects", group: "Practice" },
    { href: "/ai-engineering/prompts", icon: MessageSquareCode, label: "Prompt examples", group: "Practice" },
    { href: "/ai-engineering/snippets", icon: FileCode2, label: "Reusable snippets", group: "Reference" },
    { href: "/lab/devops/commands", icon: ScrollText, label: "Command reference", group: "Reference" },
    { href: "/lab/devops/infrastructure", icon: BookOpen, label: "Infrastructure terms", group: "Reference" },
]

/** Primary category navigation — placed right after the hero so a first-time visitor sees where to go before any metrics/status content. */
export function LabCategoryNav() {
    return (
        <section className="mb-12">
            <div className="mb-4">
                <p className="font-mono text-sm font-semibold uppercase tracking-wider text-fg-muted">Learning library</p>
                <h2 className="mt-1 text-2xl font-bold text-fg">Browse by the way you want to learn</h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {browseLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 hover:border-border-strong transition-colors"
                    >
                        <link.icon size={15} aria-hidden="true" className={link.group === "Practice" ? "text-success" : "text-brand"} />
                        <span className="min-w-0">
                            <span className="block truncate text-base font-medium text-fg">{link.label}</span>
                            <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted">{link.group}</span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
