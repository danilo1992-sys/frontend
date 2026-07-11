import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'
import type { APIContext, MiddlewareNext } from 'astro'

const isProtected = createRouteMatcher(['/calendario', '/eventos/*', '/nuevo-evento'])

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function handleCors(context: APIContext): Response | null {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }
  return null
}

function addCorsHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response)
  for (const [key, value] of Object.entries(corsHeaders)) {
    newResponse.headers.set(key, value)
  }
  return newResponse
}

const clerk = clerkMiddleware((auth, context)=>{
    const {userId, redirectToSignIn} = auth()

    if (isProtected(context.request) && !userId) {
        return redirectToSignIn()
    }
})

export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
  const corsResponse = handleCors(context)
  if (corsResponse) return corsResponse

  const response = await clerk(context, next)
  if (response instanceof Response) {
    return addCorsHeaders(response)
  }
  return response
}