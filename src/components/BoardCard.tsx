'use client'

import Image from 'next/image'
import type { BoardMember } from '@/data/leadership'

interface BoardCardProps {
  member: BoardMember
  onClick: () => void
}

// Helper to get a short bio snippet (first sentence or two)
function getBioSnippet(bio: string): string {
  // Split into sentences and take first 1-2
  const sentences = bio.match(/[^.!?]+[.!?]+/g) || [bio]
  const snippet = sentences.slice(0, 1).join(' ').trim()
  // If it's too long, truncate
  if (snippet.length > 120) {
    return snippet.substring(0, 117) + '...'
  }
  return snippet
}

export function BoardCard({ member, onClick }: BoardCardProps) {
  const bioSnippet = getBioSnippet(member.bio)

  return (
    <div className="flex flex-col">
      {/* Name & Tribe - Above the card */}
      <div className="mb-3 text-center">
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-sunset-gold mt-1">
          {member.tribe}
        </p>
      </div>

      {/* Card with Photo + Glassmorphism Bio Panel */}
      <button
        onClick={onClick}
        className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:ring-offset-2 focus:ring-offset-charcoal transition-all duration-500 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border border-white/[0.08] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:scale-[1.01]"
        aria-label={`View ${member.name}'s full bio`}
      >
        {/* Photo */}
        <div className="absolute inset-0">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-25% to-transparent pointer-events-none" />
        </div>

        {/* Frame accent - top gradient bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Corner accents for frame feel */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/15 rounded-tl group-hover:border-sunset-orange/50 transition-colors duration-400 pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/15 rounded-tr group-hover:border-sunset-orange/50 transition-colors duration-400 pointer-events-none" />

        {/* Glassmorphism Bio Panel */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-black/45 border-t border-white/[0.12] px-4 py-3 sm:px-5 sm:py-4">
          {/* Bio snippet */}
          <p className="text-white/90 text-sm leading-snug mb-2.5 line-clamp-2">
            {bioSnippet}
          </p>
          
          {/* Read more CTA */}
          <div className="flex items-center gap-1.5 text-sunset-orange text-sm font-semibold group-hover:text-sunset-coral transition-colors">
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

        {/* Hover border glow effect */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.08] group-hover:ring-sunset-orange/30 transition-all duration-500 pointer-events-none" />
      </button>
    </div>
  )
}
