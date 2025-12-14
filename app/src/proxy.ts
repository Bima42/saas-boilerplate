import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith('/dashboard');
    const isAuthRoute = pathname === '/login';

    const sessionCookie =
        request.cookies.get('better-auth.session_token') || request.cookies.get('__Secure-better-auth.session_token');

    if (isProtectedRoute && !sessionCookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (isAuthRoute && sessionCookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files, images, and api routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};
