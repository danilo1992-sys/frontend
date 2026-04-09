import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtected = createRouteMatcher(['/','/calendario', '/eventos/*', '/nuevo-evento'])

export const onRequest = clerkMiddleware((auth, context)=>{
    const {userId, redirectToSignIn} = auth()

    if (isProtected(context.request) && !userId) {
        return redirectToSignIn()
    }
})