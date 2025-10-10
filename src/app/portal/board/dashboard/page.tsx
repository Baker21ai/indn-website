import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function BoardDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'board_member') {
    redirect('/login')
  }

  // Fetch board member dashboard data
  const [
    totalVolunteers,
    upcomingEvents,
    recentAnnouncements,
    recentDocuments,
    totalEvents,
  ] = await Promise.all([
    // Get total active volunteers
    prisma.users.count({
      where: {
        role: 'volunteer',
        isActive: true,
      },
    }),
    // Get upcoming events
    prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: 'asc',
      },
      take: 5,
      include: {
        _count: {
          select: {
            volunteerSignups: true,
          },
        },
      },
    }),
    // Get recent announcements for board
    prisma.announcement.findMany({
      where: {
        OR: [
          { targetAudience: 'all' },
          { targetAudience: 'board' },
        ],
        publishedAt: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
    // Get recent documents
    prisma.document.findMany({
      where: {
        accessLevel: {
          in: ['board', 'admin'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        uploadedBy: {
          select: {
            name: true,
          },
        },
      },
    }),
    // Get total events count
    prisma.event.count({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
    }),
  ])

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Board Member Dashboard
          </h1>
          <p className="text-stone-gray">Welcome back, {session.user.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Active Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">
                {totalVolunteers}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Registered volunteers
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
                {totalEvents}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Scheduled events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky-blue">
                {recentDocuments.length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Available documents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warm-earth">
                {recentAnnouncements.length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Recent announcements
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Link href="/portal/board/events">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <p className="text-center py-8 text-stone-gray">
                  No upcoming events scheduled
                </p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <p className="text-sm text-stone-gray mt-1">
                            {new Date(event.startDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.location || 'Location TBA'}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-stone-gray">
                        {event._count.volunteerSignups} volunteer
                        {event._count.volunteerSignups !== 1 ? 's' : ''} registered
                        {event.capacity && ` / ${event.capacity} capacity`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Announcements</CardTitle>
                <Link href="/portal/board/announcements">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
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
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium flex-1">{announcement.title}</h3>
                        <Badge
                          variant="outline"
                          className={`capitalize text-xs ${
                            announcement.targetAudience === 'all'
                              ? 'border-sage-green text-sage-green'
                              : 'border-sky-blue text-sky-blue'
                          }`}
                        >
                          {announcement.targetAudience}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-gray mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          By {announcement.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {announcement.publishedAt
                            ? new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Documents</CardTitle>
              <Link href="/portal/board/documents">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentDocuments.length === 0 ? (
              <p className="text-center py-8 text-stone-gray">
                No documents available
              </p>
            ) : (
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {doc.category.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Uploaded by {doc.uploadedBy.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4"
                    >
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/portal/board/events">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Manage Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View and manage volunteer events
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/board/volunteers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">View Volunteers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See all registered volunteers
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/board/documents">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access board documents and files
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/board/announcements">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View and create announcements
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
