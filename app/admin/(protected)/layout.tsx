import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/src/lib/supabase/server"
import { OWNER_EMAIL } from "@/src/lib/admin/config"
import { SignOutButton } from "@/src/components/admin/SignOutButton"
import { AdminNav } from "@/src/components/admin/AdminNav"

export const metadata = { title: "Admin — Hen Heang", robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== OWNER_EMAIL) {
        redirect("/admin/login")
    }

    return (
        <div className="min-h-screen bg-[#09090b]">
            <header className="border-b border-[#27272a] bg-[#0c0c0e] sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 min-w-0">
                        <Link href="/admin" className="text-[#fafafa] text-sm font-bold shrink-0">
                            Admin
                        </Link>
                        <AdminNav />
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/" className="text-[#71717a] hover:text-[#fafafa] text-xs transition-colors">
                            View site
                        </Link>
                        <SignOutButton />
                    </div>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">{children}</main>
        </div>
    )
}
