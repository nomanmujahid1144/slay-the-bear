import { NextResponse } from 'next/server'
import { decodeJWT } from './utils/decodeToken';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path === '/verifyemail';
    const isPremiumPath = path === '/premium-tools/stock-analyzer';

    const token = request.cookies.get("token")?.value || '';
    const tokenData = decodeJWT(token);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (isPremiumPath && token && tokenData) {
        console.log('Premium Path')
        if (tokenData?.role === 'premium') {
            console.log('Its Premium User')
            return NextResponse.next();
        } else {
            console.log('Its free User')
            return NextResponse.redirect(new URL('/auth/callback', request.url))
        }
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/register',
        '/verifyemail',
        '/profile/:path*',
        '/premium-tools/stock-analyzer',
    ]
}