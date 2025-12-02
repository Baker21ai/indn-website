'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Logo() {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle smooth scroll on homepage
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-3 group transition-all duration-300"
    >
      {/* Round icon logo */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="relative w-12 h-12 transition-all duration-300 group-hover:scale-105">
          <Image
            src="/images/logo/indn-icon.png"
            alt="INDN Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Text logo */}
      <div className="flex flex-col">
        <span className="font-serif text-base font-bold text-charcoal tracking-wide leading-tight">
          Indigenous Nations
        </span>
        <span className="text-xs font-semibold text-terracotta tracking-wide leading-tight">
          Diversity Network
        </span>
      </div>
    </Link>
  )
}
