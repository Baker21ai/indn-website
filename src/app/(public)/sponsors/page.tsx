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
} from 'lucide-react'

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
    large: { width: 200, height: 120, className: 'max-h-[100px]' },
    medium: { width: 160, height: 100, className: 'max-h-[80px]' },
    small: { width: 120, height: 80, className: 'max-h-[60px]' },
  }

  const iconSizes = {
    large: 'w-16 h-16',
    medium: 'w-14 h-14',
    small: 'w-10 h-10',
  }

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        styles ? `border-2 ${styles.border}` : 'border border-gray-200'
      }`}
    >
      {/* Tier indicator bar */}
      {tier && (
        <div className={`h-1.5 bg-gradient-to-r ${styles!.gradient}`} />
      )}

      <CardContent className={sizeClasses[size]}>
        {/* Logo or Icon */}
        <div className={`flex justify-center items-center mb-4 ${size === 'large' ? 'h-32' : size === 'medium' ? 'h-28' : 'h-20'}`}>
          {sponsor.sponsorType === 'company' && sponsor.logoUrl ? (
            <div className="relative flex items-center justify-center">
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.displayName} logo`}
                width={logoSizes[size].width}
                height={logoSizes[size].height}
                className={`object-contain grayscale-[30%] group-hover:grayscale-0 transition-all duration-300 ${logoSizes[size].className}`}
                style={{ width: 'auto' }}
              />
            </div>
          ) : (
            <div
              className={`${iconSizes[size]} rounded-full flex items-center justify-center ${
                styles ? styles.iconBg : 'bg-gradient-to-br from-terracotta/20 to-sage-green/20'
              }`}
            >
              {sponsor.sponsorType === 'company' ? (
                <Building className={`${size === 'small' ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />
              ) : (
                <User className={`${size === 'small' ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />
              )}
            </div>
          )}
        </div>

        {/* Sponsor Info */}
        <div className="text-center space-y-2">
          <h3 className={`font-bold text-charcoal leading-tight ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
            {sponsor.displayName}
          </h3>

          {sponsor.location && (
            <p className="text-sm text-stone-gray">{sponsor.location}</p>
          )}

          {/* Tier Badge */}
          {tier && Icon && (
            <div className="flex justify-center pt-2">
              <Badge
                className={`flex items-center gap-1.5 px-3 py-1 ${
                  tier === 'gold'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white'
                    : tier === 'silver'
                    ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-700 text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {getTierName(tier)} Sponsor
              </Badge>
            </div>
          )}

          {/* Website Link */}
          {sponsor.website && size !== 'small' && (
            <div className="pt-2">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
              >
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Member Since */}
          <p className="text-xs text-muted-foreground pt-1">
            Partner since{' '}
            {new Date(sponsor.memberSince).toLocaleDateString('en-US', {
              month: 'long',
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

  const gridCols = {
    large: 'grid-cols-1 md:grid-cols-2',
    medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    small: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
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
      <div className={`grid ${gridCols[size]} gap-6`}>
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} size={size} />
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
            <span className="text-sm font-semibold text-terracotta tracking-wide">
              Our Community Partners
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 tracking-tight">
            Thank You to Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-gray-400 to-amber-600">
              Sponsors
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-gray max-w-2xl mx-auto leading-relaxed">
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
      </div>
    </div>
  )
}
