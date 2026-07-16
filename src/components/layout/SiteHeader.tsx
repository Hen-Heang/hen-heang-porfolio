"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Command, Menu } from "lucide-react"
import { ThemeToggle } from "@/src/components/system/ThemeToggle"
import { MobileMenu } from "@/src/components/layout/MobileMenu"

const CommandMenu = dynamic(() => import("@/src/components/system/CommandMenu"), { ssr: false })

export const NAV_LINKS = [
    { label: "Work", href: "/projects", match: ["/projects"] },
    { label: "Experience", href: "/about#experience", match: [] as string[] },
    { label: "Lab", href: "/lab", match: ["/lab", "/ai-engineering"] },
    { label: "About", href: "/about", match: ["/about"] },
    { label: "CV", href: "/cv", match: ["/cv"] },
]

function isActive(pathname: string, match: string[]): boolean {
    return match.some((m) => pathname === m || pathname.startsWith(`${m}/`))
}

/**
 * Site-wide sticky navigation. Transparent over the page top; gains a
 * blurred background and hairline border once the page scrolls.
 */
export function SiteHeader() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [commandOpen, setCommandOpen] = useState(false)
    // Only mount the lazy command-menu chunk once it has been requested.
    const [commandRequested, setCommandRequested] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                setCommandRequested(true)
                setCommandOpen((v) => !v)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    const openCommandMenu = () => {
        setCommandRequested(true)
        setCommandOpen(true)
    }

    return (
        <header
            className={`sticky top-0 z-[100] transition-colors duration-200 ${
                scrolled
                    ? "border-b border-border bg-background/80 backdrop-blur-md"
                    : "border-b border-transparent bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
                <Link
                    href="/"
                    className="font-mono text-lg font-semibold tracking-tight text-fg transition-colors hover:text-brand"
                    aria-label="Hen Heang — home"
                >
                    HH<span className="text-brand">.</span>
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => {
                        const active = isActive(pathname, link.match)
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-surface-hover text-fg"
                                        : "text-fg-secondary hover:bg-surface-hover hover:text-fg"
                                }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={openCommandMenu}
                        aria-label="Open command menu"
                        className="hidden h-9 items-center gap-2 rounded-lg border border-border px-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-border-strong hover:text-fg md:flex"
                    >
                        <Command size={13} aria-hidden />
                        <span>K</span>
                    </button>
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="ml-1 hidden h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 md:flex"
                    >
                        Let&apos;s talk
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={menuOpen}
                        aria-haspopup="dialog"
                        className="flex h-11 w-11 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-surface-hover hover:text-fg md:hidden"
                    >
                        <Menu size={20} aria-hidden />
                    </button>
                </div>
            </div>

            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} onOpenCommandMenu={openCommandMenu} />
            {commandRequested && <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />}
        </header>
    )
}
