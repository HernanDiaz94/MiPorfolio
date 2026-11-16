import { createClient } from '@supabase/supabase-js'

// Las credenciales se cargan desde variables de entorno (archivo .env en local
// y variables de entorno del sitio en Netlify). Ver .env.example.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si aún no configuraste Supabase, el sitio funciona con el contenido local
// de src/content.js en lugar de romperse en tiempo de ejecución.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null
