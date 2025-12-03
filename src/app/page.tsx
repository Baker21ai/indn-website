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
import { ExpandableValuesGrid } from '@/components/ExpandableValue'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import {
  Heart, Users, Calendar, MapPin, Mail,
  Phone, ExternalLink,
  Moon, Sprout, Sparkles, Users2, Shield, Zap, Mountain,
  Handshake, Building, User, ArrowRight
} from 'lucide-react'
import { STATIC_SPONSORS } from '@/data/sponsors'

// Values data
const VALUES = [
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
]

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  return (
    <div className="min-h-screen bg-warm-gray no-overflow-x">
      {/* Hero - Clean White with Bear Logo */}
      <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-b from-white via-[#FFFBF7] to-warm-gray pt-16 sm:pt-20 lg:pt-24">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta/20 to-transparent" />
        
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative z-10 text-center max-w-[1000px] px-4 sm:px-6 md:px-10">
            {/* Bear SVG Logo - Responsive sizing */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex justify-center animate-fade-in">
              <Image
                src="/images/logo/indn-bear.svg"
                alt="INDN Bear Logo"
                width={400}
                height={400}
                className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[400px] h-auto"
                priority
              />
            </div>

            {/* Organization Name - Cinzel font with wide tracking */}
            <h1 
              className="text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] text-charcoal mb-3 sm:mb-4 md:mb-5 animate-fade-in-up delay-100 tracking-[0.25em] sm:tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-display), Cinzel, serif' }}
            >
              Indigenous Nations Diversity Network
            </h1>
            
            {/* Tagline - Small caps style in terracotta */}
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-terracotta animate-fade-in-up delay-200 tracking-[0.15em] sm:tracking-[0.2em]"
              style={{ 
                fontFamily: 'var(--font-display), Cinzel, serif',
                fontVariant: 'small-caps'
              }}
            >
              Preservation and Celebration
            </p>
          </div>
        </div>

        {/* Fiscal Sponsor Section - Restyled for light background */}
        <div className="relative z-10 animate-fade-in-up delay-300 pb-6 sm:pb-8 md:pb-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-1 sm:mb-2">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-stone-gray/30" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-gray/70 font-medium">
                Fiscal Sponsor
              </span>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-stone-gray/30" />
            </div>
            
            {/* Youth Alliance Logo and Name */}
            <div className="flex items-center gap-4 sm:gap-5 bg-charcoal/5 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-charcoal/10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white shadow-md flex-shrink-0 border border-warm-gray">
                <Image
                  src="/images/youth-alliance-logo.svg"
                  alt="Youth Alliance"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-semibold text-charcoal tracking-tight">
                  Youth Alliance
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-stone-gray">
                  501(c)(3) Nonprofit Organization
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Values Section - White with orange accents */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 bg-white relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-section text-charcoal mb-3 sm:mb-4 md:mb-5 text-balanced">
              Rooted in Our <span className="text-underline-accent">Values</span>
            </h2>
            <p className="text-body text-stone-gray max-w-[700px] mx-auto px-2 sm:px-0 text-pretty">
              Everything we do flows from the principles that have guided Indigenous communities for generations
            </p>
          </div>

          {/* Clickable expandable values */}
          <ExpandableValuesGrid values={VALUES} />
        </div>
      </section>

      {/* Story Section - Reimagined with Impact */}
      <section id="story" className="bg-gradient-to-br from-terracotta via-[#D85A32] to-sunset-orange text-white py-16 sm:py-20 md:py-28 lg:py-36 px-4 sm:px-6 md:px-10 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 texture-woven opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          {/* Opening headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 sm:mb-14 md:mb-16 text-center tracking-tight leading-[1.1]">
            How This Circle Began
          </h2>

          {/* The Loss - Story Beat 1 */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <p className="text-xl sm:text-2xl md:text-[1.7rem] leading-relaxed text-white/95 text-pretty max-w-[800px]">
              In 2023, when the San Juan Bautista Indian Market closed, something precious was lost. Not just an event, but a <em className="text-white font-medium not-italic">gathering place</em>. A home for Indigenous youth in San Benito County to see themselves reflected, to connect with their heritage, to simply <em className="text-white font-medium">belong</em>.
            </p>
          </div>

          {/* The Response - Story Beat 2 */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <p className="text-xl sm:text-2xl md:text-[1.7rem] leading-relaxed text-white/95 text-pretty max-w-[800px]">
              We didn&apos;t wait for someone else to fill that void. Our community came together. Elders who carried knowledge, families who carried hope, and youth who carried tomorrow&apos;s dreams created something new.
            </p>
          </div>

          {/* The Quote - Centerpiece */}
          <div className="relative my-14 sm:my-18 md:my-24">
            {/* Decorative quote marks */}
            <div className="absolute -top-6 -left-2 sm:-left-4 text-white/20 font-serif text-[80px] sm:text-[120px] leading-none select-none">&ldquo;</div>
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-on-dark">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[2rem] italic leading-relaxed text-white">
                We are the only organization providing year-round Indigenous cultural programming in San Benito County. But we&apos;re not here to replace what was lost. We&apos;re here to build what&apos;s needed.
              </p>
            </div>
          </div>

          {/* The Impact - Animated Stats Section */}
          <div className="my-16 sm:my-20 md:my-28">
            {/* Big Impact Number */}
            <div className="text-center mb-8 sm:mb-10">
              <AnimatedCounter 
                end={1000}
                suffix="+"
                duration={2500}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] text-white drop-shadow-lg"
                labelBelow="participants in three years"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Closing Statement - Full Bleed Power Section */}
      <section className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 md:px-10 bg-charcoal overflow-hidden">
        {/* Decorative geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }} />
        
        {/* Warm glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[300px] bg-gradient-to-b from-terracotta/20 via-terracotta/5 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 max-w-[1100px] mx-auto text-center">
          {/* Decorative line above */}
          <div className="flex items-center justify-center gap-4 mb-10 sm:mb-14">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-terracotta/50" />
            <div className="w-2 h-2 rounded-full bg-terracotta" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-terracotta/50" />
          </div>
          
          {/* The Statement */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15] tracking-tight">
            This is what happens when a community{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange via-sunset-coral to-sunset-honey">
                refuses
              </span>
            </span>{' '}
            to let its youth fall through the cracks.
          </h2>
          
          {/* Decorative line below */}
          <div className="flex items-center justify-center gap-4 mt-10 sm:mt-14">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-terracotta/50" />
            <div className="w-2 h-2 rounded-full bg-terracotta" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-terracotta/50" />
          </div>
        </div>
      </section>
      {/* Board Members Section - White */}
      <section id="board" className="bg-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sunset-orange shadow-warm mb-4 sm:mb-6 md:mb-8">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-label-badge text-white">
                Leadership & Guidance
              </span>
            </div>

            <h2 className="text-section text-charcoal mb-4 sm:mb-5 md:mb-6 text-balanced">
              Meet Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
                Board
              </span>
            </h2>

            <p className="text-body text-stone-gray mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2 sm:px-0 text-pretty">
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

      {/* Programs Section - Orange */}
      <section className="bg-gradient-to-br from-terracotta to-sunset-orange text-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-section text-white mb-3 sm:mb-4 md:mb-5 text-balanced">
              How We Walk <span className="text-italic-accent text-charcoal">Together</span>
            </h2>
            <p className="text-body text-white/80 max-w-[700px] mx-auto px-2 sm:px-0 text-pretty">
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
                description: 'In our first year, elders share plant knowledge passed down through generations to children ages 5-16.',
                impact: 'Connecting hands to earth, youth to elders'
              },
              {
                Icon: Sparkles,
                title: 'Four Directions Initiative',
                description: "Our vision: career, education, health, and digital media programs where youth lead, not just attend. We're building toward older youth teaching AI literacy to younger peers.",
                impact: 'Leading today, transforming tomorrow'
              },
              {
                Icon: Users2,
                title: 'Annual Pow Wow',
                description: '1,000+ participants. Our flagship gathering where the entire year of work blooms into celebration, connection, and collective joy.',
                impact: '1,000+ hearts beating as one'
              }
            ].map((program, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-sunset-orange to-terracotta p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-[24px] md:rounded-[30px] shadow-warm-md transition-shadow hover-elevate hover:shadow-warm-hover relative border-2 border-sunset-orange/50 hover:border-white/80"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-warm">
                  <program.Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sunset-orange" />
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.6rem] text-white mb-2 sm:mb-3 md:mb-4 font-semibold tracking-tight">
                  {program.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 mb-3 sm:mb-4 md:mb-5 text-pretty">
                  {program.description}
                </p>

                <div className="text-sm sm:text-[0.95rem] text-white font-semibold italic tracking-loose">
                  {program.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessings Section - White */}
      <section className="bg-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-section text-charcoal mb-3 sm:mb-4 md:mb-5 text-balanced">
              Guided by Our <span className="text-terracotta">Leaders</span>
            </h2>
          </div>

          <p className="text-body text-stone-gray max-w-[700px] mx-auto mb-10 sm:mb-14 md:mb-20 px-2 sm:px-0 text-pretty">
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
                className="bg-gradient-to-br from-sunset-orange to-sunset-coral p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl sm:rounded-[24px] md:rounded-[30px] transition-shadow hover:border-white/80 border-2 border-sunset-orange/50 hover-micro-lift shadow-warm-md hover:shadow-warm-hover"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] border-2 border-white/80 rounded-full mx-auto mb-4 sm:mb-5 md:mb-6" />

                <h4 className="font-serif text-lg sm:text-xl md:text-2xl text-white mb-1.5 sm:mb-2 font-semibold tracking-tight">
                  {leader.name}
                </h4>

                <p className="text-white text-sm sm:text-base mb-3 sm:mb-4 md:mb-5 italic tracking-loose">
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

      {/* Events/Powow Section - Orange */}
      <section id="events" className="bg-gradient-to-br from-sunset-orange to-terracotta text-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Two-column layout: Flyer on left, Info on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Tilted Flyer Card */}
            <div className="[perspective:1200px] order-1 lg:order-1 py-8">
              <div 
                className="relative transform transition-all duration-500 ease-out hover:[transform:rotateY(0deg)_rotateZ(0deg)] hover:scale-[1.02] [transform:rotateY(-6deg)_rotateZ(2deg)] mx-auto max-w-md lg:max-w-none"
              >
                {/* Card with white border frame and shadow */}
                <div className="bg-white p-3 sm:p-4 rounded-2xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                  <div className="relative aspect-[850/1100] rounded-xl overflow-hidden">
                    <Image
                      src="/images/powwow-flyer.jpg"
                      alt="3rd Annual Hollister Powwow & Native Gathering"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Past Event Badge */}
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Event Info */}
            <div className="order-2 lg:order-2 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-orange/20 border border-sunset-orange/30 mb-6">
                <Sparkles className="w-4 h-4 text-sunset-orange" />
                <span className="text-sm font-semibold text-sunset-orange tracking-wide">
                  Past Event
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-tight">
                3rd Annual Hollister Powwow & Native{' '}
                <span className="text-sunset-orange underline decoration-sunset-orange/30 decoration-4 underline-offset-4">Gathering</span>.
              </h2>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/80 mb-4 leading-relaxed">
                In November 2025, over 1,000 community members came together for three incredible days of celebration, dance, and cultural connection at Bolado Park.
              </p>

              <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                Thank you to everyone who joined us—dancers, drummers, vendors, volunteers, and families. Your presence made this gathering unforgettable.
              </p>

              {/* Event Details - Inline */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base text-white/70 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sunset-orange" />
                  November 7-9, 2025
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sunset-orange" />
                  Bolado Park, Tres Pinos, CA
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sunset-orange" />
                  1,000+ Attendees
                </span>
              </div>

              {/* CTA Link */}
              <Link 
                href="/events"
                className="inline-flex items-center gap-2 text-sunset-orange font-semibold text-lg hover:gap-3 transition-all group"
              >
                View all events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Gallery - White */}
      <section id="sponsors" className="bg-white py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <p className="text-label-badge text-stone-gray mb-3 sm:mb-4">
              Our Partners
            </p>
            <h2 className="text-section text-charcoal">
              Community Sponsors
            </h2>
          </div>

          {/* Gold Tier - Hero Treatment */}
          {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'gold').length > 0 && (
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
                <span className="text-xs tracking-[0.15em] uppercase text-yellow-600 font-medium px-2">Gold Partners</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
              </div>
              <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'gold').map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="group bg-white rounded-sm border border-yellow-100/60 p-10 flex flex-col items-center text-center transition-all duration-500 hover:border-yellow-400/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] w-full max-w-[380px] relative overflow-hidden"
                  >
                    {sponsor.logoUrl && (
                      <div className="h-32 sm:h-40 w-full flex items-center justify-center mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <Image
                          src={sponsor.logoUrl}
                          alt={sponsor.displayName}
                          width={240}
                          height={140}
                          className="object-contain max-h-full transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <h3 className={`text-charcoal font-serif text-2xl sm:text-3xl tracking-tight leading-tight ${!sponsor.logoUrl ? 'my-6' : ''}`}>
                      {sponsor.displayName}
                    </h3>
                    {sponsor.location && (
                      <p className="text-stone-gray text-xs mt-3 uppercase tracking-[0.2em] font-medium opacity-60">{sponsor.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Silver Tier - Medium Prominence */}
          {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'silver').length > 0 && (
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />
                <span className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium px-2">Silver Partners</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />
              </div>
              <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'silver').map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="group bg-white rounded-sm border border-stone-100 p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-stone-300/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] w-full max-w-[320px] relative overflow-hidden"
                  >
                    {sponsor.logoUrl && (
                      <div className="h-24 sm:h-32 w-full flex items-center justify-center mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <Image
                          src={sponsor.logoUrl}
                          alt={sponsor.displayName}
                          width={180}
                          height={100}
                          className="object-contain max-h-full transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <h3 className={`text-charcoal font-serif text-xl sm:text-2xl tracking-tight leading-tight ${!sponsor.logoUrl ? 'my-4' : ''}`}>
                      {sponsor.displayName}
                    </h3>
                    {sponsor.location && (
                      <p className="text-stone-gray text-xs mt-2 uppercase tracking-[0.2em] font-medium opacity-60">{sponsor.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bronze Tier - Clean Grid */}
          {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'bronze').length > 0 && (
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                <span className="text-xs tracking-[0.15em] uppercase text-amber-700 font-medium px-2">Bronze Partners</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              </div>
              <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
                {STATIC_SPONSORS.filter(s => s.status === 'active' && s.tier === 'bronze').map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="group bg-white rounded-sm border border-stone-100 p-6 flex flex-col items-center text-center transition-all duration-500 hover:border-amber-200/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] w-full max-w-[260px] relative overflow-hidden"
                  >
                    {sponsor.logoUrl && (
                      <div className="h-20 sm:h-24 w-full flex items-center justify-center mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <Image
                          src={sponsor.logoUrl}
                          alt={sponsor.displayName}
                          width={140}
                          height={80}
                          className="object-contain max-h-full transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <h3 className={`text-charcoal font-serif text-lg leading-tight ${!sponsor.logoUrl ? 'my-2' : ''}`}>
                      {sponsor.displayName}
                    </h3>
                    {sponsor.location && (
                      <p className="text-stone-gray text-xs mt-1 hidden sm:block uppercase tracking-[0.2em] font-medium opacity-60">{sponsor.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invitation CTA */}
          <div className="mt-16 sm:mt-20 text-center border-t border-stone-gray/20 pt-10 sm:pt-12">
            <p className="text-stone-gray mb-4 text-sm sm:text-base">
              Interested in joining our circle of supporters?
            </p>
            <Link 
              href="/sponsor"
              className="inline-flex items-center gap-2 text-charcoal font-medium border-b-2 border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
            >
              Become a Sponsor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section - Orange */}
      <section id="become-sponsor" className="bg-gradient-to-br from-terracotta to-sunset-orange text-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sunset-orange shadow-warm mb-4 sm:mb-6">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-label-badge text-white">Make an Impact Today</span>
            </div>
            <h2 className="text-section text-white mb-3 sm:mb-4 text-balanced">
              Become a <span className="text-italic-accent text-sunset-orange">Sponsor</span>
            </h2>
            <p className="text-body text-white/80 max-w-2xl mx-auto px-2 sm:px-0 text-pretty">
              Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
            </p>
          </div>

          {/* Main Sponsorship Card */}
          <Card className="mb-8 sm:mb-10 md:mb-12 shadow-warm-lg border-0 overflow-hidden transition-shadow hover:shadow-warm-hover">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-charcoal mb-3 sm:mb-4 tracking-tight">
                  Make Your Impact
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-stone-gray mb-6 sm:mb-8 leading-relaxed font-normal">
                  Every sponsorship helps us preserve indigenous culture, support educational programs, and empower communities.
                </p>

                {/* Sponsor Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto group bg-sunset-orange hover:bg-sunset-orange/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth touch-target px-8 sm:px-12"
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
                <p className="text-xs text-stone-gray/70 mt-3 sm:mt-4">Secure sponsorship processing</p>
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Tiers */}
          <Card className="mb-8 sm:mb-10 md:mb-12 bg-white border-0 shadow-editorial transition-shadow hover:shadow-editorial-hover">
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
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.08)_100%)] pointer-events-none" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="text-hero text-white mb-5 sm:mb-6 md:mb-8 text-balanced">
            Join Our <span className="text-italic-accent">Circle</span>
          </h2>

          <p className="text-body-lg text-white/95 mb-8 sm:mb-12 md:mb-16 px-2 sm:px-0 text-pretty">
            There&apos;s a place for you here. Multiple ways to walk with us, support our youth, and strengthen this community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
            {/* Become a Sponsor Card */}
            <Link
              href="/sponsor"
              className="group relative bg-white rounded-3xl p-8 md:p-10 text-left overflow-hidden shadow-warm-lg hover:shadow-warm-hover transition-shadow hover-gentle-scale"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-terracotta/20 to-sunset-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta to-sunset-orange mb-6">
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-card-title text-charcoal mb-3">Become a Sponsor</h3>
                <p className="text-body-sm text-stone-gray mb-6">
                  Plant seeds for the next generation of Indigenous leaders. Your support creates lasting impact.
                </p>
                <span className="inline-flex items-center gap-2 text-terracotta font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Attend Events Card */}
            <div
              className="relative bg-white rounded-3xl p-8 md:p-10 text-left overflow-hidden shadow-warm-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-green/20 to-sky-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-green to-sky-blue mb-6">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-card-title text-charcoal mb-3">Attend Events</h3>
                <p className="text-body-sm text-stone-gray mb-6">
                  Events are coming soon. Stay tuned for Cultural Nights and Pow Wows!
                </p>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage-green/10 text-sage-green font-semibold rounded-full text-sm">
                  Coming Soon
                </span>
              </div>
            </div>
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

