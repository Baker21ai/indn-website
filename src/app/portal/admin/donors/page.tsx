import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getTierName, getTierColor } from '@/lib/donations'
import { Building2, User, Plus, Pencil } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DeleteDonorButton } from '@/components/admin/delete-donor-button'

export default async function ManageDonorsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  // Fetch all donors
  const donors = await prisma.donors.findMany({
    include: {
      users: {
        select: {
          email: true,
        },
      },
    },
    orderBy: [
      { tier: 'desc' },
      { displayName: 'asc' },
    ],
  })

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
              Manage Donors
            </h1>
            <p className="text-stone-gray">
              {donors.length} {donors.length === 1 ? 'donor' : 'donors'} total
            </p>
          </div>
          <Button asChild className="bg-terracotta hover:bg-terracotta/90">
            <Link href="/portal/admin/donors/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Donor
            </Link>
          </Button>
        </div>

        {/* Donors List */}
        {donors.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-stone-gray mb-4">No donors yet</p>
              <Button asChild className="bg-terracotta hover:bg-terracotta/90">
                <Link href="/portal/admin/donors/new">Add Your First Donor</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {donors.map((donor) => (
              <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Logo/Icon */}
                    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                      {donor.donorType === 'company' && donor.logoUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={donor.logoUrl}
                            alt={`${donor.displayName} logo`}
                            width={96}
                            height={96}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-terracotta/20 to-sage-green/20 flex items-center justify-center">
                          {donor.donorType === 'company' ? (
                            <Building2 className="w-10 h-10 text-terracotta" />
                          ) : (
                            <User className="w-10 h-10 text-sage-green" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Donor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-charcoal">
                            {donor.displayName}
                          </h3>
                          <p className="text-sm text-stone-gray">{donor.users.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="border-terracotta text-terracotta hover:bg-terracotta/10"
                          >
                            <Link href={`/portal/admin/donors/${donor.id}/edit`}>
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <DeleteDonorButton donorId={donor.id} donorName={donor.displayName} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium capitalize">{donor.donorType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tier</p>
                          {donor.tier ? (
                            <Badge
                              style={{
                                backgroundColor: getTierColor(donor.tier),
                                color: 'white',
                              }}
                              className="text-xs"
                            >
                              {getTierName(donor.tier)}
                            </Badge>
                          ) : (
                            <p className="font-medium text-stone-gray">None</p>
                          )}
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Donated</p>
                          <p className="font-medium">
                            ${donor.totalDonated.toNumber().toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Member Since</p>
                          <p className="font-medium">
                            {new Date(donor.memberSince).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      {donor.location && (
                        <div className="mt-3 text-sm">
                          <span className="text-muted-foreground">Location: </span>
                          <span>{donor.location}</span>
                        </div>
                      )}

                      {donor.website && (
                        <div className="mt-1 text-sm">
                          <span className="text-muted-foreground">Website: </span>
                          <a
                            href={donor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terracotta hover:underline"
                          >
                            {donor.website}
                          </a>
                        </div>
                      )}

                      {donor.notes && (
                        <div className="mt-3 p-3 bg-warm-gray/50 rounded-md text-sm">
                          <p className="text-muted-foreground mb-1">Admin Notes:</p>
                          <p className="text-charcoal">{donor.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
