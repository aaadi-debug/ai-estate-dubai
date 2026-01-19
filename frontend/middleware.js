// frontend/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const plan = request.cookies.get('plan')?.value || 'none'

  const pathname = request.nextUrl.pathname

  console.log('[MIDDLEWARE] Current path:', pathname)
  console.log('[MIDDLEWARE] Token exists:', !!token)
  console.log('[MIDDLEWARE] Plan:', plan)

  const publicRoutes = ['/login', '/signup', '/']
  const buyPlanRoute = '/agent-registration/buy-plan'

  // Allow logout request to pass
if (pathname === '/auth/logout') {
  return NextResponse.next();
}


  // 1. Not logged in
  if (!token) {
    console.log('[MIDDLEWARE] No token → checking if public route')
    if (publicRoutes.includes(pathname)) {
      console.log('[MIDDLEWARE] Public route → allow')
      return NextResponse.next()
    }
    console.log('[MIDDLEWARE] No token + protected → redirect to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. Logged in → redirect away from public routes
  // if (publicRoutes.includes(pathname)) {
  if (pathname === '/login' || pathname === '/signup') {
    const redirectPath = plan !== 'none' ? '/agent/dashboard' : buyPlanRoute
    console.log(`[MIDDLEWARE] Logged in + public route → redirect to ${redirectPath}`)
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  // 3. Buy-plan route
  if (pathname === buyPlanRoute) {
    console.log('[MIDDLEWARE] Buy-plan route → allow (even without plan)')
    return NextResponse.next()
  }

  // 4. Dashboard protection
  if (pathname.startsWith('/agent/dashboard') && plan === 'none') {
    console.log('[MIDDLEWARE] Dashboard access + no plan → force to buy-plan')
    return NextResponse.redirect(new URL(buyPlanRoute, request.url))
  }

  // 5. All good (including home page)
  console.log('[MIDDLEWARE] All checks passed → allow access')
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/',
    '/agent/dashboard/:path*',
    '/agent-registration/buy-plan'
  ]
}