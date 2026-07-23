"use client"

import { Download } from "lucide-react"

/**
 * Opens the browser print dialog — choose "Save as PDF" to download.
 * This produces a native, pixel-perfect PDF using the browser's engine.
 * The print: Tailwind variants in each component control the PDF layout.
 */
export function CVDownloadButton() {
  return (
    <button
      onClick={() => window.print()}
      title="Opens the browser print dialog"
      className="
        flex items-center gap-2 px-5 py-2.5 rounded-lg
        bg-slate-900 text-white text-sm font-semibold
        hover:bg-slate-800 active:scale-[0.98] transition-all
      "
    >
      <Download size={15} aria-hidden />
      Download Resume
    </button>
  )
}
