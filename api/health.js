import { json } from './_lib/http.js';

export default async function handler(req, res) {
  const checks = {
    database: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY),
    admin: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    ai: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    cron: Boolean(process.env.CRON_SECRET)
  };

  const missing = [];
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_PUBLISHABLE_KEY) missing.push('SUPABASE_PUBLISHABLE_KEY');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!checks.ai) missing.push('AI_GATEWAY_API_KEY ou VERCEL_OIDC_TOKEN');
  if (!process.env.CRON_SECRET) missing.push('CRON_SECRET');

  json(res, 200, {
    ok: Object.values(checks).every(Boolean),
    checks,
    missing
  });
}
