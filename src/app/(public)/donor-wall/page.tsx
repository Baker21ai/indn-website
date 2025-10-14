'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getTierName, getTierColor } from '@/lib/donations'
import { DonorTier } from '@prisma/client'
import { Building, User, Shield, PawPrint, Mountain, Bird } from 'lucide-react'

interface Donor {
  id: string
  donorType: 'individual' | 'company'
  displayName: string
  tier: DonorTier | null
  location: string | null
  logoUrl: string | null
  memberSince: string
}

export default function DonorWallPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const donorsPerPage = 12

  useEffect(() => {
    fetchDonors()
  }, [])

  useEffect(() => {
    filterDonors()
  }, [donors, searchQuery, tierFilter, typeFilter])

  async function fetchDonors() {
    try {
      const response = await fetch('/api/donors')
      const data = await response.json()
      setDonors(data.donors || [])
    } catch (error) {
      console.error('Failed to fetch donors:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function filterDonors() {
    let filtered = [...donors]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(donor =>
        donor.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by tier
    if (tierFilter !== 'all') {
      filtered = filtered.filter(donor => donor.tier === tierFilter)
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(donor => donor.donorType === typeFilter)
    }

    setFilteredDonors(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const indexOfLastDonor = currentPage * donorsPerPage
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage
  const currentDonors = filteredDonors.slice(indexOfFirstDonor, indexOfLastDonor)
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage)

  return (
    <div className="min-h-screen bg-warm-gray py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4 tracking-tight">
            Our Generous Supporters
          </h1>
          <p className="text-lg text-stone-gray max-w-2xl mx-auto font-normal leading-relaxed">
            Thank you to the individuals and organizations making our mission possible
          </p>
          <p className="text-xl font-semibold mt-4 text-charcoal tracking-tight">
            {filteredDonors.length} {filteredDonors.length === 1 ? 'Supporter' : 'Supporters'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="eagle">
                  <div className="flex items-center gap-2">
                    <Bird size={16} />
                    Eagle
                  </div>
                </SelectItem>
                <SelectItem value="bear">
                  <div className="flex items-center gap-2">
                    <Mountain size={16} />
                    Bear
                  </div>
                </SelectItem>
                <SelectItem value="wolf">
                  <div className="flex items-center gap-2">
                    <PawPrint size={16} />
                    Wolf
                  </div>
                </SelectItem>
                <SelectItem value="turtle">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    Turtle
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="company">Companies</SelectItem>
                <SelectItem value="individual">Individuals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Donors Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-stone-gray">Loading supporters...</p>
          </div>
        ) : currentDonors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-gray">
              {searchQuery || tierFilter !== 'all' || typeFilter !== 'all'
                ? 'No supporters found matching your criteria.'
                : 'No supporters to display yet. Be the first to contribute!'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentDonors.map((donor) => (
                <Card
                  key={donor.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                  style={{
                    borderColor: donor.tier ? `${getTierColor(donor.tier)}40` : undefined,
                    borderWidth: '2px'
                  }}
                >
                  <CardContent className="p-6">
                    {/* Logo or Icon */}
                    <div className="flex justify-center items-center mb-4 h-32">
                      {donor.donorType === 'company' && donor.logoUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={donor.logoUrl}
                            alt={`${donor.displayName} logo`}
                            width={200}
                            height={120}
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                            style={{ maxHeight: '120px', width: 'auto' }}
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta/20 to-sage-green/20 flex items-center justify-center">
                          {donor.donorType === 'company' ? (
                            <Building size={48} className="text-terracotta" />
                          ) : (
                            <User size={48} className="text-sage-green" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Donor Info */}
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg text-charcoal leading-tight">
                        {donor.displayName}
                      </h3>
                      <p className="text-sm text-stone-gray">
                        {donor.location || 'Location withheld'}
                      </p>

                      {/* Tier Badge */}
                      {donor.tier && (
                        <div className="flex justify-center pt-2">
                          <Badge
                            style={{
                              backgroundColor: getTierColor(donor.tier),
                              color: 'white'
                            }}
                            className="text-sm px-3 py-1"
                          >
                            {getTierName(donor.tier)} Tier
                          </Badge>
                        </div>
                      )}

                      {/* Member Since */}
                      <p className="text-xs text-muted-foreground pt-2">
                        Supporting since {new Date(donor.memberSince).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2 rounded-md bg-white border-2 border-terracotta text-terracotta disabled:opacity-30 disabled:cursor-not-allowed hover:bg-terracotta hover:text-white transition-colors font-medium"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-stone-gray font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 rounded-md bg-white border-2 border-terracotta text-terracotta disabled:opacity-30 disabled:cursor-not-allowed hover:bg-terracotta hover:text-white transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
