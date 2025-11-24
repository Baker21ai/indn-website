import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import crypto from 'crypto'
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendAdminNotification,
} from '@/lib/email'
import { checkRateLimit } from '@/lib/rate-limit'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  role: z.enum(['board_member']).default('board_member'),
})

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const identifier = request.headers.get('x-forwarded-for') || 'anonymous'
    const rateLimitResult = await checkRateLimit(identifier, 'registration')

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Generate unique ID for user
    const userId = crypto.randomUUID()

    // Create user
    const user = await prisma.users.create({
      data: {
        id: userId,
        email: validatedData.email,
        passwordHash,
        name: validatedData.name,
        phone: validatedData.phone,
        role: validatedData.role,
        isActive: true,
        verificationToken,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // Volunteer registration is disabled - only board members can register

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken)
    } catch (emailError) {
      // Email send failed - log safely without exposing details
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name, validatedData.role)
    } catch (emailError) {
      // Email send failed - log safely without exposing details
    }

    // Send admin notification
    try {
      await sendAdminNotification('new_board_member', {
        title: 'New Board Member Registration',
        message: `A new board member has registered on the INDN website.`,
        userName: user.name,
        userEmail: user.email,
        userRole: validatedData.role,
        actionUrl: `${process.env.NEXTAUTH_URL}/portal/admin/users`,
      })
    } catch (emailError) {
      // Email send failed - log safely without exposing details
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! You can now sign in.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
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

    // Error occurred - return generic message
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
