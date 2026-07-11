import type { APIRoute } from 'astro';

const PDF_API = 'https://backend-he9t.onrender.com';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.arrayBuffer();

  const response = await fetch(`${PDF_API}/generate-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

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
