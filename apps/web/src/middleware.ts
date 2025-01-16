import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
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
        '/((?!monitoring).*)$',
    ],
}
