import {initBotId} from 'botid/client/core';
import posthog from 'posthog-js'


initBotId({
    protect: [
        {
            method: "POST", path: "/genuine/*"
        },
        {
            method: "GET", path: "/genuine/static/*"
        }
    ],
});

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    // api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    api_host: "/genuine",
    defaults: '2025-05-24',
    capture_exceptions: true, // Enables capturing exceptions using Error Tracking
    // debug: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',

});

console.log(process.env.NODE_ENV)