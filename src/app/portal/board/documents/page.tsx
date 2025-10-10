'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

interface Document {
  id: string
  title: string
  category: string
  fileUrl: string
  accessLevel: string
  fileSize: number | null
  mimeType: string | null
  downloadCount: number
  createdAt: string
  uploadedBy: {
    name: string
    email: string
  }
}

export default function BoardDocumentsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    document.title = 'Documents - INDN'
    fetchDocuments()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchQuery, categoryFilter])

  async function fetchDocuments() {
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter)
      }

      const response = await fetch(`/api/documents?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.documents)
      } else {
        setError('Failed to load documents')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function filterDocuments() {
    let filtered = [...documents]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.category.toLowerCase().includes(query) ||
          doc.uploadedBy.name.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((doc) => doc.category === categoryFilter)
    }

    setFilteredDocuments(filtered)
  }

  function formatFileSize(bytes: number | null) {
    if (!bytes) return 'Unknown size'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    const mb = kb / 1024
    return `${mb.toFixed(1)} MB`
  }

  function getCategoryBadgeColor(category: string) {
    switch (category) {
      case 'runbook':
        return 'bg-terracotta text-white'
      case 'checklist':
        return 'bg-sage-green text-white'
      case 'budget':
        return 'bg-warm-earth text-white'
      case 'vendor_contacts':
        return 'bg-sky-blue text-white'
      case 'template':
        return 'bg-stone-gray text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray p-8 flex items-center justify-center">
        <p className="text-stone-gray">Loading documents...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
              Documents
            </h1>
            <p className="text-stone-gray">
              Access and manage board documents
            </p>
          </div>
          <Link href="/portal/board/documents/upload">
            <Button className="bg-terracotta hover:bg-terracotta/90">
              Upload Document
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Search Documents</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title, category, or uploader..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Filter by Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="runbook">Runbook</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="vendor_contacts">Vendor Contacts</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray text-lg mb-4">
                {searchQuery || categoryFilter !== 'all'
                  ? 'No documents match your filters'
                  : 'No documents available'}
              </p>
              <Link href="/portal/board/documents/upload">
                <Button className="bg-terracotta hover:bg-terracotta/90">
                  Upload First Document
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-charcoal">
                          {doc.title}
                        </h3>
                        <Badge className={getCategoryBadgeColor(doc.category)}>
                          {doc.category.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {doc.accessLevel}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-stone-gray mt-3">
                        <div>
                          <span className="font-medium">Uploaded by:</span>
                          <p>{doc.uploadedBy.name}</p>
                        </div>
                        <div>
                          <span className="font-medium">File size:</span>
                          <p>{formatFileSize(doc.fileSize)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Downloads:</span>
                          <p>{doc.downloadCount}</p>
                        </div>
                        <div>
                          <span className="font-medium">Uploaded:</span>
                          <p>
                            {new Date(doc.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-6"
                    >
                      <Button variant="outline">Download</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/portal/board/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
