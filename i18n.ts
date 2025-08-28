import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales, type Locale } from './src/lib/i18n/config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`./src/lib/i18n/translations/${locale}.json`)).default,
    locale: locale as string
  }
})
