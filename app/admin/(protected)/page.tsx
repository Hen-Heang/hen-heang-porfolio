import Link from "next/link"
import { createClient } from "@/src/lib/supabase/server"
import { MessagesInbox } from "@/src/components/admin/MessagesInbox"

const counted = [
    { table: "portfolio_projects", label: "Projects", href: "/admin/projects" },
    { table: "portfolio_skills", label: "Skills", href: "/admin/skills" },
    { table: "portfolio_experience", label: "Experience", href: "/admin/experience" },
    { table: "portfolio_education", label: "Education", href: "/admin/education" },
    { table: "portfolio_achievements", label: "Achievements", href: "/admin/achievements" },
]

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const counts = await Promise.all(
        counted.map(async (c) => {
            const { count } = await supabase
                .from(c.table)
                .select("*", { count: "exact", head: true })
            return { ...c, count: count ?? 0 }
        })
    )

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {counts.map((c) => (
                    <Link
                        key={c.table}
                        href={c.href}
                        className="bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] rounded-xl px-4 py-3 flex flex-col gap-0.5 transition-colors"
                    >
                        <span className="text-[#fafafa] text-xl font-bold">{c.count}</span>
                        <span className="text-[#52525b] text-[10px] font-semibold uppercase tracking-wider">
                            {c.label}
                        </span>
                    </Link>
                ))}
            </div>

            <MessagesInbox />
        </div>
    )
}
