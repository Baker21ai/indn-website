import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const sponsors = await prisma.sponsors.findMany({
      where: {
        tier: {
          not: null, // Only sponsors with tiers
        },
      },
      select: {
        id: true,
        sponsorType: true,
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

    return NextResponse.json({ sponsors })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
      { status: 500 }
    )
  }
}
