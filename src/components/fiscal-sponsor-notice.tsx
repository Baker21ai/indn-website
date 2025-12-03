'use client'

import Image from 'next/image'
import Link from 'next/link'

interface FiscalSponsorNoticeProps {
  variant?: 'footer' | 'full' | 'compact'
  showTaxId?: boolean
  className?: string
}

// Replace with actual Tax ID when provided
const TAX_ID = '[TAX ID]'

export function FiscalSponsorNotice({
  variant = 'compact',
  showTaxId = false,
  className = '',
}: FiscalSponsorNoticeProps) {
  if (variant === 'footer') {
    return (
      <div className={`flex items-center justify-center gap-2 text-xs text-white/50 ${className}`}>
        <span>INDN is a fiscally sponsored project of</span>
        <Link
          href="https://www.youthalliance.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-white/70 transition-colors"
        >
          <Image
            src="/images/youth-alliance.svg"
            alt="Youth Alliance"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="font-medium">Youth Alliance</span>
        </Link>
        {showTaxId && <span className="ml-1">• EIN: {TAX_ID}</span>}
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div className={`bg-warm-gray rounded-xl p-6 border border-stone-gray/20 ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            href="https://www.youthalliance.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Image
              src="/images/youth-alliance.svg"
              alt="Youth Alliance"
              width={80}
              height={80}
              className="rounded-full hover:scale-105 transition-transform"
            />
          </Link>
          <div className="text-center md:text-left">
            <p className="text-sm text-stone-gray mb-1">Fiscal Sponsor</p>
            <h3 className="text-lg font-semibold text-charcoal mb-2">Youth Alliance</h3>
            <p className="text-sm text-stone-gray leading-relaxed">
              INDN is a fiscally sponsored project of Youth Alliance, a 501(c)(3) nonprofit organization.
              {showTaxId && (
                <span className="block mt-1 text-stone-gray/70">Tax ID (EIN): {TAX_ID}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Compact variant (default)
  return (
    <div className={`flex items-center gap-2 text-sm text-stone-gray ${className}`}>
      <Image
        src="/images/youth-alliance.svg"
        alt="Youth Alliance"
        width={24}
        height={24}
        className="rounded-full"
      />
      <span>
        Fiscally sponsored by{' '}
        <Link
          href="https://www.youthalliance.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terracotta hover:underline"
        >
          Youth Alliance
        </Link>
        {showTaxId && <span className="text-stone-gray/70"> • EIN: {TAX_ID}</span>}
      </span>
    </div>
  )
}

