import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    if (!_client) _client = createClient(url, key)
    return _client
}

// Keep backward-compat export — returns null when env vars are absent (e.g. during SSG)
export const supabase = typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'string'
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : null
