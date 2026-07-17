import { ArrowDown, BookOpen, CheckCircle2, FlaskConical, Route, Search } from "lucide-react"

/** Static hero — server-rendered, no client JS beyond the embedded terminal panel's own island. */
export function LabHero({ currentFocus }: { currentFocus: string[] }) {
    return (
        <section className="mb-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-background to-brand/5 p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] lg:items-center">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                        <Route size={11} aria-hidden="true" /> Learn · Build · Reflect
                    </span>
                    <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-fg md:text-5xl lg:text-6xl">Learn backend engineering by building real systems</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-7 text-fg-secondary md:text-xl">
                        Guided paths for Java, Spring Boot, DevOps, and AI-assisted development—organized around practical outcomes instead of random tutorials.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href="#learning-paths" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover">
                            Choose a learning path <ArrowDown size={14} aria-hidden="true" />
                        </a>
                        <a href="#lab-library" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-base font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg">
                            Search the library <Search size={14} aria-hidden="true" />
                        </a>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Learning now</span>
                        {currentFocus.map((focus) => <span key={focus} className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-fg-secondary">{focus}</span>)}
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-background/85 p-5 shadow-sm">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted">How to use this lab</p>
                    <ol className="mt-4 space-y-4">
                        <LearningLoopStep icon={BookOpen} number="01" title="Learn one concept" description="Use a focused guide and keep the scope small." />
                        <LearningLoopStep icon={FlaskConical} number="02" title="Apply it immediately" description="Run the commands or complete a hands-on build." />
                        <LearningLoopStep icon={CheckCircle2} number="03" title="Verify and reflect" description="Check the result, record completion, and continue." />
                    </ol>
                </div>
            </div>
        </section>
    )
}

function LearningLoopStep({ icon: Icon, number, title, description }: { icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>; number: string; title: string; description: string }) {
    return (
        <li className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-brand"><Icon size={16} aria-hidden={true} /></span>
            <span className="min-w-0"><span className="flex items-center gap-2"><span className="font-mono text-[10px] font-semibold text-fg-muted">{number}</span><span className="text-base font-semibold text-fg">{title}</span></span><span className="mt-0.5 block text-sm leading-5 text-fg-muted">{description}</span></span>
        </li>
    )
}
