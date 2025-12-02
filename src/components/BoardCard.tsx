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

      {/* Card with Photo + Bio Preview */}
      <button
        onClick={onClick}
        className="group relative w-full h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:ring-offset-2 focus:ring-offset-charcoal transition-all duration-500"
        aria-label={`View ${member.name}'s full bio`}
      >
        {/* Photo - No overlays on face area */}
        <div className="absolute inset-0">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Minimal gradient only at bottom for blur panel readability */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Compact Bio Preview Panel - Bottom positioned */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Glass background */}
          <div className="relative backdrop-blur-md bg-white/10 border-t border-white/20 px-4 py-3 sm:px-5 sm:py-4">
            {/* Subtle gradient shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Bio Preview */}
              <p className="text-sm text-white/90 font-normal line-clamp-2 leading-relaxed">
                {member.bio}
              </p>

              {/* Click indicator */}
              <div className="mt-2 flex items-center justify-end gap-1.5 text-sunset-gold text-xs font-semibold group-hover:text-sunset-honey transition-colors">
                <span>Read full bio</span>
                <svg 
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hover border glow effect */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-sunset-orange/50 transition-all duration-500 pointer-events-none" />
      </button>
    </div>
  )
}
