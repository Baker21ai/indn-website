'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

export default function UploadDocumentPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    category: 'other',
    accessLevel: 'board',
  })

  useEffect(() => {
    document.title = 'Upload Document - INDN'
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    if (!selectedFile) {
      setError('Please select a file to upload')
      setIsSubmitting(false)
      return
    }

    if (!formData.title) {
      setError('Please enter a document title')
      setIsSubmitting(false)
      return
    }

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', selectedFile)
      uploadFormData.append('title', formData.title)
      uploadFormData.append('category', formData.category)
      uploadFormData.append('accessLevel', formData.accessLevel)

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to upload document')
        return
      }

      setSuccessMessage('Document uploaded successfully!')

      // Reset form
      setFormData({
        title: '',
        category: 'other',
        accessLevel: 'board',
      })
      setSelectedFile(null)

      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/portal/board/documents')
      }, 2000)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Upload Document
          </h1>
          <p className="text-stone-gray">
            Upload a new document for board members
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter document title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="runbook">Runbook</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="vendor_contacts">Vendor Contacts</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accessLevel">Access Level *</Label>
                <Select
                  value={formData.accessLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, accessLevel: value })
                  }
                >
                  <SelectTrigger id="accessLevel">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="volunteer">Volunteers</SelectItem>
                    <SelectItem value="board">Board Members</SelectItem>
                    {session?.user?.role === 'admin' && (
                      <SelectItem value="admin">Admin Only</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Who can access this document
                </p>
              </div>

              <div>
                <Label htmlFor="file-input">File *</Label>
                <Input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Accepted formats: PDF, Word, Excel, Text, CSV (Max 10MB)
                </p>
                {selectedFile && (
                  <p className="text-sm text-sage-green mt-2">
                    Selected: {selectedFile.name} (
                    {(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {successMessage}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                  className="bg-terracotta hover:bg-terracotta/90"
                >
                  {isSubmitting ? 'Uploading...' : 'Upload Document'}
                </Button>
                <Link href="/portal/board/documents">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
