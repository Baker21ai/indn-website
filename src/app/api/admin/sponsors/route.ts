import { auth } from '@/auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const {
      sponsorType,
      email,
      displayName,
      tier,
      totalAmount,
      location,
      logoUrl,
      website,
      notes,
      memberSince,
    } = body

    // Check if email already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      )
    }

    // Generate a random password (user can reset if they need to login)
    const randomPassword = Math.random().toString(36).slice(-16)
    const passwordHash = await hash(randomPassword, 10)

    // Create user and sponsor in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.users.create({
        data: {
          email,
          name: displayName,
          passwordHash,
          role: 'volunteer', // Default role
        },
      })

      // Create sponsor profile
      const sponsor = await tx.sponsors.create({
        data: {
          userId: user.id,
          sponsorType,
          displayName,
          tier: tier && tier !== 'none' ? tier : null,
          totalAmount: totalAmount || 0,
          location,
          logoUrl,
          website,
          notes,
          memberSince: memberSince ? new Date(memberSince) : new Date(),
        },
      })

      return { user, sponsor }
    })

    return NextResponse.json(
      {
        sponsor: result.sponsor,
        message: 'Sponsor created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sponsor' }, { status: 500 })
  }
}
