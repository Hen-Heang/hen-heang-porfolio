"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Loader2, ArrowLeft } from "lucide-react"
import { createClient } from "@/src/lib/supabase/client"
import { OWNER_EMAIL } from "@/src/lib/admin/config"

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const supabase = createClient()
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        })

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
            return
        }

        if (data.user?.email !== OWNER_EMAIL) {
            // Signed in, but not the owner — the database would reject every
            // write anyway, so don't let them into the admin UI at all.
            await supabase.auth.signOut()
            setError("This account does not have admin access.")
            setLoading(false)
            return
        }

        router.push("/admin")
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 flex items-center justify-center">
                            <Lock size={16} className="text-[#6366f1]" />
                        </div>
                        <div>
                            <h1 className="text-[#fafafa] text-lg font-semibold leading-tight">Admin</h1>
                            <p className="text-[#71717a] text-xs">Owner sign in</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-[#a1a1aa] text-xs font-medium mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-sm text-[#fafafa] placeholder-[#3f3f46] outline-none focus:border-[#6366f1] transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-[#a1a1aa] text-xs font-medium mb-1.5">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-sm text-[#fafafa] placeholder-[#3f3f46] outline-none focus:border-[#6366f1] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6366f1] hover:bg-[#5558e6] disabled:opacity-50 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            Sign in
                        </button>
                    </form>
                </div>

                <Link
                    href="/"
                    className="mt-4 flex items-center justify-center gap-1.5 text-[#52525b] hover:text-[#a1a1aa] text-xs transition-colors"
                >
                    <ArrowLeft size={12} />
                    Back to site
                </Link>
            </div>
        </div>
    )
}
