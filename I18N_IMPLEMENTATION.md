# Internationalization (i18n) Implementation

This document describes the internationalization setup for the Hen Heang portfolio project, supporting English and Korean languages.

## Overview

The project uses **next-intl** for internationalization, providing:
- Route-based locale switching (`/en`, `/ko`)
- Translation management with JSON files
- Language switcher component
- Automatic locale detection

## File Structure

```
├── i18n.ts                          # Next-intl configuration
├── middleware.ts                    # Locale routing middleware
├── app/
│   ├── layout.tsx                   # Root layout
│   └── [locale]/
│       ├── layout.tsx               # Locale-specific layout
│       └── page.tsx                 # Main page with translations
├── src/
│   ├── lib/
│   │   └── i18n/
│   │       ├── config.ts            # Locale configuration
│   │       └── translations/
│   │           ├── en.json          # English translations
│   │           └── ko.json          # Korean translations
│   └── components/
│       └── ui/
│           └── LanguageSwitcher.tsx # Language switcher component
└── data/
    ├── achievements.ts              # Updated with translation keys
    └── navigation.tsx               # Updated with translation keys
```

## Configuration

### 1. Next.js Configuration (`next.config.js`)
```javascript
const withNextIntl = require('next-intl/plugin')()

const nextConfig = {
  // Your existing config
}

module.exports = withNextIntl(nextConfig)
```

### 2. i18n Configuration (`i18n.ts`)
```typescript
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'ko']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./src/lib/i18n/translations/${locale}.json`)).default
  }
})
```

### 3. Middleware (`middleware.ts`)

```typescript
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/lib/i18n/config'

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(ko|en)/:path*']
}
```

## Translation Files

### English (`src/lib/i18n/translations/en.json`)

```json
{
  "common": {
    "view": "View",
    "close": "Close",
    "details": "Details",
    "certificate": "Certificate",
    "graduation": "Graduation",
    "award": "Award"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "skills": "Skills",
    "achievements": "Achievements",
    "education": "Education",
    "contact": "Contact"
  },
  "achievements": {
    "title": "Achievements & Certificates",
    "badge": "Achievements",
    "description": "My academic and professional accomplishments"
  },
  "hero": {
    "title": "Frontend Developer",
    "subtitle": "Creating beautiful and functional web experiences",
    "description": "Passionate about building modern web applications"
  }
}
```

### Korean (`src/lib/i18n/translations/ko.json`)
```json
{
  "common": {
    "view": "보기",
    "close": "닫기",
    "details": "상세정보",
    "certificate": "자격증",
    "graduation": "졸업",
    "award": "수상"
  },
  "navigation": {
    "home": "홈",
    "about": "소개",
    "projects": "프로젝트",
    "skills": "기술",
    "achievements": "성과",
    "education": "학력",
    "contact": "연락처"
  },
  "achievements": {
    "title": "성과 및 자격증",
    "badge": "성과",
    "description": "학업 및 전문 분야에서의 성취"
  },
  "hero": {
    "title": "프론트엔드 개발자",
    "subtitle": "아름답고 기능적인 웹 경험을 만듭니다",
    "description": "최신 기술을 활용한 현대적인 웹 애플리케이션 구축에 열정을 가지고 있습니다"
  }
}
```

## Usage in Components

### Using Translations
```typescript
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations()
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  )
}
```

### Language Switcher
```typescript
import { useLocale, useRouter } from 'next-intl'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  
  const changeLanguage = (newLocale: string) => {
    router.push('/', { locale: newLocale })
  }
  
  return (
    <button onClick={() => changeLanguage('ko')}>
      한국어
    </button>
  )
}
```

## Data Structure Updates

### Achievements Data
Updated to use translation keys instead of hardcoded text:

```typescript
export interface Achievement {
  id: string
  titleKey: string        // Translation key for title
  descriptionKey?: string // Translation key for description
  issuer: string
  date: string
  type: 'certificate' | 'graduation' | 'award'
  image?: string
  link?: string
}

export const rawAchievements: Achievement[] = [
  {
    id: "1",
    titleKey: "achievements.bachelorsDegree",
    descriptionKey: "achievements.bachelorsDescription",
    issuer: "University Name",
    date: "2023",
    type: "graduation",
    image: "/graduate-image.jpg",
  }
]
```

### Navigation Data
Updated to support translation keys:

```typescript
export interface NavItem {
  id: string
  label?: string
  labelKey?: string  // Translation key for label
  icon: ReactNode
}

export const navItems: NavItem[] = [
  { 
    id: "home", 
    labelKey: "navigation.home", 
    icon: <Code size={18} /> 
  }
]
```

## Features

### ✅ Implemented
- [x] Route-based locale switching (`/en`, `/ko`)
- [x] Translation files for English and Korean
- [x] Language switcher component
- [x] Updated data structures with translation keys
- [x] Achievements section with translations
- [x] Navigation with translations
- [x] Hero section with translations
- [x] Automatic locale detection
- [x] SEO-friendly URLs with locale prefixes

### 🔄 In Progress
- [ ] Contact form translations
- [ ] Skills section translations
- [ ] Education section translations
- [ ] Projects section translations
- [ ] About section translations

### 📋 To Do
- [ ] Add more translation keys for remaining sections
- [ ] Implement dynamic content loading based on locale
- [ ] Add locale-specific metadata
- [ ] Implement locale-specific date formatting
- [ ] Add RTL support for future languages

## Testing

### Manual Testing
1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000` (should redirect to `/en`)
3. Visit `http://localhost:3000/ko` (Korean version)
4. Use the language switcher to change languages
5. Verify all text content changes appropriately

### URL Structure
- English: `http://localhost:3000/en`
- Korean: `http://localhost:3000/ko`
- Default redirect: `http://localhost:3000` → `/en`

## Best Practices

1. **Translation Keys**: Use descriptive, hierarchical keys (e.g., `achievements.title`)
2. **Formal Language**: Korean translations use formal, standard language (존댓말)
3. **Consistency**: Maintain consistent terminology across translations
4. **Context**: Provide context for translators in comments when needed
5. **Fallbacks**: Always provide fallback text for missing translations

## Adding New Languages

To add a new language (e.g., Japanese):

1. Add locale to `src/lib/i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'ko', 'ja'] as const
   ```

2. Create translation file `src/lib/i18n/translations/ja.json`

3. Update `i18n.ts` to include the new locale

4. Add language option to `LanguageSwitcher.tsx`

## Troubleshooting

### Common Issues
1. **404 on locale routes**: Check middleware configuration
2. **Missing translations**: Verify translation keys exist in JSON files
3. **Build errors**: Ensure all translation files are properly formatted JSON
4. **Language switcher not working**: Check router configuration

### Debug Tips
- Use browser dev tools to check network requests
- Verify translation keys in component console logs
- Check middleware logs for routing issues
