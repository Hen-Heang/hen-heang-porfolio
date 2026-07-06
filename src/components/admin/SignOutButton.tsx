"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { createClient } from "@/src/lib/supabase/client"

export function SignOutButton() {
    const router = useRouter()

    async function handleSignOut() {
        await createClient().auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-[#71717a] hover:text-[#fafafa] text-xs transition-colors"
        >
            <LogOut size={12} />
            Sign out
        </button>
    )
}
