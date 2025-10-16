/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const email = 'yamenmkbz@gmail.com'
  const password = 'ChangeMe123!' // Change this password after first login
  const name = 'Yamen'

  // Check if admin already exists
  const existing = await prisma.users.findUnique({
    where: { email },
  })

  if (existing) {
    console.log('✅ Admin user already exists:', email)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const admin = await prisma.users.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'admin',
      isActive: true,
      emailVerified: new Date(), // Mark as verified since this is the main admin
    },
  })

  console.log('✅ Admin user created successfully!')
  console.log('📧 Email:', admin.email)
  console.log('👤 Name:', admin.name)
  console.log('🔑 Password:', password)
  console.log('\n⚠️  IMPORTANT: Change your password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
