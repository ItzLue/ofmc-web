import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://nieywsfncwvekqshezwl.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? 'AIzaSyA88GH5Cfc5HEi4uwvDCa2aiRUX2B8'

export const supabase = createClient(supabaseUrl, supabaseKey)
