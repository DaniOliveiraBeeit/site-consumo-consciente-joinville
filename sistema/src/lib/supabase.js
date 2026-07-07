import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pulrmxujahsyvoxegqfe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHJteHVqYWhzeXZveGVncWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDY5MTQsImV4cCI6MjA5ODk4MjkxNH0.3mEAJSSi-6t_GW9_4k9yhD475ePWMBz_sl9HkahBmZY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
