const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up test users...\n')

  // Delete test users (keeping only the two admin accounts)
  const testUsers = await prisma.users.deleteMany({
    where: {
      email: {
        contains: 'test-',
      },
    },
  })

  const duplicateUsers = await prisma.users.deleteMany({
    where: {
      email: {
        contains: 'duplicate-',
      },
    },
  })

  const exampleUsers = await prisma.users.deleteMany({
    where: {
      email: {
        endsWith: '@example.com',
      },
    },
  })

  const totalDeleted = testUsers.count + duplicateUsers.count + exampleUsers.count

  console.log(`✅ Deleted ${totalDeleted} test user(s)`)

  // Show remaining users
  const remainingUsers = await prisma.users.findMany({
    select: {
      email: true,
      name: true,
      role: true,
    },
  })

  console.log('\n📋 Remaining users:')
  remainingUsers.forEach((user) => {
    console.log(`- ${user.email} (${user.name}) - ${user.role}`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })