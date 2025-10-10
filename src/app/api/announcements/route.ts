import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const targetAudience = searchParams.get('targetAudience')

    // Build query based on user role
    const where: any = {
      publishedAt: {
        not: null,
      },
    }

    // Filter by target audience if specified
    if (targetAudience && targetAudience !== 'all') {
      where.targetAudience = targetAudience
    } else {
      // Show announcements relevant to user's role
      if (session.user.role === 'admin') {
        // Admins see all announcements
        where.OR = [
          { targetAudience: 'all' },
          { targetAudience: 'volunteers' },
          { targetAudience: 'board' },
        ]
      } else if (session.user.role === 'board_member') {
        where.OR = [{ targetAudience: 'all' }, { targetAudience: 'board' }]
      } else {
        where.OR = [{ targetAudience: 'all' }, { targetAudience: 'volunteers' }]
      }
    }

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ announcements })
  } catch (error) {
    console.error('Announcements fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Only board members and admins can create announcements
    if (!session?.user || !['board_member', 'admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, targetAudience, publishNow } = body

    if (!title || !content || !targetAudience) {
      return NextResponse.json(
        { error: 'Title, content, and target audience are required' },
        { status: 400 }
      )
    }

    // Validate target audience
    const validAudiences = ['all', 'volunteers', 'board']
    if (!validAudiences.includes(targetAudience)) {
      return NextResponse.json(
        { error: 'Invalid target audience' },
        { status: 400 }
      )
    }

    // Create announcement
    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        targetAudience,
        authorId: session.user.id,
        publishedAt: publishNow ? new Date() : null,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, announcement }, { status: 201 })
  } catch (error) {
    console.error('Announcement creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}
