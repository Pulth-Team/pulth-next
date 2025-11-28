import {NextResponse, userAgent} from 'next/server'
import type {NextRequest} from 'next/server'


// This function can be marked `async` if using `await` inside
export function proxy_old(request: NextRequest) {

    const ua = userAgent(request);

    if (ua.isBot) {
        console.log("BOT DETECTED, SKIP");
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();

    const isStatic = url.pathname.startsWith("/genuine/static/");
    const targetHost = isStatic
        ? "eu-assets.i.posthog.com"
        : "eu.i.posthog.com";

    // Remove /genuine prefix
    const originalPath = url.pathname;
    url.pathname = originalPath.replace(/^\/genuine/, "");

    url.hostname = targetHost;
    url.protocol = "https";

    const finalUrl = url.toString();

    // console.log("PROXY →", originalPath, "→", finalUrl);

    const res = NextResponse.next();
    res.headers.set("x-middleware-rewrite", finalUrl);
    res.headers.set("host", targetHost);

    return res;

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/genuine/:path*', '/genuine/static/:path*'],
}