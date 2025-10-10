import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const donors = await prisma.donors.findMany({
      where: {
        tier: {
          not: null, // Only donors with tiers
        },
      },
      select: {
        id: true,
        donorType: true,
        displayName: true,
        tier: true,
        location: true,
        logoUrl: true,
        memberSince: true,
      },
      orderBy: [
        {
          tier: 'desc', // Eagle → Turtle
        },
        {
          displayName: 'asc', // Alphabetical within tier
        },
      ],
    })

    return NextResponse.json({ donors })
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    )
  }
}
