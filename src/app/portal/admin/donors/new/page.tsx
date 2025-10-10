import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { AddDonorForm } from '@/components/admin/add-donor-form'

export default async function NewDonorPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Add New Donor
          </h1>
          <p className="text-stone-gray">
            Manually add a donor to the system and donor wall
          </p>
        </div>

        <AddDonorForm />
      </div>
    </div>
  )
}
