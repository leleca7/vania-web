// Public runtime configuration for the Vania Work deployment.
// The publishable key is safe to expose to browsers; authorization is enforced by Supabase RLS.
const FALLBACK_SUPABASE_URL = 'https://ghpqnqxjxmdmhikdacoq.supabase.co';
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_6HBOy2srshYvkQ-7ufzzew_LKdspq7M';
const FALLBACK_VANIA_OWNER_ID = '330f13da-5421-4256-ab34-6bbd9a94f062';

export const SUPABASE_URL = process.env.SUPABASE_URL?.trim() || FALLBACK_SUPABASE_URL;
export const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY?.trim() || FALLBACK_SUPABASE_PUBLISHABLE_KEY;
export const VANIA_OWNER_ID = process.env.VANIA_OWNER_ID?.trim() || FALLBACK_VANIA_OWNER_ID;
