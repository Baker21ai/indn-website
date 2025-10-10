const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const email = 'yamenmkbz@gmail.com'
  const newPassword = 'ChangeMe123!'

  const passwordHash = await bcrypt.hash(newPassword, 12)

  await prisma.users.update({
    where: { email },
    data: { passwordHash },
  })

  console.log('✅ Password reset successfully!')
  console.log('📧 Email:', email)
  console.log('🔑 New Password:', newPassword)
  console.log('\n⚠️  Change this password after logging in!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
