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

    const sponsorId = params.id

    // Delete sponsor (will cascade delete sponsorships and user due to schema)
    await prisma.sponsors.delete({
      where: { id: sponsorId },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sponsor' }, { status: 500 })
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

    const sponsorId = params.id

    const sponsor = await prisma.sponsors.findUnique({
      where: { id: sponsorId },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }

    return NextResponse.json({ sponsor }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sponsor' }, { status: 500 })
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

    const sponsorId = params.id
    const body = await request.json()

    const {
      sponsorType,
      displayName,
      tier,
      status,
      totalAmount,
      location,
      logoUrl,
      website,
      contactName,
      contactEmail,
      contactPhone,
      mailingAddress,
      notes,
      memberSince,
      email,
    } = body

    // Update sponsor
    const updatedSponsor = await prisma.sponsors.update({
      where: { id: sponsorId },
      data: {
        sponsorType,
        displayName,
        tier: tier || null,
        status: status || 'active',
        totalAmount,
        location,
        logoUrl,
        website,
        contactName,
        contactEmail,
        contactPhone,
        mailingAddress,
        notes,
        memberSince: new Date(memberSince),
      },
    })

    // Update associated user email if provided
    if (email) {
      await prisma.users.update({
        where: { id: updatedSponsor.userId },
        data: { email },
      })
    }

    return NextResponse.json({ sponsor: updatedSponsor }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sponsor' }, { status: 500 })
  }
}

// PATCH - Quick partial update (e.g., status change)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sponsorId = params.id
    const body = await request.json()

    // Only allow specific fields to be updated via PATCH
    const allowedFields = ['status', 'tier', 'notes']
    const updateData: Record<string, unknown> = {}

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const updatedSponsor = await prisma.sponsors.update({
      where: { id: sponsorId },
      data: updateData,
    })

    return NextResponse.json({ sponsor: updatedSponsor }, { status: 200 })
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Failed to update sponsor' }, { status: 500 })
  }
}
