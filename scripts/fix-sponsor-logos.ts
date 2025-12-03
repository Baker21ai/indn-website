/**
 * Script to fix sponsor logo URLs in the database
 * Run with: npx tsx scripts/fix-sponsor-logos.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const logoFixes = [
  {
    displayName: 'City of Hollister',
    oldLogoUrl: '/images/sponsors/bronze/city-of-hollister.png',
    newLogoUrl: '/images/sponsors/bronze/hollister.svg',
  },
  {
    displayName: 'Gavilan College',
    oldLogoUrl: '/images/sponsors/bronze/gavilan-college.png',
    newLogoUrl: '/images/sponsors/bronze/gavilan.svg',
  },
]

async function main() {
  console.log('🔧 Fixing sponsor logo URLs...\n')

  for (const fix of logoFixes) {
    try {
      const result = await prisma.sponsors.updateMany({
        where: {
          displayName: fix.displayName,
        },
        data: {
          logoUrl: fix.newLogoUrl,
        },
      })

      if (result.count > 0) {
        console.log(`✅ Updated ${fix.displayName}: ${fix.newLogoUrl}`)
      } else {
        console.log(`⏭️  No record found for ${fix.displayName}`)
      }
    } catch (error) {
      console.error(`❌ Error updating ${fix.displayName}:`, error)
    }
  }

  console.log('\n🎉 Done fixing sponsor logo URLs!')

  // List current sponsors with their logo URLs
  const sponsors = await prisma.sponsors.findMany({
    where: {
      sponsorType: 'company',
    },
    select: {
      displayName: true,
      logoUrl: true,
    },
  })

  console.log('\n📋 Current company sponsors and their logos:')
  sponsors.forEach((s) => {
    console.log(`   • ${s.displayName}: ${s.logoUrl || '(no logo)'}`)
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

