'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getTierName } from '@/lib/sponsorships'
import { STATIC_SPONSORS, type StaticSponsor } from '@/data/sponsors'
import {
  Building,
  User,
  Crown,
  Medal,
  Award,
  Heart,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Handshake,
} from 'lucide-react'
import { FiscalSponsorNotice } from '@/components/fiscal-sponsor-notice'

type SponsorTier = 'gold' | 'silver' | 'bronze'

interface Sponsor {
  id: string
  sponsorType: 'individual' | 'company'
  displayName: string
  tier: SponsorTier | null
  status: 'active' | 'former'
  location: string | null
  logoUrl: string | null
  website: string | null
  memberSince: string
}

const tierIcons = {
  gold: Crown,
  silver: Medal,
  bronze: Award,
}

const tierStyles = {
  gold: {
    gradient: 'from-yellow-300 via-yellow-400 to-amber-500',
    bgGradient: 'from-yellow-50 via-amber-50 to-yellow-100',
    border: 'border-yellow-400',
    text: 'text-yellow-700',
    iconBg: 'bg-gradient-to-br from-yellow-300 to-amber-500',
  },
  silver: {
    gradient: 'from-gray-200 via-gray-300 to-gray-400',
    bgGradient: 'from-gray-50 via-slate-50 to-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-600',
    iconBg: 'bg-gradient-to-br from-gray-300 to-gray-500',
  },
  bronze: {
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
    bgGradient: 'from-amber-50 via-orange-50 to-amber-100',
    border: 'border-amber-500',
    text: 'text-amber-700',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700',
  },
}

