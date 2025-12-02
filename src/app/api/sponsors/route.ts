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
        status: true,
        location: true,
        logoUrl: true,
        website: true,
        memberSince: true,
      },
      orderBy: [
        {
          // Order by tier priority (gold first, then silver, then bronze)
          tier: 'desc',
        },
        {
          displayName: 'asc', // Alphabetical within tier
        },
      ],
    })

    return NextResponse.json({ sponsors })
  } catch (error) {
    console.error('Failed to fetch sponsors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
      { status: 500 }
    )
  }
}
