import { NextResponse } from 'next/server'

export function middleware() {
  // Allow all requests to pass through without locale handling
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Disable middleware for now
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
