import {NextResponse, userAgent} from 'next/server'
import type {NextRequest} from 'next/server'


// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    // if its a bot request, do not proxy
    const ua = userAgent(request);

    if (ua.isBot) {
        return NextResponse.next();
    }


    let url = request.nextUrl.clone()

    // if the path starts with /genuine/static/, use the us-assets.i.posthog.com hostname
    const hostname = url.pathname.startsWith("/genuine/static/") ? 'eu-assets.i.posthog.com' : 'eu.i.posthog.com'
    const requestHeaders = new Headers(request.headers)

    requestHeaders.set('host', hostname)

    url.protocol = 'https'
    url.hostname = hostname
    url.port = "443"
    url.pathname = url.pathname.replace(/^\/genuine/, '');


    return NextResponse.rewrite(url, {
        headers: requestHeaders,
    })

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/genuine/:path*', '/genuine/static/:path*'],
}