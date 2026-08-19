import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, VANIA_OWNER_ID } from './config.js';

export function userClient(req) {
  const auth = req.headers.authorization || '';
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: auth ? { Authorization: auth } : {} },
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function requireUser(req) {
  const supabase = userClient(req);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    const e = new Error('Não autenticado.');
    e.status = 401;
    throw e;
  }
  if (data.user.id !== VANIA_OWNER_ID) {
    const e = new Error('Esta conta não tem acesso ao Vania Work.');
    e.status = 403;
    throw e;
  }
  return { supabase, user: data.user };
}
