import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tshirtSize, emergencyContact, skillsExperience, availability, rolesInterested } = body

    // Check if event exists
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

    // Check capacity
    if (event.capacity && event._count.volunteerSignups >= event.capacity) {
      return NextResponse.json({ error: 'Event is full' }, { status: 400 })
    }

    // Check if already signed up
    const existingSignup = await prisma.volunteerSignup.findUnique({
      where: {
        eventId_userId: {
          eventId: params.id,
          userId: session.user.id,
        },
      },
    })

    if (existingSignup) {
      return NextResponse.json(
        { error: 'Already signed up for this event' },
        { status: 400 }
      )
    }

    // Create signup
    const signup = await prisma.volunteerSignup.create({
      data: {
        eventId: params.id,
        userId: session.user.id,
        tshirtSize,
        emergencyContact,
        skillsExperience,
        availability: availability || {},
        rolesInterested: rolesInterested || [],
        status: 'approved', // Auto-approve for MVP
      },
    })

    // Update event registration count
    await prisma.event.update({
      where: { id: params.id },
      data: {
        registrationCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ success: true, signup })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to sign up for event' },
      { status: 500 }
    )
  }
}
