import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|[\\w-]+\\.\\w+).*)',
  ],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Only run on the homepage
  if (url.pathname === '/') {
    const bucketCookie = req.cookies.get('indn-bucket')
    let bucket = bucketCookie?.value

    // If no bucket, assign one randomly
    if (!bucket) {
      bucket = Math.random() < 0.5 ? 'a' : 'b'
    }

    // Create response
    const res = NextResponse.next()

    // If bucket 'b', rewrite to /home-new
    if (bucket === 'b') {
      url.pathname = '/home-new'
      return NextResponse.rewrite(url)
    }

    // Set cookie if it wasn't present
    if (!bucketCookie) {
      res.cookies.set('indn-bucket', bucket)
    }

    return res
  }
  
  return NextResponse.next()
}
