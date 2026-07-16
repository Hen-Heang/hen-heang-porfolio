import type { Lab } from "@/src/lib/types/devops-lab"
import { DiagramViewer } from "@/src/components/lab/devops/DiagramViewer"
import { CodeBlock } from "@/src/components/ai-engineering/CodeBlock"
import { Callout } from "@/src/components/ai-engineering/Callout"

function languageFor(command: string): string {
    if (command.trimStart().startsWith("FROM ") || command.includes("ENTRYPOINT")) return "dockerfile"
    if (command.trimStart().startsWith("name:") || command.includes("services:") || command.includes("jobs:")) return "yaml"
    if (command.trimStart().startsWith("server {") || command.trimStart().startsWith("location ")) return "nginx"
    return "bash"
}

export function LabDetail({ lab }: { lab: Lab }) {
    return (
        <div className="text-[#d4d4d8]">
            <h2 className="mb-3 text-lg font-bold text-fg">Prerequisites</h2>
            <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.8] text-fg-secondary">
                {lab.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            <h2 className="mb-3 text-lg font-bold text-fg">Architecture</h2>
            <DiagramViewer diagram={lab.architecture} />

            <h2 className="mb-3 mt-8 text-lg font-bold text-fg">Steps</h2>
            <div className="space-y-6">
                {lab.steps.map((step, i) => (
                    <div key={i}>
                        <div className="mb-2 flex items-center gap-2.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] font-bold text-brand">
                                {i + 1}
                            </span>
                            <h3 className="text-sm font-semibold text-fg">{step.title}</h3>
                        </div>
                        {step.description && <p className="mb-2 pl-8 text-sm leading-relaxed text-fg-secondary">{step.description}</p>}
                        {step.command && (
                            <div className="pl-8">
                                <CodeBlock code={step.command} language={languageFor(step.command)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2 className="mb-3 mt-8 text-lg font-bold text-fg">Expected result</h2>
            <Callout variant="best-practice" title="What success looks like" text={lab.expectedResult} />

            <h2 className="mb-3 mt-8 text-lg font-bold text-fg">Lessons learned</h2>
            <div className="space-y-3">
                {lab.lessonsLearned.map((lesson, i) => (
                    <Callout key={i} variant="tip" text={lesson} />
                ))}
            </div>
        </div>
    )
}
