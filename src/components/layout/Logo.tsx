'use client'

import Link from 'next/link'
import { Feather } from 'lucide-react'

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group transition-all duration-300"
    >
      {/* Icon with subtle animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta to-warm-earth rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <div className="relative bg-gradient-to-br from-terracotta to-warm-earth p-2 rounded-lg shadow-soft group-hover:shadow-card transition-all duration-300">
          <Feather className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Text logo */}
      <div className="flex flex-col">
        <span className="text-lg font-extrabold text-charcoal tracking-tight leading-none">
          INDN
        </span>
        <span className="text-[10px] font-semibold text-stone-gray uppercase tracking-wider leading-none">
          Network
        </span>
      </div>
    </Link>
  )
}
