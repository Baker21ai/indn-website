import { auth } from '@/auth.config'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { EditSponsorForm } from '@/components/admin/edit-sponsor-form'

export default async function EditSponsorPage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  const sponsor = await prisma.sponsors.findUnique({
    where: { id: params.id },
    include: {
      users: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!sponsor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Edit Sponsor
          </h1>
          <p className="text-stone-gray">Update sponsor information and settings</p>
        </div>

        <EditSponsorForm sponsor={sponsor} />
      </div>
    </div>
  )
}
