import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://aynaoqiunptocrnkkngt.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'sb_publishable_sScfJVgrikaGiBbs3XEpQg_-L4X1PJT'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserLoginRow = {
  id: number
  username: string
  password: string
  created_at: string
}
