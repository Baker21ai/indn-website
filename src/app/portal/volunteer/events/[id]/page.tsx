'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const [event, setEvent] = useState<{
    id: string
    title: string
    description: string
    startDate: string
    endDate?: string
    location?: string
    isVirtual: boolean
    category: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(false)

  const [formData, setFormData] = useState({
    tshirtSize: '',
    emergencyContact: '',
    skillsExperience: '',
    availability: {},
    rolesInterested: [] as string[],
  })

  useEffect(() => {
    document.title = 'Event Details - INDN'
    fetchEvent()
  }, [params.id])

  async function fetchEvent() {
    try {
      const response = await fetch(`/api/events/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data.event)
        setIsSignedUp(data.isSignedUp)
      } else {
        setError('Failed to load event')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/events/${params.id}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to sign up')
        return
      }

      // Redirect to events page with success message
      router.push('/portal/volunteer/events?signup=success')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray p-8 flex items-center justify-center">
        <p className="text-stone-gray">Loading event details...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-warm-gray p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray mb-4">Event not found</p>
              <Link href="/portal/volunteer/events">
                <Button variant="outline">Back to Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-4xl mx-auto">
        {/* Event Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div>
                <CardTitle className="text-3xl text-charcoal mb-2">
                  {event.title}
                </CardTitle>
                <p className="text-lg text-stone-gray">
                  {new Date(event.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {event.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-stone-gray">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                {event.location && (
                  <div>
                    <span className="font-medium text-charcoal">Location:</span>
                    <p className="text-stone-gray">{event.location}</p>
                  </div>
                )}
                {event.isVirtual && (
                  <div>
                    <span className="font-medium text-charcoal">Format:</span>
                    <p className="text-stone-gray">Virtual Event</p>
                  </div>
                )}
                {event.endDate && (
                  <div>
                    <span className="font-medium text-charcoal">End Time:</span>
                    <p className="text-stone-gray">
                      {new Date(event.endDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {isSignedUp ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-sage-green">You&apos;re Registered!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-gray mb-4">
                You have successfully signed up for this event. We&apos;ll send you more details as the event approaches.
              </p>
              <Link href="/portal/volunteer/events">
                <Button variant="outline">Back to Events</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSignUp}>
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Sign-Up Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tshirtSize">T-Shirt Size (Optional)</Label>
                  <Input
                    id="tshirtSize"
                    value={formData.tshirtSize}
                    onChange={(e) => setFormData({ ...formData, tshirtSize: e.target.value })}
                    placeholder="S, M, L, XL, XXL"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    placeholder="Name and phone number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="skillsExperience">Relevant Skills or Experience (Optional)</Label>
                  <textarea
                    id="skillsExperience"
                    value={formData.skillsExperience}
                    onChange={(e) => setFormData({ ...formData, skillsExperience: e.target.value })}
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    placeholder="Tell us about any relevant skills or experience..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-terracotta hover:bg-terracotta/90"
                  >
                    {isSubmitting ? 'Signing Up...' : 'Complete Sign-Up'}
                  </Button>
                  <Link href="/portal/volunteer/events">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  )
}
