import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export const uploadFile = async (
  bucket: string,
  file: File,
  path: string
): Promise<{ url: string | null; error: string | null }> => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) return { url: null, error: error.message }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: publicUrlData.publicUrl, error: null }
}

export const deleteFile = async (bucket: string, path: string): Promise<{ error: string | null }> => {
  const { error } = await supabase.storage.from(bucket).remove([path])
  return { error: error?.message || null }
}
