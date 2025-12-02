import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getTierName, getTierColor } from '@/lib/sponsorships'
import { Building2, User, Plus, Pencil, Crown, Medal, Award, Archive, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DeleteSponsorButton } from '@/components/admin/delete-sponsor-button'
import { ToggleSponsorStatusButton } from '@/components/admin/toggle-sponsor-status-button'

const tierIcons = {
  gold: Crown,
  silver: Medal,
  bronze: Award,
}

export default async function ManageSponsorsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  const statusFilter = searchParams.status || 'all'

  // Fetch all sponsors
  const sponsors = await prisma.sponsors.findMany({
    where: statusFilter !== 'all' ? { status: statusFilter as 'active' | 'former' } : undefined,
    include: {
      users: {
        select: {
          email: true,
        },
      },
    },
    orderBy: [
      { status: 'asc' }, // Active first
      { tier: 'desc' },
      { displayName: 'asc' },
    ],
  })

  // Count by status
  const activeCount = sponsors.filter((s) => s.status === 'active').length
  const formerCount = sponsors.filter((s) => s.status === 'former').length

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
              Manage Sponsors
            </h1>
            <p className="text-stone-gray">
              {sponsors.length} {sponsors.length === 1 ? 'sponsor' : 'sponsors'}
              {statusFilter !== 'all' && ` (${statusFilter})`}
            </p>
          </div>
          <Button asChild className="bg-terracotta hover:bg-terracotta/90">
            <Link href="/portal/admin/sponsors/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Sponsor
            </Link>
          </Button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Link
            href="/portal/admin/sponsors"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-terracotta text-white'
                : 'bg-white text-stone-gray hover:bg-gray-100'
            }`}
          >
            All ({activeCount + formerCount})
          </Link>
          <Link
            href="/portal/admin/sponsors?status=active"
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              statusFilter === 'active'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-stone-gray hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Active ({activeCount})
          </Link>
          <Link
            href="/portal/admin/sponsors?status=former"
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              statusFilter === 'former'
                ? 'bg-gray-500 text-white'
                : 'bg-white text-stone-gray hover:bg-gray-100'
            }`}
          >
            <Archive className="w-4 h-4" />
            Former ({formerCount})
          </Link>
        </div>

        {/* Sponsors List */}
        {sponsors.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray mb-4">
                {statusFilter !== 'all'
                  ? `No ${statusFilter} sponsors`
                  : 'No sponsors yet'}
              </p>
              {statusFilter === 'all' && (
                <Button asChild className="bg-terracotta hover:bg-terracotta/90">
                  <Link href="/portal/admin/sponsors/new">Add Your First Sponsor</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sponsors.map((sponsor) => {
              const TierIcon = sponsor.tier ? tierIcons[sponsor.tier as keyof typeof tierIcons] : null
              const isFormer = sponsor.status === 'former'

              return (
                <Card
                  key={sponsor.id}
                  className={`hover:shadow-lg transition-shadow ${
                    isFormer ? 'opacity-75 bg-gray-50' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Logo/Icon */}
                      <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                        {sponsor.sponsorType === 'company' && sponsor.logoUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={sponsor.logoUrl}
                              alt={`${sponsor.displayName} logo`}
                              width={96}
                              height={96}
                              className={`object-contain ${isFormer ? 'grayscale' : ''}`}
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center ${
                              isFormer
                                ? 'bg-gray-200'
                                : 'bg-gradient-to-br from-terracotta/20 to-sage-green/20'
                            }`}
                          >
                            {sponsor.sponsorType === 'company' ? (
                              <Building2 className={`w-10 h-10 ${isFormer ? 'text-gray-400' : 'text-terracotta'}`} />
                            ) : (
                              <User className={`w-10 h-10 ${isFormer ? 'text-gray-400' : 'text-sage-green'}`} />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Sponsor Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-charcoal">
                              {sponsor.displayName}
                            </h3>
                            {/* Status Badge */}
                            <Badge
                              variant={isFormer ? 'secondary' : 'default'}
                              className={
                                isFormer
                                  ? 'bg-gray-200 text-gray-600'
                                  : 'bg-emerald-100 text-emerald-700'
                              }
                            >
                              {isFormer ? 'Former' : 'Active'}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <ToggleSponsorStatusButton
                              sponsorId={sponsor.id}
                              currentStatus={sponsor.status}
                              sponsorName={sponsor.displayName}
                            />
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-terracotta text-terracotta hover:bg-terracotta/10"
                            >
                              <Link href={`/portal/admin/sponsors/${sponsor.id}/edit`}>
                                <Pencil className="w-4 h-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <DeleteSponsorButton sponsorId={sponsor.id} sponsorName={sponsor.displayName} />
                          </div>
                        </div>
                        <p className="text-sm text-stone-gray mb-3">{sponsor.users.email}</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium capitalize">{sponsor.sponsorType}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tier</p>
                            {sponsor.tier && TierIcon ? (
                              <Badge
                                className="text-xs flex items-center gap-1 w-fit"
                                style={{
                                  backgroundColor: getTierColor(sponsor.tier),
                                  color: 'white',
                                }}
                              >
                                <TierIcon className="w-3 h-3" />
                                {getTierName(sponsor.tier)}
                              </Badge>
                            ) : (
                              <p className="font-medium text-stone-gray">None</p>
                            )}
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Amount</p>
                            <p className="font-medium">
                              ${sponsor.totalAmount.toNumber().toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Member Since</p>
                            <p className="font-medium">
                              {new Date(sponsor.memberSince).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          {sponsor.contactName && (
                            <div>
                              <p className="text-muted-foreground">Contact</p>
                              <p className="font-medium">{sponsor.contactName}</p>
                            </div>
                          )}
                        </div>

                        {sponsor.location && (
                          <div className="mt-3 text-sm">
                            <span className="text-muted-foreground">Location: </span>
                            <span>{sponsor.location}</span>
                          </div>
                        )}

                        {sponsor.website && (
                          <div className="mt-1 text-sm">
                            <span className="text-muted-foreground">Website: </span>
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-terracotta hover:underline"
                            >
                              {sponsor.website}
                            </a>
                          </div>
                        )}

                        {sponsor.notes && (
                          <div className="mt-3 p-3 bg-warm-gray/50 rounded-md text-sm">
                            <p className="text-muted-foreground mb-1">Admin Notes:</p>
                            <p className="text-charcoal">{sponsor.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
