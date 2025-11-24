/**
 * Script to add placeholder sponsors to the database
 * Run with: npx tsx scripts/add-placeholder-sponsors.ts
 */

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const placeholderSponsors = [
  // Eagle Tier
  {
    sponsorType: 'company' as const,
    email: 'contact@techcorp.example.com',
    displayName: 'TechCorp Global',
    tier: 'eagle' as const,
    totalAmount: 15000,
    location: 'San Francisco, CA',
    website: 'https://example.com',
    memberSince: new Date('2023-01-15'),
  },
  {
    sponsorType: 'individual' as const,
    email: 'james.wilson@example.com',
    displayName: 'James Wilson',
    tier: 'eagle' as const,
    totalAmount: 12000,
    location: 'Palo Alto, CA',
    memberSince: new Date('2023-03-20'),
  },

  // Bear Tier
  {
    sponsorType: 'company' as const,
    email: 'info@greenvalley.example.com',
    displayName: 'Green Valley Foundation',
    tier: 'bear' as const,
    totalAmount: 7500,
    location: 'Santa Cruz, CA',
    website: 'https://example.com',
    memberSince: new Date('2023-06-10'),
  },
  {
    sponsorType: 'company' as const,
    email: 'contact@coastalbank.example.com',
    displayName: 'Coastal Community Bank',
    tier: 'bear' as const,
    totalAmount: 6000,
    location: 'Monterey, CA',
    website: 'https://example.com',
    memberSince: new Date('2023-07-22'),
  },

  // Wolf Tier
  {
    sponsorType: 'individual' as const,
    email: 'maria.garcia@example.com',
    displayName: 'Maria Garcia',
    tier: 'wolf' as const,
    totalAmount: 2500,
    location: 'Gilroy, CA',
    memberSince: new Date('2024-01-05'),
  },
  {
    sponsorType: 'company' as const,
    email: 'info@localfoods.example.com',
    displayName: 'Local Foods Market',
    tier: 'wolf' as const,
    totalAmount: 3000,
    location: 'Hollister, CA',
    website: 'https://example.com',
    memberSince: new Date('2024-02-14'),
  },
  {
    sponsorType: 'individual' as const,
    email: 'robert.chang@example.com',
    displayName: 'Robert & Lisa Chang',
    tier: 'wolf' as const,
    totalAmount: 1500,
    location: 'San Jose, CA',
    memberSince: new Date('2024-03-18'),
  },

  // Turtle Tier
  {
    sponsorType: 'individual' as const,
    email: 'susan.martinez@example.com',
    displayName: 'Susan Martinez',
    tier: 'turtle' as const,
    totalAmount: 500,
    location: 'Watsonville, CA',
    memberSince: new Date('2024-05-01'),
  },
  {
    sponsorType: 'company' as const,
    email: 'contact@artscollective.example.com',
    displayName: 'Tres Pinos Arts Collective',
    tier: 'turtle' as const,
    totalAmount: 750,
    location: 'Tres Pinos, CA',
    website: 'https://example.com',
    memberSince: new Date('2024-06-12'),
  },
  {
    sponsorType: 'individual' as const,
    email: 'david.thompson@example.com',
    displayName: 'David Thompson',
    tier: 'turtle' as const,
    totalAmount: 250,
    location: 'Salinas, CA',
    memberSince: new Date('2024-08-20'),
  },
]

async function main() {
  console.log('🌱 Starting to add placeholder sponsors...')

  for (const sponsor of placeholderSponsors) {
    try {
      // Check if user already exists
      const existingUser = await prisma.users.findUnique({
        where: { email: sponsor.email },
      })

      if (existingUser) {
        console.log(`⏭️  Skipping ${sponsor.displayName} - email already exists`)
        continue
      }

      // Create user and sponsor in a transaction
      const randomPassword = Math.random().toString(36).slice(-16)
      const passwordHash = await hash(randomPassword, 10)

      await prisma.$transaction(async (tx) => {
        const userId = randomUUID()
        const sponsorId = randomUUID()

        // Create user
        await tx.users.create({
          data: {
            id: userId,
            email: sponsor.email,
            name: sponsor.displayName,
            passwordHash,
            role: 'volunteer',
            updatedAt: new Date(),
          },
        })

        // Create sponsor profile
        await tx.sponsors.create({
          data: {
            id: sponsorId,
            userId: userId,
            sponsorType: sponsor.sponsorType,
            displayName: sponsor.displayName,
            tier: sponsor.tier,
            totalAmount: sponsor.totalAmount,
            location: sponsor.location,
            website: sponsor.website,
            memberSince: sponsor.memberSince,
            updatedAt: new Date(),
          },
        })
      })

      console.log(`✅ Added ${sponsor.displayName} (${sponsor.tier} tier)`)
    } catch (error) {
      console.error(`❌ Error adding ${sponsor.displayName}:`, error)
    }
  }

  console.log('\n🎉 Finished adding placeholder sponsors!')
  console.log('\n📝 Summary:')
  const counts = await prisma.sponsors.groupBy({
    by: ['tier'],
    _count: true,
  })
  counts.forEach((count) => {
    console.log(`   ${count.tier}: ${count._count} sponsors`)
  })
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
