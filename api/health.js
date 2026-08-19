import { json } from './_lib/http.js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, VANIA_OWNER_ID } from './_lib/config.js';

export default async function handler(req, res) {
  const checks = {
    database: Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY),
    ownerAccess: Boolean(VANIA_OWNER_ID),
    ai: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)
  };

  const missing = [];
  if (!checks.ai) missing.push('AI_GATEWAY_API_KEY ou VERCEL_OIDC_TOKEN');

  json(res, 200, {
    ok: checks.database && checks.ownerAccess && checks.ai,
    checks,
    missing,
    backendMode: 'shared-supabase',
    monitorMode: 'login-and-manual'
  });
}
