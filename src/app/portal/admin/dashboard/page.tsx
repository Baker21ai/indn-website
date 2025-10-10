import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  // Fetch metrics
  const [donationsData, donorsData, volunteersData] = await Promise.all([
    // Total donations
    prisma.donations.aggregate({
      _sum: {
        amount: true,
      },
      _count: true,
    }),
    // Total donors
    prisma.donors.count(),
    // Total volunteers
    prisma.users.count({
      where: {
        role: 'volunteer',
      },
    }),
  ])

  const totalDonations = donationsData._sum.amount?.toNumber() || 0
  const donationCount = donationsData._count
  const donorCount = donorsData
  const volunteerCount = volunteersData

  // Recent donations
  const recentDonations = await prisma.donations.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      donors: {
        include: {
          users: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Admin Dashboard
          </h1>
          <p className="text-stone-gray">Welcome back, {session.user.name}</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Total Donations (YTD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">
                ${totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {donationCount} donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Total Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sage-green">
                {donorCount}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Active supporters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky-blue">
                {volunteerCount}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Registered volunteers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Avg. Donation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warm-earth">
                ${donationCount > 0 ? (totalDonations / donationCount).toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Per transaction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentDonations.length === 0 ? (
              <p className="text-stone-gray text-center py-4">No donations yet</p>
            ) : (
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{donation.donors.users.name}</p>
                      <p className="text-sm text-stone-gray">
                        {donation.donors.users.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(donation.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-terracotta">
                        ${donation.amount.toNumber().toFixed(2)}
                      </p>
                      {donation.isRecurring && (
                        <p className="text-xs text-sage-green">Recurring</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/portal/admin/donors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Manage Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and manage donor profiles
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portal/admin/users">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create and manage user accounts
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/donor-wall">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Donor Wall</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View public donor recognition
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
