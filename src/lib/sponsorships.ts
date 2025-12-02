import { SponsorTier } from '@prisma/client'

/**
 * Sponsorship tier thresholds and information
 * Bronze: $10,000 - 5 VIP Powwow tickets
 * Silver: $20,000 - 10 VIP Powwow tickets
 * Gold: $50,000 - 25 VIP Powwow tickets + Indian Canyon Cultural Experience
 */
export const TIER_INFO = {
  bronze: {
    name: 'Bronze',
    minAmount: 10000,
    maxAmount: 19999,
    color: '#CD7F32', // Bronze metallic
    bgGradient: 'from-amber-600/20 to-amber-800/10',
    borderColor: 'border-amber-600',
    description: 'Foundation Partner',
    vipTickets: 5,
    culturalTour: null,
  },
  silver: {
    name: 'Silver',
    minAmount: 20000,
    maxAmount: 49999,
    color: '#C0C0C0', // Silver metallic
    bgGradient: 'from-gray-300/30 to-gray-500/10',
    borderColor: 'border-gray-400',
    description: 'Community Champion',
    vipTickets: 10,
    culturalTour: null,
  },
  gold: {
    name: 'Gold',
    minAmount: 50000,
    maxAmount: Infinity,
    color: '#FFD700', // Gold
    bgGradient: 'from-yellow-400/30 to-amber-500/20',
    borderColor: 'border-yellow-500',
    description: 'Visionary Leader',
    vipTickets: 25,
    culturalTour: {
      name: 'Indian Canyon Cultural Experience',
      guests: 50,
      description: 'An exclusive private tour at Indian Canyon, a sacred Costanoan Ohlone cultural site.',
      themes: [
        'Native Cooking',
        'Traditional Crafts & Gardening',
        'Local Native Customs & Education',
      ],
    },
  },
} as const

/**
 * Calculate sponsor tier based on total sponsorship amount
 * Bronze: $10,000+ (5 VIP tickets)
 * Silver: $20,000+ (10 VIP tickets)
 * Gold: $50,000+ (25 VIP tickets)
 */
export function calculateSponsorTier(totalAmount: number): SponsorTier | null {
  if (totalAmount >= TIER_INFO.gold.minAmount) {
    return 'gold'
  } else if (totalAmount >= TIER_INFO.silver.minAmount) {
    return 'silver'
  } else if (totalAmount >= TIER_INFO.bronze.minAmount) {
    return 'bronze'
  }
  return null // Below threshold
}

/**
 * Get tier display name
 */
export function getTierName(tier: SponsorTier | null): string {
  if (!tier) return 'Supporter'
  return TIER_INFO[tier].name
}

/**
 * Get tier color for UI display
 */
export function getTierColor(tier: SponsorTier | null): string {
  if (!tier) return '#6B7280' // stone-gray
  return TIER_INFO[tier].color
}

/**
 * Get tier description
 */
export function getTierDescription(tier: SponsorTier | null): string {
  if (!tier) return 'Community Supporter'
  return TIER_INFO[tier].description
}

/**
 * Get tier background gradient class
 */
export function getTierGradient(tier: SponsorTier | null): string {
  if (!tier) return 'from-gray-100 to-gray-50'
  return TIER_INFO[tier].bgGradient
}

/**
 * Get tier border color class
 */
export function getTierBorderColor(tier: SponsorTier | null): string {
  if (!tier) return 'border-gray-300'
  return TIER_INFO[tier].borderColor
}

/**
 * Get tier minimum amount
 */
export function getTierMinAmount(tier: SponsorTier): number {
  return TIER_INFO[tier].minAmount
}

/**
 * Order tiers by priority (gold first)
 */
export const TIER_ORDER: SponsorTier[] = ['gold', 'silver', 'bronze']

/**
 * Get tier rank (for sorting, lower is higher priority)
 */
export function getTierRank(tier: SponsorTier | null): number {
  if (!tier) return 999
  return TIER_ORDER.indexOf(tier)
}
