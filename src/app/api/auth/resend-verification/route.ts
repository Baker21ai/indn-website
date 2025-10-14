import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
// import { sendVerificationEmail } from '@/lib/email' // Disabled for MVP - missing @react-email/render dependency
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      // Don't reveal that user doesn't exist
      return NextResponse.json({
        message: 'If an account exists with that email, a verification link has been sent.',
      })
    }

    if (user.emailVerified) {
      return NextResponse.json({
        message: 'Email is already verified',
        alreadyVerified: true,
      })
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Save token to database
    await prisma.users.update({
      where: { id: user.id },
      data: {
        verificationToken,
      },
    })

    // Send verification email - DISABLED FOR MVP
    // TODO: Install @react-email/render and re-enable email verification
    // await sendVerificationEmail(user.email, verificationToken)

    return NextResponse.json({
      message: 'Verification token generated successfully.',
    })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
