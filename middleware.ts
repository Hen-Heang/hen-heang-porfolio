import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ko'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always show the locale prefix
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
