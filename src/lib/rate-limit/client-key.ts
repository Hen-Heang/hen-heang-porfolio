import "server-only"

function keyFromHeaderLookup(get: (name: string) => string | null): string {
    const forwarded = get("x-forwarded-for")
    return forwarded?.split(",")[0]?.trim() || get("x-real-ip") || "anonymous"
}

export function clientKeyFromRequest(req: Request): string {
    return keyFromHeaderLookup((name) => req.headers.get(name))
}

/** For Server Actions, which read the incoming request's headers via `next/headers`. */
export function clientKeyFromHeaders(headers: Headers): string {
    return keyFromHeaderLookup((name) => headers.get(name))
}
