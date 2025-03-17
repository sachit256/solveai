import { createClient } from '@supabase/supabase-js';

// Provide default values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Validate environment variables
if (!supabaseUrl.startsWith('http')) {
  console.warn('Invalid VITE_SUPABASE_URL format. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);