'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  bucket?: 'event-photos' | 'donor-logos'
}

export function ImageUpload({ onUploadComplete, bucket = 'event-photos' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload to API
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const { url } = await response.json()
      onUploadComplete(url)
      setPreview(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function clearPreview() {
    setPreview(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </label>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
