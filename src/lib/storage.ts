import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadImage(
  file: File,
  bucket: 'event-photos' | 'donor-logos'
): Promise<string> {
  const timestamp = Date.now()
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${timestamp}-${sanitizedName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename)

  return publicUrl
}

export async function deleteImage(url: string, bucket: string) {
  const filename = url.split('/').pop()
  if (!filename) return

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filename])

  if (error) throw error
}
