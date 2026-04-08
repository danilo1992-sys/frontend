import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const publicPaths = ['/login', '/api/auth']
  const isPublicPath = publicPaths.some(path => context.url.pathname.startsWith(path))
  
  if (!isPublicPath) {
    const response = await fetch(`${context.request.headers.get('origin')}/api/auth/session`, {
      headers: {
        cookie: context.request.headers.get('cookie') || ''
      }
    })
    
    if (!response.ok) {
      return context.redirect('/login')
    }
  }
  
  return next()
})
