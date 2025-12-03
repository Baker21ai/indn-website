/**
 * Script to seed real INDN sponsors
 * Run with: npx tsx scripts/seed-real-sponsors.ts
 * 
 * Sponsor Tiers:
 * - Gold: $50,000+ (25 VIP tickets)
 * - Silver: $20,000+ (10 VIP tickets)  
 * - Bronze: $10,000+ (5 VIP tickets)
 */

import { PrismaClient, SponsorTier, SponsorType } from '@prisma/client'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

interface RealSponsor {
  sponsorType: SponsorType
  email: string
  displayName: string
  tier: SponsorTier
  totalAmount: number
  location: string | null
  website: string | null
  logoUrl: string | null
  memberSince: Date
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  notes?: string
}

const realSponsors: RealSponsor[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // GOLD TIER SPONSORS
  // ═══════════════════════════════════════════════════════════════════════
  {
    sponsorType: 'individual',
    email: 'james.whitebear.connor@indn-sponsor.local',
    displayName: 'James Whitebear Connor',
    tier: 'gold',
    totalAmount: 50000,
    location: null,
    website: null,
    logoUrl: null, // Individual sponsor - no logo needed
    memberSince: new Date('2024-01-01'),
    notes: 'Gold tier individual sponsor',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SILVER TIER SPONSORS
  // ═══════════════════════════════════════════════════════════════════════
  {
    sponsorType: 'individual',
    email: 'tara.dianne.stein@indn-sponsor.local',
    displayName: 'Tara Dianne Stein',
    tier: 'silver',
    totalAmount: 5000,
    location: null,
    website: null,
    logoUrl: null, // Individual sponsor - no logo needed
    memberSince: new Date('2024-01-01'),
    notes: 'Silver tier individual sponsor',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BRONZE TIER SPONSORS
  // ═══════════════════════════════════════════════════════════════════════
  {
    sponsorType: 'company',
    email: 'sponsorship@cityofhollister.local',
    displayName: 'City of Hollister',
    tier: 'bronze',
    totalAmount: 10000,
    location: 'Hollister, CA',
    website: 'https://hollister.ca.gov',
    logoUrl: '/images/sponsors/bronze/hollister.svg',
    memberSince: new Date('2024-01-01'),
    notes: 'Bronze tier organizational sponsor',
  },
  {
    sponsorType: 'company',
    email: 'sponsorship@gavilan.local',
    displayName: 'Gavilan College',
    tier: 'bronze',
    totalAmount: 10000,
    location: 'Gilroy, CA',
    website: 'https://www.gavilan.edu',
    logoUrl: '/images/sponsors/bronze/gavilan.svg',
    memberSince: new Date('2024-01-01'),
    notes: 'Bronze tier educational institution sponsor',
  },
]

async function main() {
  console.log('🌱 Starting to seed real INDN sponsors...\n')
  
  let added = 0
  let skipped = 0

  for (const sponsor of realSponsors) {
    try {
      // Check if user already exists
      const existingUser = await prisma.users.findUnique({
        where: { email: sponsor.email },
      })

      if (existingUser) {
        console.log(`⏭️  Skipping ${sponsor.displayName} - already exists`)
        skipped++
        continue
      }

      // Create user and sponsor in a transaction
      const randomPassword = randomUUID() // Not used for login, just placeholder
      const passwordHash = await hash(randomPassword, 10)

      await prisma.$transaction(async (tx) => {
        const userId = randomUUID()
        const sponsorId = randomUUID()

        // Create user (required for sponsor relationship)
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
            status: 'active',
            location: sponsor.location,
            website: sponsor.website,
            logoUrl: sponsor.logoUrl,
            contactName: sponsor.contactName,
            contactEmail: sponsor.contactEmail || sponsor.email,
            contactPhone: sponsor.contactPhone,
            notes: sponsor.notes,
            memberSince: sponsor.memberSince,
            updatedAt: new Date(),
          },
        })
      })

      const tierEmoji = sponsor.tier === 'gold' ? '🥇' : sponsor.tier === 'silver' ? '🥈' : '🥉'
      console.log(`${tierEmoji} Added ${sponsor.displayName} (${sponsor.tier.toUpperCase()} tier)`)
      added++
    } catch (error) {
      console.error(`❌ Error adding ${sponsor.displayName}:`, error)
    }
  }

  console.log('\n' + '═'.repeat(60))
  console.log('🎉 Finished seeding real sponsors!')
  console.log('═'.repeat(60))
  console.log(`\n📊 Summary: ${added} added, ${skipped} skipped\n`)
  
  // Show current sponsors by tier
  const counts = await prisma.sponsors.groupBy({
    by: ['tier'],
    where: { status: 'active' },
    _count: true,
  })
  
  console.log('📋 Active Sponsors by Tier:')
  const tierOrder = ['gold', 'silver', 'bronze']
  tierOrder.forEach((tier) => {
    const count = counts.find((c) => c.tier === tier)?._count || 0
    const emoji = tier === 'gold' ? '🥇' : tier === 'silver' ? '🥈' : '🥉'
    console.log(`   ${emoji} ${tier.charAt(0).toUpperCase() + tier.slice(1)}: ${count} sponsor${count !== 1 ? 's' : ''}`)
  })

  // List all sponsors
  const allSponsors = await prisma.sponsors.findMany({
    where: { status: 'active' },
    orderBy: [{ tier: 'desc' }, { displayName: 'asc' }],
    select: { displayName: true, tier: true, sponsorType: true },
  })

  console.log('\n📝 All Active Sponsors:')
  allSponsors.forEach((s) => {
    const tierEmoji = s.tier === 'gold' ? '🥇' : s.tier === 'silver' ? '🥈' : '🥉'
    const typeIcon = s.sponsorType === 'company' ? '🏢' : '👤'
    console.log(`   ${tierEmoji} ${typeIcon} ${s.displayName}`)
  })

  console.log('\n✅ Logo files should exist at:')
  console.log('   • public/images/sponsors/bronze/hollister.svg')
  console.log('   • public/images/sponsors/bronze/gavilan.svg')
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

