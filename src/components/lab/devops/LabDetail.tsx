import type { Lab } from "@/src/lib/types/devops-lab"
import { DiagramViewer } from "@/src/components/lab/devops/DiagramViewer"
import { Callout } from "@/src/components/ai-engineering/Callout"
import { LabStepsProgress } from "@/src/components/lab/devops/LabStepsProgress"

export function LabDetail({ lab }: { lab: Lab }) {
    return (
        <div>
            <h2 id="prerequisites" className="mb-3 scroll-mt-24 text-xl font-bold text-fg">Prerequisites</h2>
            <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[17px] leading-[1.8] text-fg-secondary">
                {lab.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            <h2 id="architecture" className="mb-3 scroll-mt-24 text-xl font-bold text-fg">Architecture</h2>
            <DiagramViewer diagram={lab.architecture} />

            <div id="steps" className="mt-8 scroll-mt-24"><LabStepsProgress labSlug={lab.slug} steps={lab.steps} /></div>

            <h2 id="expected-result" className="mb-3 mt-8 scroll-mt-24 text-xl font-bold text-fg">Expected result</h2>
            <Callout variant="best-practice" title="What success looks like" text={lab.expectedResult} />

            <h2 id="lessons-learned" className="mb-3 mt-8 scroll-mt-24 text-xl font-bold text-fg">Lessons learned</h2>
            <div className="space-y-3">
                {lab.lessonsLearned.map((lesson, i) => (
                    <Callout key={i} variant="tip" text={lesson} />
                ))}
            </div>
        </div>
    )
}
