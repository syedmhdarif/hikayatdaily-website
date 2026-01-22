// Supabase Configuration
// This file loads environment variables for the Supabase client
// For production, these values should be injected during build/deployment

const SupabaseConfig = {
  url: window.ENV?.SUPABASE_URL || '',
  anonKey: window.ENV?.SUPABASE_ANON_KEY || ''
};

// Validate configuration
if (!SupabaseConfig.url || !SupabaseConfig.anonKey) {
  console.error('Supabase configuration is missing. Please check your environment variables.');
}

// Export for use in other scripts
window.SupabaseConfig = SupabaseConfig;
