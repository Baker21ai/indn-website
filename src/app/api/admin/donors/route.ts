import { auth } from '@/auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const {
      donorType,
      email,
      displayName,
      tier,
      totalDonated,
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

    // Create user and donor in a transaction
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

      // Create donor profile
      const donor = await tx.donors.create({
        data: {
          userId: user.id,
          donorType,
          displayName,
          tier: tier && tier !== 'none' ? tier : null,
          totalDonated: totalDonated || 0,
          location,
          logoUrl,
          website,
          notes,
          memberSince: memberSince ? new Date(memberSince) : new Date(),
        },
      })

      return { user, donor }
    })

    return NextResponse.json(
      {
        donor: result.donor,
        message: 'Donor created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating donor:', error)
    return NextResponse.json({ error: 'Failed to create donor' }, { status: 500 })
  }
}
