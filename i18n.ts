import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'ko']
const defaultLocale = 'en'

export default getRequestConfig(async ({ locale }) => {
  // Validate locale parameter and use default if invalid
  const validLocale = locale && locales.includes(locale as string) ? locale as string : defaultLocale
  
  console.log(`🌐 i18n: Using locale: ${validLocale} (requested: ${locale})`)

  try {
    // Explicitly load the messages for the valid locale
    const messages = (await import(`./src/lib/i18n/translations/${validLocale}.json`)).default
    console.log(`✅ i18n: Successfully loaded ${validLocale} translations`)
    
    return {
      messages,
      locale: validLocale
    }
  } catch (error) {
    console.error(`❌ i18n: Failed to load messages for locale: ${validLocale}`, error)
    
    // Fallback to default locale messages
    try {
      const fallbackMessages = (await import(`./src/lib/i18n/translations/${defaultLocale}.json`)).default
      console.log(`🔄 i18n: Using fallback locale: ${defaultLocale}`)
      
      return {
        messages: fallbackMessages,
        locale: validLocale
      }
    } catch (fallbackError) {
      console.error(`💥 i18n: Critical error - cannot load any translations:`, fallbackError)
      throw fallbackError
    }
  }
})
