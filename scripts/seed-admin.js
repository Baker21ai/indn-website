const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@indn.org'
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
  const name = 'Admin User'

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
    },
  })

  console.log('✅ Admin user created successfully!')
  console.log('📧 Email:', admin.email)
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
