import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { z } from 'zod'

// GET /api/admin/users - List all users with filters
export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const isActive = searchParams.get('isActive')
    const search = searchParams.get('search')

    // Build where clause
    const where: Prisma.usersWhereInput = {}

    if (role) {
      where.role = role
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Fetch users
    const users = await prisma.users.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        phone: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create new user
const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['volunteer', 'board_member', 'admin']),
  phone: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createUserSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Create user
    const user = await prisma.users.create({
      data: {
        email: validatedData.email,
        passwordHash,
        name: validatedData.name,
        phone: validatedData.phone,
        role: validatedData.role,
        isActive: validatedData.isActive,
        emailVerified: new Date(), // Admin-created users are pre-verified
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        phone: true,
        createdAt: true,
      },
    })

    // Create volunteer profile if role is volunteer
    if (validatedData.role === 'volunteer') {
      await prisma.volunteer_profiles.create({
        data: {
          userId: user.id,
          applicationStatus: 'approved',
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
