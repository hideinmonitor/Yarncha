export default function handler(_request, response) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabasePublishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({
    configured: Boolean(supabaseUrl && supabasePublishableKey),
    supabaseUrl,
    supabasePublishableKey
  });
}
