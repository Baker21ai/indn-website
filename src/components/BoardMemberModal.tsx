'use client'

import Image from 'next/image'
import { X, Briefcase, Heart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { BoardMember } from '@/data/leadership'

interface BoardMemberModalProps {
  member: BoardMember | null
  isOpen: boolean
  onClose: () => void
}

export function BoardMemberModal({ member, isOpen, onClose }: BoardMemberModalProps) {
  if (!member) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 bg-white rounded-2xl"
        showCloseButton={false}
      >
        {/* Hero Section with Photo */}
        <div className="relative">
          {/* Gradient Background */}
          <div className="h-32 sm:h-40 bg-gradient-to-br from-terracotta via-sunset-orange to-sunset-coral" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Photo - overlapping the gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 sm:-bottom-20">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-elevated">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 sm:pt-24 pb-8 px-6 sm:px-8">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2">
              {member.name}
            </DialogTitle>
            <p className="text-sm sm:text-base font-semibold text-terracotta">
              {member.tribe}
            </p>
            <p className="text-sm sm:text-base text-stone-gray font-medium mt-1">
              {member.title}
            </p>
          </DialogHeader>

          {/* Bio */}
          <div className="mb-6">
            <p className="text-charcoal leading-relaxed text-sm sm:text-base">
              {member.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-6 p-4 sm:p-5 bg-warm-gray rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-terracotta" />
              </div>
              <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">
                Work Experience
              </h3>
            </div>
            <p className="text-charcoal text-sm sm:text-base leading-relaxed">
              {member.workExperience}
            </p>
          </div>

          {/* Volunteer Work */}
          <div className="p-4 sm:p-5 bg-warm-gray rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-sage-green/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-sage-green" />
              </div>
              <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">
                Volunteer Work
              </h3>
            </div>
            <p className="text-charcoal text-sm sm:text-base leading-relaxed">
              {member.volunteer}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

