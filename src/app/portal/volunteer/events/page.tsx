import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default async function VolunteerEventsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'volunteer') {
    redirect('/login')
  }

  // Fetch upcoming events and user's signups
  const [upcomingEvents, mySignups] = await Promise.all([
    prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: 'asc',
      },
      include: {
        volunteerSignups: {
          where: {
            userId: session.user.id,
          },
        },
        _count: {
          select: {
            volunteerSignups: true,
          },
        },
      },
    }),
    prisma.volunteerSignup.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        eventId: true,
        status: true,
      },
    }),
  ])

  const signupMap = new Map(mySignups.map((s) => [s.eventId, s.status]))

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Upcoming Events
          </h1>
          <p className="text-stone-gray">Browse and sign up for volunteer opportunities</p>
        </div>

        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray text-lg mb-4">
                No upcoming events at the moment
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new volunteer opportunities!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {upcomingEvents.map((event) => {
              const isSignedUp = signupMap.has(event.id)
              const signupStatus = signupMap.get(event.id)
              const isFull = event.capacity && event._count.volunteerSignups >= event.capacity

              return (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-charcoal mb-2">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={`capitalize ${
                          event.category === 'cultural'
                            ? 'border-terracotta text-terracotta'
                            : event.category === 'educational'
                            ? 'border-sage-green text-sage-green'
                            : event.category === 'fundraising'
                            ? 'border-warm-earth text-warm-earth'
                            : 'border-sky-blue text-sky-blue'
                        }`}
                      >
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-stone-gray">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                        {event.capacity && (
                          <div>
                            <span className="font-medium text-charcoal">Capacity:</span>
                            <p className="text-stone-gray">
                              {event._count.volunteerSignups} / {event.capacity} signed up
                            </p>
                          </div>
                        )}
                        {event.price && (
                          <div>
                            <span className="font-medium text-charcoal">Price:</span>
                            <p className="text-stone-gray">${event.price.toString()}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        {isSignedUp ? (
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${
                                signupStatus === 'approved'
                                  ? 'bg-sage-green'
                                  : signupStatus === 'pending'
                                  ? 'bg-warm-earth'
                                  : 'bg-sky-blue'
                              }`}
                            >
                              {signupStatus === 'approved'
                                ? 'Confirmed'
                                : signupStatus === 'pending'
                                ? 'Pending Approval'
                                : 'Checked In'}
                            </Badge>
                            <Link href={`/portal/volunteer/events/${event.id}`}>
                              <Button variant="outline">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <Link href={`/portal/volunteer/events/${event.id}`}>
                            <Button
                              disabled={isFull}
                              className="bg-terracotta hover:bg-terracotta/90"
                            >
                              {isFull ? 'Event Full' : 'Sign Up'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <div className="mt-8">
          <Link href="/portal/volunteer/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
