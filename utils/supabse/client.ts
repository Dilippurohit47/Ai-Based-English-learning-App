import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABSE_PROJECTURL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABSE_API_KEY
export const supabase = createClient(supabaseUrl!, supabaseKey!)