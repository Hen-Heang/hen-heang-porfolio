"use client"

import { Download } from "lucide-react"

/**
 * Opens the browser print dialog — choose "Save as PDF" to download.
 * This produces a native, pixel-perfect PDF using the browser's engine.
 * The print: Tailwind variants in each component control the PDF layout.
 */
export function CVDownloadButton() {
  const handleDownload = () => {
    window.print()
  }

  return (
    <button
      onClick={handleDownload}
      className="
        group flex items-center gap-2.5 px-6 py-3 rounded-full
        bg-white text-[#1a365d] text-sm font-bold
        shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100
        hover:bg-[#1a365d] hover:text-white hover:shadow-xl hover:-translate-y-0.5
        active:scale-95 transition-all duration-300 print:hidden
      "
    >
      <div className="w-8 h-8 rounded-full bg-[#1a365d]/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
        <Download size={16} />
      </div>
      <span>Download PDF</span>
    </button>
  )
}
