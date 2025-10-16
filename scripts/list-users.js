/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  console.log('\n📋 All users in database:\n')

  if (users.length === 0) {
    console.log('No users found!')
  } else {
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`)
      console.log(`   Name: ${user.name}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Active: ${user.isActive}`)
      console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`)
      console.log(`   Created: ${user.createdAt}`)
      console.log(`   ID: ${user.id}`)
      console.log('')
    })
    console.log(`Total: ${users.length} user(s)`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
