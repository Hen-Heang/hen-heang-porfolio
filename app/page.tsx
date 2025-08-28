import { redirect } from 'next/navigation'
import { defaultLocale } from '@/src/lib/i18n/config'

export default async function RootPage() {
  redirect(`/${defaultLocale}`)
}
