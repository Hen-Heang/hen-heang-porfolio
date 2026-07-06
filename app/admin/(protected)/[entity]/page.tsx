import { notFound } from "next/navigation"
import { entities } from "@/src/lib/admin/entities"
import { EntityEditor } from "@/src/components/admin/EntityEditor"

export default async function AdminEntityPage({
    params,
}: {
    params: Promise<{ entity: string }>
}) {
    const { entity } = await params
    const config = entities[entity]

    // skill_categories is managed on the skills page, not standalone
    if (!config || entity === "skill_categories") notFound()

    if (entity === "skills") {
        return (
            <div className="space-y-6">
                <EntityEditor config={entities.skills} />
                <EntityEditor config={entities.skill_categories} />
            </div>
        )
    }

    return <EntityEditor config={config} />
}
