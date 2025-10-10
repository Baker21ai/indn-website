import { DonorTier } from '@prisma/client'

/**
 * Calculate donor tier based on total donated amount
 * Turtle: $100-$999
 * Wolf: $1,000-$4,999
 * Bear: $5,000-$9,999
 * Eagle: $10,000+
 */
export function calculateDonorTier(totalDonated: number): DonorTier | null {
  if (totalDonated >= 10000) {
    return 'eagle'
  } else if (totalDonated >= 5000) {
    return 'bear'
  } else if (totalDonated >= 1000) {
    return 'wolf'
  } else if (totalDonated >= 100) {
    return 'turtle'
  }
  return null // Below $100 threshold
}

/**
 * Get tier display name
 */
export function getTierName(tier: DonorTier | null): string {
  if (!tier) return 'Supporter'

  const tierNames: Record<DonorTier, string> = {
    turtle: 'Turtle',
    wolf: 'Wolf',
    bear: 'Bear',
    eagle: 'Eagle',
  }

  return tierNames[tier]
}

/**
 * Get tier color for UI display
 */
export function getTierColor(tier: DonorTier | null): string {
  if (!tier) return '#6B7280' // stone-gray

  const tierColors: Record<DonorTier, string> = {
    turtle: '#10B981', // turtle-emerald
    wolf: '#6B7280',   // wolf-silver
    bear: '#F97316',   // bear-amber
    eagle: '#F59E0B',  // eagle-gold
  }

  return tierColors[tier]
}
