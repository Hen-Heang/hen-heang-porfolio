"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

/** Segments that have their own index page and can be linked in the breadcrumb */
const LINKABLE: Record<string, string> = {
    devops: "DevOps",
    labs: "Labs",
    commands: "Commands",
    infrastructure: "Infrastructure",
}

/** Segments that exist in the URL but have no index page */
const UNLINKABLE: Record<string, string> = {
    topics: "Topics",
}

function slugToTitle(slug: string): string {
    return decodeURIComponent(slug)
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
}

export function LabHeader({ menuOpen, onMenuToggle }: { menuOpen: boolean; onMenuToggle: () => void }) {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean).slice(1) // drop leading "lab"

    const crumbs = segments.map((seg, i) => {
        const href = `/lab/${segments.slice(0, i + 1).join("/")}`
        if (LINKABLE[seg]) return { label: LINKABLE[seg], href }
        if (UNLINKABLE[seg]) return { label: UNLINKABLE[seg], href: null }
        return { label: slugToTitle(seg), href: null }
    })

    return (
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-[#27272a] bg-[#09090b]/80 px-4 backdrop-blur-md md:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuToggle}
                    aria-label={menuOpen ? "Close lab menu" : "Open lab menu"}
                    aria-expanded={menuOpen}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors lg:hidden"
                >
                    {menuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>

                <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-[#71717a]">
                    <Link href="/lab" className="shrink-0 hover:text-[#fafafa] transition-colors">
                        lab
                    </Link>
                    {crumbs.map((crumb, i) => (
                        <span key={i} className="flex min-w-0 items-center gap-1.5">
                            <span className="text-[#3f3f46]">/</span>
                            {crumb.href && i < crumbs.length - 1 ? (
                                <Link href={crumb.href} className="shrink-0 hover:text-[#fafafa] transition-colors">
                                    {crumb.label.toLowerCase()}
                                </Link>
                            ) : (
                                <span className="truncate text-[#a1a1aa]">{crumb.label.toLowerCase()}</span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            <div className="flex shrink-0 items-center gap-4">
                <span className="hidden items-center gap-1.5 font-mono text-[11px] text-[#71717a] sm:flex">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                    </span>
                    always building
                </span>
                <Link
                    href="/"
                    className="rounded-lg border border-[#27272a] px-2.5 py-1 font-mono text-[11px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#fafafa] transition-colors"
                >
                    exit lab
                </Link>
            </div>
        </header>
    )
}
