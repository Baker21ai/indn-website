'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { boardMembers } from '@/data/leadership'
import { Heart, Users, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function BoardPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23333' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-soft mb-8 backdrop-blur-sm">
            <Users className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-charcoal tracking-wide">
              Leadership & Guidance
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6 tracking-tight">
            Meet Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-warm-earth">
              Board
            </span>
          </h1>

          <p className="text-xl text-stone-gray mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
            Our board members bring decades of experience in Indigenous
            advocacy, cultural preservation, and community leadership. Together,
            they guide INDN&apos;s mission to honor heritage and empower future
            generations.
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <Card
                key={member.id}
                className="shadow-elevated border-0 overflow-hidden hover:shadow-elevated-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient top border */}
                <div className="h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />

                <CardContent className="p-6">
                  {/* Photo */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-warm-gray/10 shadow-card">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-xl font-bold text-charcoal mb-1 text-center tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-terracotta mb-2 text-center">
                    {member.tribe}
                  </p>
                  <p className="text-sm text-stone-gray mb-4 text-center font-medium">
                    {member.title}
                  </p>

                  {/* Bio Preview */}
                  <div className="bg-warm-gray/5 rounded-lg p-4 mb-4">
                    <p
                      className={`text-sm text-charcoal leading-relaxed font-normal ${
                        expandedId === member.id ? '' : 'line-clamp-3'
                      }`}
                    >
                      {member.bio}
                    </p>

                    {/* Expanded Content */}
                    {expandedId === member.id && (
                      <div className="mt-4 space-y-3 animate-in fade-in duration-200">
                        <div>
                          <p className="text-xs font-semibold text-terracotta mb-1">
                            WORK EXPERIENCE
                          </p>
                          <p className="text-sm text-charcoal">
                            {member.workExperience}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-terracotta mb-1">
                            VOLUNTEER
                          </p>
                          <p className="text-sm text-charcoal">
                            {member.volunteer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(member.id)}
                    className="w-full text-terracotta hover:text-terracotta/80 hover:bg-terracotta/5"
                  >
                    {expandedId === member.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Read Full Bio
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-float border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />
            <CardContent className="p-12 text-center">
              <Heart className="w-12 h-12 text-terracotta mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-charcoal mb-4">
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
