import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { SponsorTier } from '@prisma/client'
import { sendSponsorApplicationNotification, sendSponsorConfirmationEmail } from '@/lib/email'

interface SponsorApplicationData {
  // Company Info
  companyName: string
  website?: string
  logoUrl?: string
  
  // Contact Info
  contactName: string
  contactEmail: string
  contactPhone: string
  
  // Address
  streetAddress: string
  city: string
  state: string
  zipCode: string
  
  // Sponsorship Details
  tier: SponsorTier
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: SponsorApplicationData = await request.json()

    // Validate required fields
    const requiredFields = [
      'companyName',
      'contactName',
      'contactEmail',
      'contactPhone',
      'streetAddress',
      'city',
      'state',
      'zipCode',
      'tier',
    ]

    for (const field of requiredFields) {
      if (!data[field as keyof SponsorApplicationData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate tier
    if (!['bronze', 'silver', 'gold'].includes(data.tier)) {
      return NextResponse.json(
        { error: 'Invalid sponsorship tier' },
        { status: 400 }
      )
    }

    // Create a placeholder user for the sponsor (they can claim later)
    const placeholderUserId = uuidv4()
    const sponsorId = uuidv4()
    
    // Combine address
    const mailingAddress = `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}`

    // Create user and sponsor in a transaction
    await prisma.$transaction(async (tx) => {
      // Create placeholder user
      await tx.users.create({
        data: {
          id: placeholderUserId,
          email: data.contactEmail,
          passwordHash: '', // Placeholder - they can set up account later
          name: data.contactName,
          role: 'volunteer', // Default role
          isActive: true,
          updatedAt: new Date(),
        },
      })

      // Create sponsor record
      await tx.sponsors.create({
        data: {
          id: sponsorId,
          userId: placeholderUserId,
          sponsorType: 'company',
          displayName: data.companyName,
          tier: data.tier,
          status: 'active',
          totalAmount: 0, // Will be updated when check is received
          isRecurring: false,
          isAnonymous: false,
          location: `${data.city}, ${data.state}`,
          logoUrl: data.logoUrl || null,
          website: data.website || null,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          mailingAddress: mailingAddress,
          notes: data.notes || `Pending check payment for ${data.tier} tier sponsorship`,
          memberSince: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    })

    // Payment instructions for the response and email
    const paymentInstructions = {
      check: {
        payableTo: 'Youth Alliance',
        mailingAddress: '[Address]', // Placeholder as requested
        memo: `INDN Sponsorship - ${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)} Tier - ${data.companyName}`,
        taxId: '77-0377245', // Youth Alliance Federal Tax ID
      },
      online: {
        description: 'You can also donate online via our Youth Alliance donation page.',
        qrCodePath: '/images/barcode.png',
        link: 'https://youthall.networkforgood.com/projects/174191-everyday-giving',
      },
      fiscalSponsorNote: 'INDN is a fiscally sponsored project of Youth Alliance, a 501(c)(3) nonprofit organization. All contributions are tax-deductible.',
    }

    // Send email notification to admin (marketing@indnsbc.org)
    await sendSponsorApplicationNotification({
      companyName: data.companyName,
      website: data.website,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      mailingAddress,
      tier: data.tier,
      notes: data.notes,
    })

    // Send confirmation email to the sponsor
    await sendSponsorConfirmationEmail(
      {
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        tier: data.tier,
      },
      paymentInstructions
    )

    return NextResponse.json({
      success: true,
      message: 'Sponsorship application submitted successfully',
      sponsorId,
      paymentInstructions,
    })
  } catch (error) {
    console.error('Sponsor application error:', error)
    
    // Check for unique constraint violation (email already exists)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'A sponsor with this email already exists. Please contact us if you need assistance.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit sponsorship application' },
      { status: 500 }
    )
  }
}

