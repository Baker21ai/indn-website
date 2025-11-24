import { auth } from '@/auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const donorId = params.id

    // Delete donor (will cascade delete donations and user due to schema)
    await prisma.donors.delete({
      where: { id: donorId },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete donor' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const donorId = params.id

    const donor = await prisma.donors.findUnique({
      where: { id: donorId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 })
    }

    return NextResponse.json({ donor }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch donor' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const donorId = params.id
    const body = await request.json()

    const {
      donorType,
      displayName,
      tier,
      totalDonated,
      location,
      logoUrl,
      website,
      notes,
      memberSince,
      email,
    } = body

    // Update donor
    const updatedDonor = await prisma.donors.update({
      where: { id: donorId },
      data: {
        donorType,
        displayName,
        tier: tier || null,
        totalDonated,
        location,
        logoUrl,
        website,
        notes,
        memberSince: new Date(memberSince),
      },
    })

    // Update associated user email if provided
    if (email) {
      await prisma.users.update({
        where: { id: updatedDonor.userId },
        data: { email },
      })
    }

    return NextResponse.json({ donor: updatedDonor }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update donor' }, { status: 500 })
  }
}
