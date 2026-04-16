import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-supabase-key";

// Use service role key since we're using this mostly in API routes under Admin guard
// For clientside usage, use NEXT_PUBLIC_SUPABASE_ANON_KEY 
export const supabase = createClient(supabaseUrl, supabaseKey);
