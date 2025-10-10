import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function VolunteerDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'volunteer') {
    redirect('/login')
  }

  // Fetch volunteer data
  const [volunteerProfile, upcomingEvents, recentAnnouncements] = await Promise.all([
    // Get volunteer profile
    prisma.volunteer_profiles.findUnique({
      where: { userId: session.user.id },
    }),
    // Get upcoming events the volunteer signed up for
    prisma.volunteerSignup.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        event: true,
      },
      orderBy: {
        event: {
          startDate: 'asc',
        },
      },
      take: 5,
    }),
    // Get recent announcements for volunteers
    prisma.announcement.findMany({
      where: {
        OR: [
          { targetAudience: 'all' },
          { targetAudience: 'volunteers' },
        ],
        publishedAt: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
    }),
  ])

  const hoursCompleted = volunteerProfile?.hoursCompleted || 0

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-stone-gray">Thank you for being part of our community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Hours Contributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">
                {hoursCompleted}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Total volunteer hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sage-green">
                {upcomingEvents.length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Events you're registered for
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Member Since
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky-blue">
                {new Date(session.user.createdAt || Date.now()).getFullYear()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Year you joined
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>My Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-stone-gray mb-4">
                    You haven't registered for any events yet
                  </p>
                  <Link href="/portal/volunteer/events">
                    <Button className="bg-terracotta hover:bg-terracotta/90">
                      Browse Events
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((signup) => (
                    <div
                      key={signup.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <h3 className="font-medium text-lg">{signup.event.title}</h3>
                      <p className="text-sm text-stone-gray mt-1">
                        {new Date(signup.event.startDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {signup.event.location || 'Location TBA'}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            signup.status === 'approved'
                              ? 'bg-sage-green/10 text-sage-green'
                              : signup.status === 'pending'
                              ? 'bg-warm-earth/10 text-warm-earth'
                              : 'bg-stone-gray/10 text-stone-gray'
                          }`}
                        >
                          {signup.status === 'approved'
                            ? 'Confirmed'
                            : signup.status === 'pending'
                            ? 'Pending'
                            : 'Checked In'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              {recentAnnouncements.length === 0 ? (
                <p className="text-center py-8 text-stone-gray">
                  No announcements yet
                </p>
              ) : (
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <h3 className="font-medium">{announcement.title}</h3>
                      <p className="text-sm text-stone-gray mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {announcement.publishedAt
                          ? new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/portal/volunteer/events">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Browse Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find and sign up for upcoming volunteer opportunities
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/volunteer/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Update your information, skills, and availability
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/volunteer/announcements">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">All Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View all announcements and updates from INDN
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
