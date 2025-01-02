import { NextResponse } from 'next/server'
import { checkIsLoggedInUser } from './helpers/checkLoggedInUser';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path === '/verifyemail';

    const token = request.cookies.get("token")?.value || '';
    
    // const stripePaymentLink = request.cookies.get("stripePaymentLink")?.value;
    // console.log(stripePaymentLink, 'stripePaymentLink in middleware');

    // if(stripePaymentLink && token){
    //     response.cookies.set('stripePaymentLink', '', {
    //         path: '/', // Match the original path of the cookie
    //         expires: new Date(0), // Set expiration to a past date
    //     });
    //     return NextResponse.redirect(new URL(stripePaymentLink, request.url))  
    // }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))   
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