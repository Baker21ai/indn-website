'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { boardMembers, type BoardMember } from '@/data/leadership'
import { BoardCard } from '@/components/BoardCard'
import { BoardMemberModal } from '@/components/BoardMemberModal'
import {
  Heart, Users, Calendar, MapPin,
  Mail, Phone, Tent, ExternalLink,
  Moon, Sprout, Sparkles, Users2, Shield, Zap, Mountain,
  Handshake, Star, Building, User, Crown, Medal, Award
} from 'lucide-react'
import { STATIC_SPONSORS } from '@/data/sponsors'

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  return (
    <div className="min-h-screen bg-warm-gray no-overflow-x">
      {/* Hero - Circular/Organic Design */}
      <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-terracotta to-sunset-orange/40 pt-16 sm:pt-20 lg:pt-24">
        {/* Background gradient circles */}
        <div className="absolute top-[-50%] right-[-20%] w-full h-full bg-[radial-gradient(circle,_rgba(255,107,53,0.3)_0%,_transparent_70%)] rounded-full" />
        <div className="absolute bottom-[-40%] left-[-30%] w-full h-full bg-[radial-gradient(circle,_rgba(234,107,62,0.2)_0%,_transparent_70%)] rounded-full" />

        <div className="relative z-10 text-center text-white max-w-[1000px] px-4 sm:px-6 md:px-10">
          {/* Full logo - Responsive sizing for all screens including 320px */}
          <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 flex justify-center">
            <div className="bg-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-warm-gray/10 w-full max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[500px] aspect-square flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo/indn-full-logo.jpg"
                alt="Indigenous Nations Diversity Network"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-4 sm:mb-6 md:mb-8 text-balanced">
            Welcome to Our Circle
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-95 max-w-[700px] mx-auto px-2 sm:px-0 text-pretty">
            Where ancestral wisdom meets tomorrow&apos;s possibilities, and every young person belongs to something greater than themselves
          </p>
        </div>
      </section>

      {/* Six Values Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal mb-3 sm:mb-4 md:mb-5 font-semibold text-balanced">
              Rooted in Our Values
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-stone-gray max-w-[700px] mx-auto font-light px-2 sm:px-0 text-pretty">
              Everything we do flows from the principles that have guided Indigenous communities for generations
            </p>
          </div>

          {/* Mobile: Single column cards, Tablet: 2 columns, Desktop: 3 column circles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-[900px] mx-auto">
            {[
              {
                title: 'Respect',
                description: 'For elders, traditions, land, and every person in our circle'
              },
              {
                title: 'Reciprocity',
                description: 'What we receive, we give back. What we learn, we share.'
              },
              {
                title: 'Relationality',
                description: 'We are connected to each other, our ancestors, and future generations'
              },
              {
                title: 'Responsibility',
                description: 'To preserve culture and prepare youth for the world they will inherit'
              },
              {
                title: 'Relevance',
                description: 'Honoring tradition while embracing what youth need today'
              },
              {
                title: 'Representation',
                description: 'Every voice matters, every story deserves to be heard'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-warm-gray p-5 sm:p-6 md:p-8 lg:p-10 
                  rounded-2xl sm:rounded-3xl lg:rounded-full 
                  lg:aspect-square flex flex-col items-center justify-center text-center 
                  transition-all duration-400 border-[3px] border-transparent 
                  hover:bg-white hover:border-terracotta hover:scale-[1.02] lg:hover:scale-105 
                  hover:shadow-[0_10px_40px_rgba(234,107,62,0.15)]"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-charcoal mb-1 sm:mb-2 lg:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-[0.9rem] md:text-[0.95rem] text-stone-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-br from-terracotta to-sunset-orange text-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-10 text-center font-semibold text-balanced">
            How This Circle Began
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose mb-5 sm:mb-6 md:mb-8 opacity-95 font-light text-pretty">
            In 2023, when the San Juan Bautista Indian Market closed, something precious was lost. Not just an event, but a gathering place. A home for Indigenous youth in San Benito County to see themselves reflected, to connect with their heritage, to simply belong.
          </p>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose mb-5 sm:mb-6 md:mb-8 opacity-95 font-light text-pretty">
            We didn&apos;t wait for someone else to fill that void. Our community came together. Elders who carried knowledge, families who carried hope, and youth who carried tomorrow&apos;s dreams created something new.
          </p>

          <div className="bg-white/10 p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[20px] my-8 sm:my-10 md:my-12 border-l-4 border-white/50">
            <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[1.6rem] italic leading-relaxed">
              &ldquo;We are the only organization providing year-round Indigenous cultural programming in San Benito County. But we&apos;re not here to replace what was lost. We&apos;re here to build what&apos;s needed.&rdquo;
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose mb-5 sm:mb-6 md:mb-8 opacity-95 font-light text-pretty">
            From 500 to 1,000+ participants in three years. From one annual event to monthly gatherings, youth-led programs, gardens growing food for families, and AI workshops preparing our youth for futures we can barely imagine.
          </p>

          <p className="text-xl sm:text-2xl md:text-3xl leading-snug sm:leading-tight font-bold text-white mt-8 sm:mt-10 md:mt-12 drop-shadow-lg text-balanced">
            This is what happens when a community refuses to let its youth fall through the cracks.
          </p>
        </div>
      </section>
      {/* Board Members Section */}
      <section id="board" className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sunset-orange shadow-soft mb-4 sm:mb-6 md:mb-8">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Leadership & Guidance
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-5 md:mb-6 font-semibold tracking-tight text-balanced">
              Meet Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
                Board
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-normal px-2 sm:px-0 text-pretty">
              Our board members bring decades of experience in Indigenous
              advocacy, cultural preservation, and community leadership. Together,
              they guide INDN&apos;s mission to honor heritage and empower future
              generations.
            </p>
          </div>

          {/* Board Members Grid - Glassmorphism Cards */}
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

      {/* Programs Section */}
      <section className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 md:mb-5 font-semibold text-balanced">
              How We Walk Together
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-[700px] mx-auto font-light px-2 sm:px-0 text-pretty">
              Our programs are interconnected, just like our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-8 sm:mt-12 md:mt-16">
            {[
              {
                Icon: Moon,
                title: 'Cultural Nights',
                description: 'Monthly gatherings where 15-25+ families share meals, learn traditional arts, and keep the drum circle beating. Three generations learning from each other.',
                impact: 'Building belonging, one circle at a time'
              },
              {
                Icon: Sprout,
                title: 'Youth Garden',
                description: 'Growing 100+ pounds of food annually while elders share plant knowledge passed down through generations. Youth feed families while feeding their souls.',
                impact: 'Connecting hands to earth, youth to elders'
              },
              {
                Icon: Sparkles,
                title: 'Four Directions Initiative',
                description: 'Career, education, health, and digital media programs where youth lead, not just attend. Older youth teach AI literacy to younger peers. Everyone grows together.',
                impact: 'Leading today, transforming tomorrow'
              },
              {
                Icon: Users2,
                title: 'Annual Pow Wow',
                description: 'From 500 to 1,000+ participants. Our flagship gathering where the entire year of work blooms into celebration, connection, and collective joy.',
                impact: '1,000+ hearts beating as one'
              }
            ].map((program, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-sunset-orange to-terracotta p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-[24px] md:rounded-[30px] shadow-[0_4px_20px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,107,53,0.5)] relative border-2 border-sunset-orange hover:border-white"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-lg">
                  <program.Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sunset-orange" />
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.6rem] text-white mb-2 sm:mb-3 md:mb-4 font-semibold">
                  {program.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 mb-3 sm:mb-4 md:mb-5 text-pretty">
                  {program.description}
                </p>

                <div className="text-sm sm:text-[0.95rem] text-white font-semibold italic">
                  {program.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessings Section */}
      <section className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 md:mb-5 font-semibold text-balanced">
              Guided by Our Leaders
            </h2>
          </div>

          <p className="max-w-[700px] mx-auto mb-10 sm:mb-14 md:mb-20 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-white/80 font-light px-2 sm:px-0 text-pretty">
            Our work is blessed and guided by tribal leaders who have stewarded their communities for generations. Their trust is our foundation. Their wisdom lights our path.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[
              {
                name: 'Ann Marie Sayers',
                affiliation: 'Indian Canyon',
                description: 'Cultural keeper and guardian of sacred traditions'
              },
              {
                name: 'Kanyon Sayers-Roods',
                affiliation: 'Costanoan Research',
                description: 'Scholar preserving and sharing cultural knowledge'
              },
              {
                name: 'Valentin Lopez',
                affiliation: 'Amah Mutsun Tribal Band',
                description: 'Tribal chairman and community advocate'
              }
            ].map((leader, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-sunset-orange to-sunset-coral p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl sm:rounded-[24px] md:rounded-[30px] transition-all hover:border-white border-2 border-sunset-orange hover:-translate-y-1 md:hover:-translate-y-2 shadow-[0_4px_20px_rgba(255,107,53,0.3)] hover:shadow-[0_12px_40px_rgba(255,107,53,0.5)]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] border-2 border-white rounded-full mx-auto mb-4 sm:mb-5 md:mb-6" />

                <h4 className="font-serif text-lg sm:text-xl md:text-2xl text-white mb-1.5 sm:mb-2 font-semibold">
                  {leader.name}
                </h4>

                <p className="text-white text-sm sm:text-base mb-3 sm:mb-4 md:mb-5 italic">
                  {leader.affiliation}
                </p>

                <p className="text-white/90 text-sm sm:text-[0.95rem] leading-relaxed">
                  {leader.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events/Powow Section */}
      <section id="events" className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sunset-orange mb-3 sm:mb-4 tracking-tight text-balanced">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-relaxed px-2 sm:px-0 text-pretty">
              Join us in celebrating indigenous culture, community, and tradition
            </p>
          </div>

          {/* Featured Event - Powwow */}
          <Card className="shadow-elevated border-0 overflow-hidden">
            <div className="h-2 sm:h-3 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />

            {/* Flyer Image Hero */}
            <div className="relative w-full bg-gradient-to-br from-charcoal to-terracotta/30">
              <div className="max-w-2xl mx-auto p-2 sm:p-4">
                <div className="relative aspect-[850/1100] rounded-lg overflow-hidden">
                  <Image
                    src="/images/powwow-flyer.png"
                    alt="3rd Annual Hollister Powwow & Native Gathering"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Event Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
                <Badge className="bg-terracotta text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Cultural Celebration</Badge>
                <Badge className="bg-sunset-orange text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">3-Day Event</Badge>
                <Badge className="bg-sunset-coral text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Free Admission</Badge>
                <Badge className="bg-terracotta text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Family Friendly</Badge>
              </div>

              {/* Quick Event Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Dates</p>
                    <p className="text-stone-gray text-sm sm:text-base">November 7-9, 2025</p>
                    <p className="text-xs sm:text-sm text-stone-gray">Friday - Sunday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Location</p>
                    <p className="text-stone-gray text-sm sm:text-base">Bolado Park</p>
                    <p className="text-xs sm:text-sm text-stone-gray">Tres Pinos, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Admission</p>
                    <p className="text-sunset-orange font-semibold text-sm sm:text-base">FREE</p>
                    <p className="text-xs sm:text-sm text-stone-gray">Community Event</p>
                  </div>
                </div>
              </div>

              {/* Contact & Camping */}
              <div className="border-t border-terracotta/20 pt-6 sm:pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-3 sm:mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
                      Contact & Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-sunset-orange flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">General Info</p>
                          <a href="tel:+18318015530" className="text-sunset-orange hover:underline font-medium text-sm sm:text-base">
                            (831) 801-5530
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Camping */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-3 sm:mb-4 flex items-center gap-2">
                      <Tent className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
                      RV & Tent Camping
                    </h3>
                    <div className="bg-sunset-orange/5 rounded-lg p-3 sm:p-4">
                      <p className="text-stone-gray mb-2 sm:mb-3 text-sm sm:text-base">
                        Camping available at the event site for the weekend
                      </p>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-sunset-orange flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Camping Reservations</p>
                          <a href="tel:+18316289421" className="text-sunset-orange hover:underline font-medium text-sm sm:text-base">
                            (831) 628-9421
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight text-balanced">
            Our Generous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
              Sponsors
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed font-normal px-2 sm:px-0 text-pretty">
            Thank you to the individuals and organizations making our mission possible
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STATIC_SPONSORS.filter(s => s.status === 'active').map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Logo/Icon */}
                <div className="h-24 w-full flex items-center justify-center mb-4">
                  {sponsor.sponsorType === 'company' && sponsor.logoUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.displayName}
                        width={160}
                        height={80}
                        className="object-contain max-h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-warm-gray flex items-center justify-center">
                      {sponsor.sponsorType === 'company' ? (
                        <Building className="w-8 h-8 text-stone-gray" />
                      ) : (
                        <User className="w-8 h-8 text-stone-gray" />
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-charcoal font-bold text-lg mb-1 leading-tight">{sponsor.displayName}</h3>

                {/* Tier Badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  {sponsor.tier === 'gold' && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
                  {sponsor.tier === 'silver' && <Medal className="w-3.5 h-3.5 text-gray-400" />}
                  {sponsor.tier === 'bronze' && <Award className="w-3.5 h-3.5 text-amber-600" />}
                  <span className={`text-xs uppercase tracking-wider font-bold ${sponsor.tier === 'gold' ? 'text-yellow-600' :
                    sponsor.tier === 'silver' ? 'text-gray-500' :
                      'text-amber-700'
                    }`}>
                    {sponsor.tier}
                  </span>
                </div>

                {sponsor.location && (
                  <p className="text-stone-gray text-sm">{sponsor.location}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="text-white/80 mb-4 text-sm sm:text-base px-2 sm:px-0">
              Our sponsors help preserve indigenous culture, support educational programs, and empower communities across 12+ tribal nations.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white shadow-card hover:shadow-card-hover transition-depth touch-target"
            >
              <Link href="/sponsors">View All Sponsors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section */}
      <section id="become-sponsor" className="bg-charcoal py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sunset-orange shadow-soft mb-4 sm:mb-6">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">Make an Impact Today</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight text-balanced">
              Become a <span className="text-sunset-orange">Sponsor</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal px-2 sm:px-0 text-pretty">
              Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
            </p>
          </div>

          {/* Main Sponsorship Card */}
          <Card className="mb-8 sm:mb-10 md:mb-12 shadow-elevated border-0 overflow-hidden">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                {/* Left: QR Code */}
                <div className="text-center">
                  <div className="inline-block p-3 sm:p-4 md:p-6 lg:p-8 bg-white rounded-xl sm:rounded-2xl shadow-card">
                    <Image
                      src="/images/barcode.png"
                      alt="Sponsorship QR Code"
                      width={256}
                      height={256}
                      className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg sm:rounded-xl"
                    />
                  </div>
                  <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-stone-gray font-medium">Scan to become a sponsor instantly</p>
                </div>

                {/* Right: Info and Link */}
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-charcoal mb-2 sm:mb-3 md:mb-4 tracking-tight">
                    Make Your Impact
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-stone-gray mb-4 sm:mb-6 md:mb-8 leading-relaxed font-normal">
                    Every sponsorship helps us preserve indigenous culture, support educational programs, and empower communities.
                  </p>

                  {/* Sponsor Button */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full group bg-sunset-orange hover:bg-sunset-orange/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth touch-target"
                  >
                    <Link
                      href="/sponsor"
                      className="flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Become a Sponsor</span>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-xs text-stone-gray/70 text-center mt-2 sm:mt-3">Secure sponsorship processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Tiers */}
          <Card className="mb-8 sm:mb-10 md:mb-12 bg-white border-0 shadow-card">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mb-4 sm:mb-5 md:mb-6 text-center">
                Sponsorship Tiers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200/50 border-2 border-amber-400/30">
                  <div className="flex justify-center mb-1.5 sm:mb-2">
                    <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-amber-700" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Bronze</h4>
                  <p className="text-xs sm:text-sm text-stone-gray mb-1 sm:mb-2">$10,000</p>
                  <p className="text-xs text-terracotta font-medium hidden sm:block">5 VIP Powwow Tickets</p>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200/50 border-2 border-gray-300/50">
                  <div className="flex justify-center mb-1.5 sm:mb-2">
                    <Zap className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-gray-500" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Silver</h4>
                  <p className="text-xs sm:text-sm text-stone-gray mb-1 sm:mb-2">$20,000</p>
                  <p className="text-xs text-terracotta font-medium hidden sm:block">10 VIP Powwow Tickets</p>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100/50 border-2 border-yellow-400/50">
                  <div className="flex justify-center mb-1.5 sm:mb-2">
                    <Mountain className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">Gold</h4>
                  <p className="text-xs sm:text-sm text-stone-gray mb-1 sm:mb-2">$50,000</p>
                  <p className="text-xs text-terracotta font-medium hidden sm:block">25 VIP Powwow Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join Section */}
      <section className="relative bg-gradient-to-br from-sunset-orange to-sunset-coral text-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 text-center overflow-hidden">
        {/* Circular ornaments - Hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[500px] lg:w-[600px] h-[400px] md:h-[500px] lg:h-[600px] border-2 border-terracotta/10 rounded-full" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[340px] lg:w-[400px] h-[280px] md:h-[340px] lg:h-[400px] border-2 border-terracotta/15 rounded-full" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6 md:mb-8 font-semibold text-balanced">
            Join Our Circle
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 md:mb-16 opacity-95 font-light leading-relaxed px-2 sm:px-0 text-pretty">
            There&apos;s a place for you here. Multiple ways to walk with us, support our youth, and strengthen this community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            {[
              {
                Icon: Handshake,
                title: 'Become a Sponsor',
                description: 'Plant seeds for the next generation of Indigenous leaders',
                link: '/sponsor'
              },
              {
                Icon: Star,
                title: 'Volunteer',
                description: 'Share your time, skills, and heart with our community',
                link: '/register'
              },
              {
                Icon: Mail,
                title: 'Stay Connected',
                description: 'Receive stories, updates, and invitations to our circle',
                link: '#newsletter'
              },
              {
                Icon: Calendar,
                title: 'Attend Events',
                description: 'Experience our community at Cultural Nights and Pow Wows',
                link: '/events'
              }
            ].map((pathway, index) => (
              <Link
                key={index}
                href={pathway.link}
                className="bg-white/10 p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[20px] transition-all border-2 border-transparent hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 md:hover:-translate-y-2 active:bg-white/20"
              >
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
                  <pathway.Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 font-semibold">{pathway.title}</h3>
                <p className="text-sm sm:text-base opacity-90 leading-relaxed">{pathway.description}</p>
                <div className="mt-3 sm:mt-4 md:mt-5 text-white font-semibold">→</div>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/20 pt-8 sm:pt-12 md:pt-16 mt-8 sm:mt-12 md:mt-16">
            <h3 className="text-lg sm:text-xl md:text-[1.6rem] mb-6 sm:mb-8 md:mb-10 font-normal text-balanced">
              Have questions? Want to talk? We&apos;re here.
            </h3>

            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              <div className="text-center">
                <strong className="block text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 font-medium">Elvira Zaragoza Robinson</strong>
                <a href="mailto:ezrlaw1948@gmail.com" className="block my-1.5 sm:my-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
                  ezrlaw1948@gmail.com
                </a>
                <a href="tel:+18318015530" className="block my-1.5 sm:my-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
                  (831) 801-5530
                </a>
              </div>
              <div className="text-center">
                <strong className="block text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 font-medium">Charles Wall</strong>
                <a href="mailto:charleswallandfam@gmail.com" className="block my-1.5 sm:my-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
                  charleswallandfam@gmail.com
                </a>
                <a href="tel:+17752710322" className="block my-1.5 sm:my-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
                  (775) 271-0322
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

