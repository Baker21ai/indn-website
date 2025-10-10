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

interface Announcement {
  id: string
  title: string
  content: string
  targetAudience: string
  publishedAt: string | null
  createdAt: string
  author: {
    name: string
    email: string
  }
}

export default function BoardAnnouncementsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [audienceFilter, setAudienceFilter] = useState('all')

  useEffect(() => {
    document.title = 'Announcements - INDN'
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    filterAnnouncements()
  }, [announcements, searchQuery, audienceFilter])

  async function fetchAnnouncements() {
    try {
      const response = await fetch('/api/announcements')
      if (response.ok) {
        const data = await response.json()
        setAnnouncements(data.announcements)
      } else {
        setError('Failed to load announcements')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function filterAnnouncements() {
    let filtered = [...announcements]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(query) ||
          announcement.content.toLowerCase().includes(query) ||
          announcement.author.name.toLowerCase().includes(query)
      )
    }

    // Apply audience filter
    if (audienceFilter !== 'all') {
      filtered = filtered.filter(
        (announcement) => announcement.targetAudience === audienceFilter
      )
    }

    setFilteredAnnouncements(filtered)
  }

  function getAudienceBadgeColor(audience: string) {
    switch (audience) {
      case 'all':
        return 'bg-sage-green text-white'
      case 'volunteers':
        return 'bg-sky-blue text-white'
      case 'board':
        return 'bg-terracotta text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray p-8 flex items-center justify-center">
        <p className="text-stone-gray">Loading announcements...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
              Announcements
            </h1>
            <p className="text-stone-gray">
              View and manage community announcements
            </p>
          </div>
          <Link href="/portal/board/announcements/create">
            <Button className="bg-terracotta hover:bg-terracotta/90">
              Create Announcement
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
                <Label htmlFor="search">Search Announcements</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title, content, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="audience">Filter by Audience</Label>
                <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="All Audiences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Audiences</SelectItem>
                    <SelectItem value="all">Everyone</SelectItem>
                    <SelectItem value="volunteers">Volunteers</SelectItem>
                    <SelectItem value="board">Board Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        {filteredAnnouncements.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray text-lg mb-4">
                {searchQuery || audienceFilter !== 'all'
                  ? 'No announcements match your filters'
                  : 'No announcements available'}
              </p>
              <Link href="/portal/board/announcements/create">
                <Button className="bg-terracotta hover:bg-terracotta/90">
                  Create First Announcement
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {announcement.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getAudienceBadgeColor(announcement.targetAudience)}>
                          {announcement.targetAudience === 'all' ? 'Everyone' : announcement.targetAudience}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          by {announcement.author.name}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {announcement.publishedAt
                            ? new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-gray whitespace-pre-wrap">
                    {announcement.content}
                  </p>
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
