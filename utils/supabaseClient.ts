import { createClient } from '@supabase/supabase-js';

// ✅ I have added your Project URL from the screenshot:
const supabaseUrl = 'https://rhxxzvhemrzxvndolajg.supabase.co';

// ✅ Added your Anon Public Key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeHh6dmhlbXJ6eHZuZG9sYWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjM5NjIsImV4cCI6MjA4MjAzOTk2Mn0.zY4NLNY7dIgaI9omKHX5QGCQwWE17GiGazYLL-T6YrE';

// Check if the user has replaced the placeholder key
const isConfigured = 
  (supabaseAnonKey as string) !== 'YOUR_SUPABASE_ANON_KEY' &&
  (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

export const isSupabaseConfigured = isConfigured;

// If configured, create the real client. 
// If not, create a dummy client to prevent 'Invalid URL' crash on app load.
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');