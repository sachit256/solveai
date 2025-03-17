// Follow CORS best practices for Edge Functions
// https://supabase.com/docs/guides/functions/cors

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

// Handle CORS preflight requests
export function handleCors(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
}

// Add CORS headers to your Response
export function addCorsHeaders(response: Response) {
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}