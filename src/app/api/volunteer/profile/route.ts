import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [user, profile] = await Promise.all([
      prisma.users.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      }),
      prisma.volunteer_profiles.findUnique({
        where: { userId: session.user.id },
      }),
    ])

    return NextResponse.json({ user, profile })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { phone, availability, experienceLevel, locationPref, skills, interests } = body

    // Update user phone
    await prisma.users.update({
      where: { id: session.user.id },
      data: { phone },
    })

    // Update or create volunteer profile
    await prisma.volunteer_profiles.upsert({
      where: { userId: session.user.id },
      update: {
        availability,
        experienceLevel,
        locationPref,
        skills,
        interests,
      },
      create: {
        userId: session.user.id,
        availability,
        experienceLevel,
        locationPref,
        skills,
        interests,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
