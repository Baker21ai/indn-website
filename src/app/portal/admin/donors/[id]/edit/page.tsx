import { auth } from '@/auth.config'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { EditDonorForm } from '@/components/admin/edit-donor-form'

export default async function EditDonorPage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  const donor = await prisma.donors.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!donor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Edit Donor
          </h1>
          <p className="text-stone-gray">Update donor information and settings</p>
        </div>

        <EditDonorForm donor={donor} />
      </div>
    </div>
  )
}
