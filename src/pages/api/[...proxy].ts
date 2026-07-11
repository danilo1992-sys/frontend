import type { APIRoute } from 'astro';

const BACKEND = 'https://backend-he9t.onrender.com';

export const ALL: APIRoute = async ({ request, params }) => {
  const path = params.proxy || '';
  const url = new URL(request.url);

  const backendUrl = `${BACKEND}/${path}${url.search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'host') {
      headers.set(key, value);
    }
  });

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(backendUrl, init);

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (!['transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};
