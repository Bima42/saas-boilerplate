import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/config/env';
import { LOGGED_HOME_PATH } from '@/config/config';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/auth/get-session`, {
        headers: {
            cookie: request.headers.get('cookie') || ''
        }
    });
    const session = await response.json();

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.role === 'admin';

    // Define route types
    const isAdminRoute = pathname.includes('/admin');
    const isAuthRoute = pathname === '/login';
    const needAuthRoute = pathname === LOGGED_HOME_PATH;

    const cannotAccessAdmin = isAdminRoute && !isAdmin;
    if (cannotAccessAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('error', 'unauthorized_admin');
        return NextResponse.redirect(url);
    }

    const alreadyAuthenticated = isAuthRoute && isLoggedIn;
    if (alreadyAuthenticated) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const needAuthButNotLoggedIn = needAuthRoute && !isLoggedIn;
    if (needAuthButNotLoggedIn) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
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
