"use client"

import Image from "next/image"
import Link from "next/link"

export function DevNotesCard() {
    return (
        <Link
            href="https://dev-learning-notes.vercel.app/"
            target="_blank"
            className="group col-span-4 md:col-span-4 lg:col-span-5 bg-gradient-to-br from-[#0c0a09] to-[#1a1816] rounded-2xl overflow-hidden border border-[#292524] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Screenshot */}
            <div className="relative h-[120px] overflow-hidden">
                <Image
                    src="/screenshots/devnotes-screenshot.svg"
                    alt="Dev Notes Preview"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />

                {/* Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-lime-500/20 text-lime-400 rounded-md animate-pulse">
                    ● LIVE
                </span>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="font-mono text-sm text-stone-500 mb-1">&gt;_ dev-notes</p>
                <h3 className="text-lg font-semibold text-stone-50 mb-1">Dev Learning Notes</h3>
                <p className="text-stone-500 text-sm mb-3">10 modules • Korean enterprise stack</p>

                <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 text-xs bg-lime-500/10 text-lime-400 rounded">Spring Boot</span>
                    <span className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded">MyBatis</span>
                    <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">JSP</span>
                </div>
            </div>
        </Link>
    )
}
