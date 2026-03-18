"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/src/components/ui/card"
import { CheckCircle, XCircle, Loader2, Play, RefreshCw } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

interface TestResult {
    status: Status
    data?: Record<string, string>
    error?: string
    duration?: number
}

export default function ApiTestPage() {
    const [result, setResult] = useState<TestResult>({ status: "idle" })

    async function runTest() {
        setResult({ status: "loading" })
        const start = Date.now()
        try {
            const res = await fetch("/api/ping")
            const duration = Date.now() - start
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
            const data = await res.json()
            setResult({ status: "success", data, duration })
        } catch (err) {
            setResult({ status: "error", error: (err as Error).message, duration: Date.now() - start })
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            API Connection Test
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            Tests connection to your Spring Boot backend
                        </p>
                    </div>

                    <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                        {/* Endpoint info */}
                        <div className="mb-6 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">Endpoint</p>
                            <code className="text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                                GET /api/ping → localhost:8080
                            </code>
                        </div>

                        {/* Result area */}
                        <div className="mb-6 min-h-[120px] rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-center">
                            {result.status === "idle" && (
                                <p className="text-zinc-400 dark:text-zinc-500 text-sm">
                                    Click &quot;Run Test&quot; to ping your backend
                                </p>
                            )}

                            {result.status === "loading" && (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="animate-spin text-zinc-400" size={28} />
                                    <p className="text-zinc-400 text-sm">Connecting...</p>
                                </div>
                            )}

                            {result.status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle className="text-emerald-500" size={20} />
                                        <span className="text-emerald-500 font-semibold text-sm">Connected</span>
                                        <span className="ml-auto text-xs text-zinc-400">{result.duration}ms</span>
                                    </div>
                                    <pre className="text-xs bg-zinc-50 dark:bg-zinc-800 rounded p-3 text-zinc-700 dark:text-zinc-300 overflow-auto">
                                        {JSON.stringify(result.data, null, 2)}
                                    </pre>
                                </motion.div>
                            )}

                            {result.status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <XCircle className="text-red-500" size={20} />
                                        <span className="text-red-500 font-semibold text-sm">Failed</span>
                                        <span className="ml-auto text-xs text-zinc-400">{result.duration}ms</span>
                                    </div>
                                    <p className="text-xs bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded p-3 text-red-600 dark:text-red-400 font-mono">
                                        {result.error}
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-2">
                                        Make sure Spring Boot is running on port 8080
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            onClick={runTest}
                            disabled={result.status === "loading"}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {result.status === "loading" ? (
                                <><Loader2 size={16} className="animate-spin" /> Running...</>
                            ) : result.status === "idle" ? (
                                <><Play size={16} /> Run Test</>
                            ) : (
                                <><RefreshCw size={16} /> Run Again</>
                            )}
                        </button>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