function SponsorCard({
  sponsor,
  size = 'medium',
}: {
  sponsor: Sponsor
  size?: 'large' | 'medium' | 'small'
}) {
  const tier = sponsor.tier as keyof typeof tierStyles | null
  const styles = tier ? tierStyles[tier] : null
  const Icon = tier ? tierIcons[tier] : null

  const sizeClasses = {
    large: 'p-8',
    medium: 'p-6',
    small: 'p-4',
  }

  const logoSizes = {
    large: { width: 280, height: 180, className: 'max-h-[160px]' },
    medium: { width: 240, height: 150, className: 'max-h-[130px]' },
    small: { width: 200, height: 120, className: 'max-h-[100px]' },
  }

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-500 bg-white ${
        tier === 'gold'
          ? 'border-yellow-100/60 hover:border-yellow-400/40'
          : tier === 'silver'
          ? 'border-stone-100 hover:border-stone-300/50'
          : 'border-stone-100 hover:border-amber-200/50'
      } border hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] h-full`}
    >
        <CardContent className={`${sizeClasses[size]} flex flex-col items-center justify-center h-full`}>
        {/* Logo */}
        {sponsor.logoUrl && (
          <div className={`flex justify-center items-center mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${size === 'large' ? 'h-44' : size === 'medium' ? 'h-36' : 'h-28'}`}>
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.displayName} logo`}
                width={logoSizes[size].width}
                height={logoSizes[size].height}
                className={`object-contain grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 ${logoSizes[size].className} group-hover:scale-[1.02]`}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        )}

        {/* Sponsor Info */}
        <div className={`text-center w-full ${(!sponsor.logoUrl) ? 'py-4' : ''}`}>
          <h3 className={`font-serif font-bold text-charcoal leading-tight ${size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'}`}>
            {sponsor.displayName}
          </h3>

          {sponsor.location && (
            <p className="text-sm text-stone-gray mt-2 uppercase tracking-[0.2em] font-medium opacity-60">{sponsor.location}</p>
          )}

          {/* Tier Badge */}
          {tier && Icon && (
            <div className="flex justify-center pt-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <Badge
                className={`flex items-center gap-1.5 px-3 py-1 font-medium border-0 ${
                  tier === 'gold'
                    ? 'bg-yellow-50 text-yellow-800/80'
                    : tier === 'silver'
                    ? 'bg-stone-50 text-stone-600/80'
                    : 'bg-amber-50 text-amber-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {getTierName(tier)} Sponsor
              </Badge>
            </div>
          )}

          {/* Website Link */}
          {sponsor.website && size !== 'small' && (
            <div className="pt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-terracotta hover:text-terracotta/80 transition-colors font-medium"
              >
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Member Since */}
          <p className="text-xs text-stone-300 pt-2">
            Partner since{' '}
            {new Date(sponsor.memberSince).toLocaleDateString('en-US', {
              year: 'numeric',
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function TierSection({
  tier,
  sponsors,
  size,
}: {
  tier: 'gold' | 'silver' | 'bronze'
  sponsors: Sponsor[]
  size: 'large' | 'medium' | 'small'
}) {
  const Icon = tierIcons[tier]
  const styles = tierStyles[tier]

  if (sponsors.length === 0) return null

  const widthClasses = {
    large: 'w-full sm:max-w-[400px]',
    medium: 'w-full sm:max-w-[320px]',
    small: 'w-full sm:max-w-[260px]',
  }

  return (
    <div className="mb-12 md:mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
            {getTierName(tier)} Sponsors
          </h2>
          <p className="text-stone-gray text-sm">{sponsors.length} {sponsors.length === 1 ? 'sponsor' : 'sponsors'}</p>
        </div>
      </div>

      {/* Sponsor Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className={widthClasses[size]}>
            <SponsorCard sponsor={sponsor} size={size} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SponsorsPage() {
  // Compute sponsors directly from static data
  const sponsors = STATIC_SPONSORS.filter((s) => s.status === 'active') as Sponsor[]
  const formerSponsors = STATIC_SPONSORS.filter((s) => s.status === 'former') as Sponsor[]
  const [showFormer, setShowFormer] = useState(false)

  // Group sponsors by tier
  const goldSponsors = sponsors.filter((s) => s.tier === 'gold')
  const silverSponsors = sponsors.filter((s) => s.tier === 'silver')
  const bronzeSponsors = sponsors.filter((s) => s.tier === 'bronze')

  const hasActiveSponsors = goldSponsors.length > 0 || silverSponsors.length > 0 || bronzeSponsors.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray via-white to-warm-gray py-12 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 border border-terracotta/20 mb-6">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-label-badge text-terracotta">
              Our Community Partners
            </span>
          </div>
          <h1 className="text-hero text-charcoal mb-4">
            Thank You to Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-gray-400 to-amber-600">
              Sponsors
            </span>
          </h1>
          <p className="text-body text-stone-gray max-w-2xl mx-auto">
            These generous organizations and individuals make our mission possible
          </p>
        </div>

        {!hasActiveSponsors ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-terracotta" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Be Our First Sponsor
            </h2>
            <p className="text-stone-gray mb-8 max-w-md mx-auto">
              Join us in preserving Indigenous culture and empowering communities.
              Your sponsorship makes a lasting impact.
            </p>
            <Button asChild className="bg-terracotta hover:bg-terracotta/90 text-white">
              <Link href="/sponsor/packages">View Sponsorship Packages</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Gold Sponsors - Large */}
            <TierSection tier="gold" sponsors={goldSponsors} size="large" />

            {/* Silver Sponsors - Medium */}
            <TierSection tier="silver" sponsors={silverSponsors} size="medium" />

            {/* Bronze Sponsors - Small */}
            <TierSection tier="bronze" sponsors={bronzeSponsors} size="small" />

            {/* Former Sponsors Section */}
            {formerSponsors.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setShowFormer(!showFormer)}
                  className="w-full flex items-center justify-center gap-2 py-4 text-stone-gray hover:text-charcoal transition-colors"
                >
                  <span className="font-medium">Former Sponsors ({formerSponsors.length})</span>
                  {showFormer ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {showFormer && (
                  <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="text-center text-stone-gray mb-6">
                      We appreciate the past support of these sponsors
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {formerSponsors.map((sponsor) => (
                        <Card
                          key={sponsor.id}
                          className="border border-gray-200 bg-gray-50/50"
                        >
                          <CardContent className="p-4 text-center">
                            <div className="h-12 flex items-center justify-center mb-2">
                              {sponsor.logoUrl ? (
                                <Image
                                  src={sponsor.logoUrl}
                                  alt={sponsor.displayName}
                                  width={80}
                                  height={50}
                                  className="object-contain grayscale max-h-[40px]"
                                  style={{ width: 'auto' }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Building className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-600 truncate">
                              {sponsor.displayName}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-br from-charcoal to-charcoal/90 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join Our Circle of Supporters
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Become a sponsor and help us preserve Indigenous culture, support youth programs, 
                and strengthen communities across 12+ tribal nations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-white"
                >
                  <Link href="/sponsor/packages" className="flex items-center gap-2">
                    View Sponsorship Packages
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  <Link href="/sponsor/apply">Apply Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fiscal Sponsor Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Handshake className="w-5 h-5 text-stone-gray" />
            <h3 className="text-lg font-semibold text-stone-gray">Fiscal Sponsor</h3>
          </div>
          <div className="max-w-xl mx-auto">
            <FiscalSponsorNotice variant="full" showTaxId />
          </div>
        </div>
      </div>
    </div>
  )
}
