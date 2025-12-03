/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const emailsToDelete = [
    'yamenthebaker@gmail.com',
    'yamenmkbz@gmail.com'
  ]

  console.log('🗑️  Deleting specific users...\n')

  for (const email of emailsToDelete) {
    // First check if there's a sponsor record linked to this user
    const user = await prisma.users.findUnique({
      where: { email },
      include: { sponsors: true }
    })

    if (!user) {
      console.log(`⚠️  User not found: ${email}`)
      continue
    }

    // If user has a sponsor record, delete it first (cascades sponsorships)
    if (user.sponsors) {
      await prisma.sponsors.delete({
        where: { userId: user.id }
      })
      console.log(`   Deleted sponsor record for: ${email}`)
    }

    // Now delete the user
    await prisma.users.delete({
      where: { email }
    })
    console.log(`✅ Deleted user: ${email}`)
  }

  console.log('\n✅ Done!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

