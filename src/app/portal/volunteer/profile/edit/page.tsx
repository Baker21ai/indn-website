'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

const SKILLS_OPTIONS = [
  'teaching',
  'arts',
  'tech',
  'events',
  'outdoor',
  'admin',
  'fundraising',
  'communication',
  'leadership',
]

const INTERESTS_OPTIONS = [
  'youth',
  'elders',
  'culture',
  'language',
  'health',
  'advocacy',
  'education',
  'environment',
]

export default function EditVolunteerProfilePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    phone: '',
    availability: '',
    experienceLevel: '',
    locationPref: '',
    skills: [] as string[],
    interests: [] as string[],
  })

  useEffect(() => {
    document.title = 'Edit Profile - INDN'
    // Fetch current profile data
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      const response = await fetch('/api/volunteer/profile')
      if (response.ok) {
        const data = await response.json()
        setFormData({
          phone: data.user.phone || '',
          availability: data.profile?.availability || '',
          experienceLevel: data.profile?.experienceLevel || '',
          locationPref: data.profile?.locationPref || '',
          skills: data.profile?.skills || [],
          interests: data.profile?.interests || [],
        })
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }
  }

  function toggleSkill(skill: string) {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  function toggleInterest(interest: string) {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/volunteer/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to update profile')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/portal/volunteer/profile')
      }, 1500)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-warm-gray p-8 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-sage-green">Profile Updated!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-gray">Redirecting to your profile...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Edit Profile
          </h1>
          <p className="text-stone-gray">Update your volunteer information</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Preferences */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Volunteer Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => setFormData({ ...formData, availability: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="events">Events only</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extensive">Extensive</SelectItem>
                    <SelectItem value="some">Some experience</SelectItem>
                    <SelectItem value="none">New to volunteering</SelectItem>
                    <SelectItem value="indigenous">Indigenous community member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="locationPref">Location Preference</Label>
                <Select
                  value={formData.locationPref}
                  onValueChange={(value) => setFormData({ ...formData, locationPref: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SKILLS_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                      formData.skills.includes(skill)
                        ? 'border-terracotta bg-terracotta/10 text-terracotta'
                        : 'border-gray-200 hover:border-terracotta/50'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTERESTS_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                      formData.interests.includes(interest)
                        ? 'border-sage-green bg-sage-green/10 text-sage-green'
                        : 'border-gray-200 hover:border-sage-green/50'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Link href="/portal/volunteer/profile">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
