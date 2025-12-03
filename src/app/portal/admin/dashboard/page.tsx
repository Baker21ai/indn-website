import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { getTierName } from '@/lib/sponsorships'

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  // Fetch metrics
  const [sponsorshipsData, sponsorsData, volunteersData] = await Promise.all([
    // Total sponsorship amounts
    prisma.sponsorships.aggregate({
      _sum: {
        amount: true,
      },
      _count: true,
    }),
    // Total sponsors
    prisma.sponsors.count({
      where: {
        status: 'active',
      },
    }),
    // Total volunteers
    prisma.users.count({
      where: {
        role: 'volunteer',
      },
    }),
  ])

  const totalSponsorships = sponsorshipsData._sum.amount?.toNumber() || 0
  const sponsorshipCount = sponsorshipsData._count
  const sponsorCount = sponsorsData
  const volunteerCount = volunteersData

  // Recent sponsors
  const recentSponsors = await prisma.sponsors.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      users: {
        select: {
          name: true,
          email: true,
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
                Total Sponsorships (YTD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">
                ${totalSponsorships.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {sponsorshipCount} sponsorships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-stone-gray">
                Active Sponsors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sage-green">
                {sponsorCount}
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
                Avg. Sponsorship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warm-earth">
                ${sponsorshipCount > 0 ? (totalSponsorships / sponsorshipCount).toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Per transaction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sponsors */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSponsors.length === 0 ? (
              <p className="text-stone-gray text-center py-4">No sponsors yet</p>
            ) : (
              <div className="space-y-4">
                {recentSponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{sponsor.displayName}</p>
                      <p className="text-sm text-stone-gray">
                        {sponsor.contactEmail || sponsor.users.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(sponsor.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      {sponsor.tier && (
                        <p className="text-lg font-bold text-terracotta">
                          {getTierName(sponsor.tier)}
                        </p>
                      )}
                      <p className={`text-xs ${sponsor.status === 'active' ? 'text-sage-green' : 'text-stone-gray'}`}>
                        {sponsor.status === 'active' ? 'Active' : 'Former'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/portal/admin/sponsors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Manage Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and manage sponsor profiles
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

          <Link href="/sponsors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-base">Sponsors Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View public sponsor recognition
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
