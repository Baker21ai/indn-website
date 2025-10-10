import { auth } from '@/auth.config'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const user = req.auth?.user

  // Public routes - allow all
  const publicRoutes = ['/', '/donate', '/donor-wall', '/about', '/events']
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/donations') || pathname.startsWith('/api/webhooks')) {
    return NextResponse.next()
  }

  // Auth routes - redirect if already logged in
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (user) {
      // Redirect based on role
      if (user.role === 'admin') {
        return NextResponse.redirect(new URL('/portal/admin/dashboard', req.url))
      } else if (user.role === 'board_member') {
        return NextResponse.redirect(new URL('/portal/board/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/portal/volunteer/dashboard', req.url))
      }
    }
    return NextResponse.next()
  }

  // Protected portal routes - require authentication
  if (pathname.startsWith('/portal')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Redirect /portal to appropriate dashboard based on role
    if (pathname === '/portal' || pathname === '/portal/') {
      if (user.role === 'admin') {
        return NextResponse.redirect(new URL('/portal/admin/dashboard', req.url))
      } else if (user.role === 'board_member') {
        return NextResponse.redirect(new URL('/portal/board/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/portal/volunteer/dashboard', req.url))
      }
    }

    // Role-based access control
    if (pathname.startsWith('/portal/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/portal/unauthorized', req.url))
    }

    if (
      pathname.startsWith('/portal/board') &&
      user.role !== 'admin' &&
      user.role !== 'board_member'
    ) {
      return NextResponse.redirect(new URL('/portal/unauthorized', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
