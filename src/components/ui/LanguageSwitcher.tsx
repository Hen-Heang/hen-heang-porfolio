"use client"

import { useState, useEffect } from "react"
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "./button"
import { Globe, ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ]

  const currentLanguage = languages.find(lang => lang.code === locale)

  const changeLanguage = (newLocale: string) => {
    if (!mounted) return
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/(en|ko)/, '') || '/'
    // Always include locale prefix since middleware is configured with localePrefix: 'always'
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 px-3 py-2"
        disabled
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">Loading...</span>
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  locale === language.code
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
