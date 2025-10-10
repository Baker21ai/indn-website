import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function PortalPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // Redirect based on role
  if (session.user.role === 'admin') {
    redirect('/portal/admin/dashboard')
  } else if (session.user.role === 'board_member') {
    redirect('/portal/board/dashboard')
  } else {
    redirect('/portal/volunteer/dashboard')
  }
}
