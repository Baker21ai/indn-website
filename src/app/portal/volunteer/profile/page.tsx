import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function VolunteerProfilePage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'volunteer') {
    redirect('/login')
  }

  // Fetch user and volunteer profile data
  const [user, volunteerProfile] = await Promise.all([
    prisma.users.findUnique({
      where: { id: session.user.id },
    }),
    prisma.volunteer_profiles.findUnique({
      where: { userId: session.user.id },
    }),
  ])

  if (!user) {
    redirect('/login')
  }

  const skills = volunteerProfile?.skills as string[] || []
  const interests = volunteerProfile?.interests as string[] || []

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
              My Profile
            </h1>
            <p className="text-stone-gray">Manage your volunteer information</p>
          </div>
          <Link href="/portal/volunteer/profile/edit">
            <Button className="bg-terracotta hover:bg-terracotta/90">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-gray">Full Name</label>
                <p className="text-charcoal font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Email</label>
                <p className="text-charcoal font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Phone</label>
                <p className="text-charcoal font-medium">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Member Since</label>
                <p className="text-charcoal font-medium">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Volunteer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-gray">Hours Completed</label>
                <p className="text-2xl font-bold text-terracotta">
                  {volunteerProfile?.hoursCompleted || 0}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Application Status</label>
                <p className="text-charcoal font-medium capitalize">
                  {volunteerProfile?.applicationStatus || 'Pending'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Availability</label>
                <p className="text-charcoal font-medium capitalize">
                  {volunteerProfile?.availability || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Experience Level</label>
                <p className="text-charcoal font-medium capitalize">
                  {volunteerProfile?.experienceLevel || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-gray">Location Preference</label>
                <p className="text-charcoal font-medium capitalize">
                  {volunteerProfile?.locationPref || 'Not specified'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <p className="text-stone-gray">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            {interests.length === 0 ? (
              <p className="text-stone-gray">No interests added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-sage-green/10 text-sage-green rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Link href="/portal/volunteer/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
