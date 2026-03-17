"use client"

import Link from "next/link"

export function MoneyFlowCard() {
    return (
        <Link
            href="https://money-flow-sigma-black.vercel.app/"
            target="_blank"
            className="group col-span-4 md:col-span-4 lg:col-span-3 bg-gradient-to-br from-[#14171a] to-[#1c2127] rounded-2xl overflow-hidden border border-[#2a2f36] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-5 flex flex-col justify-between"
        >
            {/* Top: badge + dots */}
            <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 text-[10px] font-bold bg-green-500/15 text-green-400 border border-green-500/25 rounded-full animate-pulse">
                    ● LIVE
                </span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                </div>
            </div>

            {/* Mini chart visual */}
            <div className="flex items-end gap-1 mb-5 h-14 px-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-300 group-hover:opacity-90"
                        style={{
                            height: `${h}%`,
                            backgroundColor: i === 5 ? "#22c55e" : "#22c55e30",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-1">Money Flow</h3>
                <p className="text-gray-500 text-sm">Personal finance tracker</p>
            </div>
        </Link>
    )
}
