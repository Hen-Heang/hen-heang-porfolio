"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
    Briefcase, FileText, FlaskConical, Github, Mail, MessageCircle, Moon, Route, Search, Sun,
} from "lucide-react"
import { usePersonalInfo } from "@/src/providers/site-content-provider"
import { NAV_LINKS } from "@/src/components/layout/SiteHeader"

interface CommandMenuProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface CommandAction {
    id: string
    label: string
    keywords: string
    icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>
    run: () => void
}

/**
 * Icon + search keywords for the nav destinations also listed in
 * SiteHeader's NAV_LINKS — reused here so the route itself has one source
 * of truth; only the command-menu-specific presentation is duplicated.
 */
const NAV_COMMAND_META: Record<string, { icon: CommandAction["icon"]; keywords: string; label: string }> = {
    Work: { icon: Briefcase, keywords: "projects portfolio case study", label: "Go to Work" },
    Experience: { icon: Route, keywords: "timeline career kosign bizplay", label: "Go to Experience" },
    Lab: { icon: FlaskConical, keywords: "lab backend java spring boot roadmap devops systems database", label: "Open Engineering Lab" },
    CV: { icon: FileText, keywords: "resume curriculum vitae download pdf", label: "Open CV" },
}

/**
 * Cmd+K command menu. Loaded lazily (next/dynamic in SiteHeader) so it adds
 * no initial JavaScript. Combobox pattern: the input keeps focus, arrow keys
 * move the highlighted option via aria-activedescendant.
 */
export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
    const router = useRouter()
    const { resolvedTheme, setTheme } = useTheme()
    const personalInfo = usePersonalInfo()
    const [query, setQuery] = useState("")
    const [activeIndex, setActiveIndex] = useState(0)
    const listRef = useRef<HTMLUListElement>(null)

    const actions = useMemo<CommandAction[]>(() => {
        const go = (href: string) => () => {
            onOpenChange(false)
            router.push(href)
        }
        const navActions = NAV_LINKS.filter((link) => NAV_COMMAND_META[link.label]).map((link) => {
            const meta = NAV_COMMAND_META[link.label]
            return { id: link.label.toLowerCase(), label: meta.label, keywords: meta.keywords, icon: meta.icon, run: go(link.href) }
        })
        return [
            ...navActions,
            {
                id: "github",
                label: "Open GitHub",
                keywords: "code repositories source",
                icon: Github,
                run: () => {
                    onOpenChange(false)
                    window.open(personalInfo.socialLinks.github, "_blank", "noopener,noreferrer")
                },
            },
            { id: "contact", label: "Contact Hen", keywords: "email message talk hire", icon: Mail, run: go("/contact") },
            {
                id: "theme",
                label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
                keywords: "theme dark light mode toggle appearance",
                icon: resolvedTheme === "dark" ? Sun : Moon,
                run: () => {
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    onOpenChange(false)
                },
            },
            {
                id: "assistant",
                label: "Ask AI assistant",
                keywords: "chat question help ai",
                icon: MessageCircle,
                run: () => {
                    onOpenChange(false)
                    window.dispatchEvent(new CustomEvent("hh:assistant-open"))
                },
            },
        ]
    }, [onOpenChange, router, personalInfo.socialLinks.github, resolvedTheme, setTheme])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return actions
        return actions.filter(
            (a) => a.label.toLowerCase().includes(q) || a.keywords.includes(q),
        )
    }, [actions, query])

    const clampedIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0))
    const activeId = filtered[clampedIndex] ? `cmd-option-${filtered[clampedIndex].id}` : undefined

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowDown") {
            event.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
        } else if (event.key === "ArrowUp") {
            event.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
        } else if (event.key === "Enter") {
            event.preventDefault()
            filtered[clampedIndex]?.run()
        }
    }

    return (
        <DialogPrimitive.Root
            open={open}
            onOpenChange={(next) => {
                onOpenChange(next)
                if (!next) {
                    setQuery("")
                    setActiveIndex(0)
                }
            }}
        >
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[150] bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
                <DialogPrimitive.Content
                    className="fixed left-1/2 top-24 z-[151] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none"
                    aria-describedby={undefined}
                >
                    <DialogPrimitive.Title className="sr-only">Command menu</DialogPrimitive.Title>
                    <div className="flex items-center gap-3 border-b border-border px-4">
                        <Search size={16} className="shrink-0 text-fg-muted" aria-hidden />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setActiveIndex(0)
                            }}
                            onKeyDown={onKeyDown}
                            placeholder="Type a command or search…"
                            role="combobox"
                            aria-expanded="true"
                            aria-controls="cmd-listbox"
                            aria-activedescendant={activeId}
                            aria-label="Command search"
                            className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-fg-muted focus:outline-none"
                        />
                        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-fg-muted sm:block">
                            ESC
                        </kbd>
                    </div>
                    <ul id="cmd-listbox" role="listbox" aria-label="Commands" ref={listRef} className="max-h-80 overflow-y-auto p-2">
                        {filtered.length === 0 && (
                            <li className="px-3 py-6 text-center text-sm text-fg-muted" role="presentation">
                                No matching commands.
                            </li>
                        )}
                        {filtered.map((action, index) => (
                            <li
                                key={action.id}
                                id={`cmd-option-${action.id}`}
                                role="option"
                                aria-selected={index === clampedIndex}
                            >
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => action.run()}
                                    onMouseMove={() => setActiveIndex(index)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                        index === clampedIndex
                                            ? "bg-surface-hover text-fg"
                                            : "text-fg-secondary"
                                    }`}
                                >
                                    <action.icon size={15} className="shrink-0 text-fg-muted" aria-hidden />
                                    {action.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}
