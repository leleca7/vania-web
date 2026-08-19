import { json } from './_lib/http.js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './_lib/config.js';

export default async function handler(req, res) {
  json(res, 200, {
    configured: Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY),
    supabaseUrl: SUPABASE_URL,
    supabasePublishableKey: SUPABASE_PUBLISHABLE_KEY,
    aiConfigured: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    model: process.env.AI_MODEL || 'openai/gpt-5.6-sol',
    backendMode: 'shared-supabase'
  });
}
