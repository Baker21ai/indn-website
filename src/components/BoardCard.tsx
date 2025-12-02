'use client'

import Image from 'next/image'
import type { BoardMember } from '@/data/leadership'

interface BoardCardProps {
  member: BoardMember
  onClick: () => void
}

export function BoardCard({ member, onClick }: BoardCardProps) {
  return (
    <div className="flex flex-col">
      {/* Name & Tribe - Above the card */}
      <div className="mb-3 text-center">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-sunset-gold mt-1">
          {member.tribe}
        </p>
      </div>

      {/* Card with Photo + Slim Bio Bar */}
      <button
        onClick={onClick}
        className="group relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:ring-offset-2 focus:ring-offset-charcoal transition-all duration-500"
        aria-label={`View ${member.name}'s full bio`}
      >
        {/* Photo - Positioned to show faces clearly, well above the bottom bar */}
        <div className="absolute inset-0">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Tiny gradient only at very bottom for bar readability */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Ultra-compact bottom bar - just enough for "Read bio" */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="relative backdrop-blur-sm bg-black/40 border-t border-white/10 px-4 py-2">
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-white/90 text-sm font-medium">Click to read full bio</span>
              <svg 
                className="w-4 h-4 text-sunset-gold transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover border glow effect */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-sunset-orange/50 transition-all duration-500 pointer-events-none" />
      </button>
    </div>
  )
}
