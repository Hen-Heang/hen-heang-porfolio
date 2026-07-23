import Link from "next/link"
import { BookOpen, LibraryBig, Sparkles, Terminal } from "lucide-react"

const browseLinks = [
    { href: "/lab/backend", icon: BookOpen, label: "Backend curriculum" },
    { href: "/lab/devops", icon: Terminal, label: "DevOps curriculum" },
    { href: "/ai-engineering", icon: Sparkles, label: "AI Engineering" },
    { href: "/lab/library", icon: LibraryBig, label: "Full searchable library" },
]

/** Compact browse preview — the full searchable catalog lives at /lab/library. */
export function LabCategoryNav() {
    return (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {browseLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 transition-colors hover:border-border-strong"
                >
                    <link.icon size={15} aria-hidden="true" className="text-brand" />
                    <span className="truncate text-base font-medium text-fg">{link.label}</span>
                </Link>
            ))}
        </div>
    )
}
