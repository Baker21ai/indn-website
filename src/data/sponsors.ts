/**
 * Static sponsor data for immediate display
 * This serves as a fallback when database is unavailable
 * and as the source of truth for current sponsors
 */

export interface StaticSponsor {
  id: string
  sponsorType: 'individual' | 'company'
  displayName: string
  tier: 'gold' | 'silver' | 'bronze'
  location: string | null
  logoUrl: string | null
  website: string | null
  memberSince: string
  status: 'active' | 'former'
}

export const STATIC_SPONSORS: StaticSponsor[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // GOLD TIER SPONSORS ($50,000+)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sponsor-james-connor',
    sponsorType: 'individual',
    displayName: 'James White Bear Connor',
    tier: 'gold',
    location: null,
    logoUrl: null, // Individual sponsor - uses icon
    website: null,
    memberSince: '2024-01-01',
    status: 'active',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SILVER TIER SPONSORS ($20,000+)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sponsor-tara-stein',
    sponsorType: 'individual',
    displayName: 'Tara Dianne Stein',
    tier: 'silver',
    location: null,
    logoUrl: null, // Individual sponsor - uses icon
    website: null,
    memberSince: '2024-01-01',
    status: 'active',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BRONZE TIER SPONSORS ($10,000+)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sponsor-city-hollister',
    sponsorType: 'company',
    displayName: 'City of Hollister',
    tier: 'bronze',
    location: 'Hollister, CA',
    logoUrl: '/images/sponsors/bronze/city-of-hollister.png',
    website: 'https://hollister.ca.gov',
    memberSince: '2024-01-01',
    status: 'active',
  },
  {
    id: 'sponsor-gavilan-college',
    sponsorType: 'company',
    displayName: 'Gavilan College',
    tier: 'bronze',
    location: 'Gilroy, CA',
    logoUrl: '/images/sponsors/bronze/gavilan-college.png',
    website: 'https://www.gavilan.edu',
    memberSince: '2024-01-01',
    status: 'active',
  },
]

// Helper functions
export function getActiveSponsors(): StaticSponsor[] {
  return STATIC_SPONSORS.filter(s => s.status === 'active')
}

export function getSponsorsByTier(tier: 'gold' | 'silver' | 'bronze'): StaticSponsor[] {
  return getActiveSponsors().filter(s => s.tier === tier)
}

export function getGoldSponsors(): StaticSponsor[] {
  return getSponsorsByTier('gold')
}

export function getSilverSponsors(): StaticSponsor[] {
  return getSponsorsByTier('silver')
}

export function getBronzeSponsors(): StaticSponsor[] {
  return getSponsorsByTier('bronze')
}

