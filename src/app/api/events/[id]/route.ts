import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            volunteerSignups: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Check if user is signed up
    let isSignedUp = false
    if (session?.user) {
      const signup = await prisma.volunteerSignup.findUnique({
        where: {
          eventId_userId: {
            eventId: params.id,
            userId: session.user.id,
          },
        },
      })
      isSignedUp = !!signup
    }

    return NextResponse.json({ event, isSignedUp })
  } catch (error) {
    console.error('Event fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}
