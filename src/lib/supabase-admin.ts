import "server-only"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _adminClient: SupabaseClient | null = null

export function getSupabaseAdminClient(): SupabaseClient | null {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return null
    if (!_adminClient) _adminClient = createClient(url, key)
    return _adminClient
}
