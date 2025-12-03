'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { boardMembers, type BoardMember } from '@/data/leadership'
import { BoardCard } from '@/components/BoardCard'
import { BoardMemberModal } from '@/components/BoardMemberModal'
import { Heart, Users } from 'lucide-react'
import Link from 'next/link'

export default function BoardPage() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-orange shadow-soft mb-8">
            <Users className="w-4 h-4 text-white" />
            <span className="text-label-badge text-white">
              Leadership & Guidance
            </span>
          </div>

          <h1 className="text-hero text-white mb-6">
            Meet Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
              Board
            </span>
          </h1>

          <p className="text-body text-white/80 mb-12 max-w-3xl mx-auto">
            Our board members bring decades of experience in Indigenous
            advocacy, cultural preservation, and community leadership. Together,
            they guide INDN&apos;s mission to honor heritage and empower future
            generations.
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {boardMembers.map((member) => (
              <BoardCard
                key={member.id}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>

        {/* Board Member Modal */}
        <BoardMemberModal
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-float border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
            <CardContent className="p-8 sm:p-12 text-center">
              <Heart className="w-12 h-12 text-terracotta mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-4">
                Join Our Mission
              </h2>
              <p className="text-stone-gray mb-8 max-w-2xl mx-auto">
                Support Indigenous communities through volunteering or
                donations. Every contribution helps preserve culture and empower
                future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
                >
                  <Link href="/volunteer">Volunteer With Us</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-terracotta/30 text-terracotta hover:bg-terracotta/5"
                >
                  <Link href="/donate">Make a Donation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
