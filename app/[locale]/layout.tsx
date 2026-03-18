import type React from "react"
import localFont from "next/font/local"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import "../globals.css"

const inter = localFont({
    src: [
        { path: "../../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-inter",
    display: "swap",
    fallback: ["system-ui", "-apple-system", "sans-serif"],
})

export const metadata = {
  title: "HenHeang - Portfolio",
  description: "Frontend developer portfolio showcasing projects and skills",
}

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
