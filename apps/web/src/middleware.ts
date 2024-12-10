import { Resource } from 'sst'

console.info('RESOURCE VALUES', Resource)
process.env.CLERK_PUBLISHABLE_KEY = Resource.ClerkPublishableKey.value
process.env.CLERK_SECRET_KEY = Resource.ClerkSecretKey.value
console.info('Wow wtf man', process.env)

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
    console.info('Wow wtf man', process.env)
    if (isProtectedRoute(req)) {
        try {
            await auth.protect({
                unauthenticatedUrl: `${process.env.WEB_URL}/login`,
            })
        } catch (error) {
            console.error(error)
        }
    }
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
}
