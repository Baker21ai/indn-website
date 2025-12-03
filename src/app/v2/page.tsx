'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { boardMembers } from '@/data/leadership'
import {
  ChevronDown, Heart, Users, Calendar, MapPin,
  Mail, Phone, Tent, ArrowRight,
  Moon, Sprout, Sparkles, Users2, Shield, Zap, Mountain, Bird,
  Handshake, Star, Play, Instagram, Facebook, Twitter
} from 'lucide-react'

// Custom hook for intersection observer animations
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isRevealed }
}

// Reveal wrapper component
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isRevealed } = useReveal()
  
  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function HomePageV2() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-warm-gray overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - Full viewport with staggered animations
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3a2f2f] to-terracotta/60" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(255,107,53,0.4)_0%,_transparent_70%)] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-30%] left-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(143,185,150,0.2)_0%,_transparent_70%)] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 texture-woven opacity-50" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-[1100px] px-6 md:px-10">
          {/* Logo with entrance animation */}
          <div className={`mb-12 flex justify-center transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-sunset-orange/30 rounded-full blur-3xl scale-150" />
              <div className="relative bg-white p-10 sm:p-14 md:p-20 rounded-full shadow-2xl border border-white/20 w-[380px] sm:w-[550px] md:w-[750px] aspect-square flex items-center justify-center">
                <Image
                  src="/images/logo/indn-full-logo.jpg"
                  alt="Indigenous Nations Diversity Network"
                  width={750}
                  height={225}
                  className="w-full max-w-[85%] h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Headline with staggered animation */}
          <h1 
            className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 tracking-tight transition-all duration-1000 delay-200 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange via-sunset-coral to-sunset-honey">
              Our Circle
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg sm:text-xl md:text-2xl font-light leading-relaxed opacity-90 max-w-[750px] mx-auto mb-12 transition-all duration-1000 delay-400 ${heroLoaded ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Where ancestral wisdom meets tomorrow&apos;s possibilities, and every young person belongs to something greater than themselves
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="#story" 
              className="group px-8 py-4 bg-sunset-orange hover:bg-sunset-orange/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Our Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#become-sponsor" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Support Our Mission
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 bounce-gentle" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          VALUES SECTION - Light section with circles
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 bg-sage-green/10 text-sage-green rounded-full text-sm font-semibold tracking-wide mb-6">
              Our Foundation
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal mb-6 font-semibold tracking-tight">
              Rooted in Our Values
            </h2>
            <p className="text-lg md:text-xl text-stone-gray max-w-[700px] mx-auto font-light">
              Everything we do flows from the principles that have guided Indigenous communities for generations
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-[900px] mx-auto">
            {[
              { title: 'Respect', description: 'For elders, traditions, land, and every person in our circle' },
              { title: 'Reciprocity', description: 'What we receive, we give back. What we learn, we share.' },
              { title: 'Relationality', description: 'We are connected to each other, our ancestors, and future generations' },
              { title: 'Responsibility', description: 'To preserve culture and prepare youth for the world they will inherit' },
              { title: 'Relevance', description: 'Honoring tradition while embracing what youth need today' },
              { title: 'Representation', description: 'Every voice matters, every story deserves to be heard' }
            ].map((value, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="group bg-gradient-to-br from-warm-gray to-white p-6 sm:p-8 md:p-10 rounded-full aspect-square flex flex-col items-center justify-center text-center transition-all duration-500 border-2 border-transparent hover:border-terracotta hover:shadow-xl hover:scale-105 cursor-default">
                  <h3 className="text-lg sm:text-xl font-semibold text-charcoal mb-2 sm:mb-3 group-hover:text-terracotta transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-[0.95rem] text-stone-gray leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STORY SECTION - Gradient with quote
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="story" className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-sunset-orange to-sunset-coral" />
        <div className="absolute inset-0 texture-woven" />
        
        <div className="relative max-w-[900px] mx-auto text-white">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-10 text-center font-semibold tracking-tight">
              How This Circle Began
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
              In 2023, when the San Juan Bautista Indian Market closed, something precious was lost. Not just an event, but a gathering place. A home for Indigenous youth in San Benito County to see themselves reflected, to connect with their heritage, to simply <em>belong</em>.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
              We didn&apos;t wait for someone else to fill that void. Our community came together. Elders who carried knowledge, families who carried hope, and youth who carried tomorrow&apos;s dreams created something new.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="bg-white/15 backdrop-blur-sm p-8 md:p-12 rounded-3xl my-12 border-l-4 border-white">
              <p className="font-serif text-2xl md:text-3xl italic leading-relaxed">
                &ldquo;We are the only organization providing year-round Indigenous cultural programming in San Benito County. But we&apos;re not here to replace what was lost. We&apos;re here to build what&apos;s needed.&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
              1,000+ participants in three years. From one annual event to monthly gatherings, youth-led programs, gardens, and AI workshops preparing our youth for futures we can barely imagine.
            </p>
          </Reveal>

          <Reveal delay={500}>
            <p className="text-2xl md:text-3xl leading-tight font-bold mt-12 text-center">
              This is what happens when a community refuses to let its youth fall through the cracks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOARD SECTION - Light background with premium cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="board" className="py-24 md:py-32 px-6 md:px-10 bg-gradient-to-b from-warm-gray to-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-sunset-orange/10 text-sunset-orange rounded-full text-sm font-semibold tracking-wide mb-6">
              <Users className="w-4 h-4 inline mr-2" />
              Leadership & Guidance
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal mb-6 font-semibold tracking-tight">
              Meet Our{' '}
              <span className="gradient-text">Board</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-gray max-w-3xl mx-auto font-light leading-relaxed">
              Our board members bring decades of experience in Indigenous advocacy, cultural preservation, and community leadership.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <Reveal key={member.id} delay={index * 100}>
                <div className="group card-premium rounded-2xl overflow-hidden">
                  {/* Gradient accent */}
                  <div className="h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
                  
                  <div className="p-8">
                    {/* Photo with hover effect */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange to-terracotta rounded-full opacity-0 group-hover:opacity-20 transition-opacity scale-110" />
                        <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-warm-gray/30 group-hover:ring-sunset-orange/30 shadow-xl transition-all">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-charcoal mb-2 text-center tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-terracotta mb-2 text-center">
                      {member.tribe}
                    </p>
                    <p className="text-sm text-stone-gray mb-4 text-center font-medium">
                      {member.title}
                    </p>

                    {/* Bio */}
                    <div className="bg-warm-gray/50 rounded-xl p-4 mb-4">
                      <p className={`text-sm text-charcoal leading-relaxed ${expandedId === member.id ? '' : 'line-clamp-3'}`}>
                        {member.bio}
                      </p>

                      {expandedId === member.id && (
                        <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                          <div>
                            <p className="text-xs font-semibold text-terracotta mb-1 uppercase tracking-wide">Work Experience</p>
                            <p className="text-sm text-charcoal">{member.workExperience}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-terracotta mb-1 uppercase tracking-wide">Volunteer</p>
                            <p className="text-sm text-charcoal">{member.volunteer}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Read More */}
                    <button
                      onClick={() => toggleExpand(member.id)}
                      className="w-full py-3 text-terracotta hover:text-white hover:bg-terracotta rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === member.id ? 'rotate-180' : ''}`} />
                      {expandedId === member.id ? 'Show Less' : 'Read Full Bio'}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROGRAMS SECTION - Dark with sage-green accents
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-charcoal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunset-orange/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold tracking-wide mb-6">
              Our Programs
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 font-semibold tracking-tight">
              How We Walk Together
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-[700px] mx-auto font-light">
              Our programs are interconnected, just like our community
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                Icon: Moon,
                title: 'Cultural Nights',
                description: 'Monthly gatherings where 15-25+ families share meals, learn traditional arts, and keep the drum circle beating. Three generations learning from each other.',
                impact: 'Building belonging, one circle at a time',
                color: 'from-sunset-purple to-sunset-lavender'
              },
              {
                Icon: Sprout,
                title: 'Youth Garden',
                description: 'In our first year, elders share plant knowledge passed down through generations to children ages 5-16.',
                impact: 'Connecting hands to earth, youth to elders',
                color: 'from-sage-green to-emerald-600'
              },
              {
                Icon: Sparkles,
                title: 'Four Directions Initiative',
                description: 'Our vision: career, education, health, and digital media programs where youth lead, not just attend. We are building toward older youth teaching AI literacy to younger peers.',
                impact: 'Leading today, transforming tomorrow',
                color: 'from-sky-blue to-blue-600'
              },
              {
                Icon: Users2,
                title: 'Annual Pow Wow',
                description: '1,000+ participants. Our flagship gathering where the entire year of work blooms into celebration, connection, and collective joy.',
                impact: '1,000+ hearts beating as one',
                color: 'from-sunset-orange to-terracotta'
              }
            ].map((program, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className={`group relative bg-gradient-to-br ${program.color} p-10 md:p-12 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 texture-woven opacity-30" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <program.Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl text-white mb-4 font-semibold tracking-tight">
                      {program.title}
                    </h3>
                    
                    <p className="text-lg leading-relaxed text-white/90 mb-6">
                      {program.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="w-8 h-[2px] bg-white/50" />
                      <span className="italic">{program.impact}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          GUIDED BY LEADERS - Light sage section
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-gradient-to-br from-sage-green/10 via-white to-sky-blue/10">
        <div className="max-w-[1000px] mx-auto text-center">
          <Reveal>
            <span className="inline-block px-4 py-2 bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold tracking-wide mb-6">
              Our Guides
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal mb-6 font-semibold tracking-tight">
              Guided by Our Leaders
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="max-w-[700px] mx-auto mb-16 text-lg md:text-xl leading-relaxed text-stone-gray font-light">
              Our work is blessed and guided by tribal leaders who have stewarded their communities for generations. Their trust is our foundation. Their wisdom lights our path.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ann Marie Sayers', affiliation: 'Indian Canyon', description: 'Cultural keeper and guardian of sacred traditions' },
              { name: 'Kanyon Sayers-Roods', affiliation: 'Costanoan Research', description: 'Scholar preserving and sharing cultural knowledge' },
              { name: 'Valentin Lopez', affiliation: 'Amah Mutsun Tribal Band', description: 'Tribal chairman and community advocate' }
            ].map((leader, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-sage-green/20">
                  <div className="w-20 h-20 bg-gradient-to-br from-sage-green/20 to-sky-blue/20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-12 h-12 border-2 border-sage-green/40 rounded-full" />
                  </div>

                  <h4 className="font-serif text-2xl text-charcoal mb-2 font-semibold">
                    {leader.name}
                  </h4>
                  <p className="text-sage-green font-medium mb-4">
                    {leader.affiliation}
                  </p>
                  <p className="text-stone-gray leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EVENTS SECTION - Featured Powwow
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="events" className="py-24 md:py-32 px-6 md:px-10 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-sunset-gold/20 text-sunset-gold rounded-full text-sm font-semibold tracking-wide mb-6">
              <Calendar className="w-4 h-4 inline mr-2" />
              Mark Your Calendar
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
              Join us in celebrating indigenous culture, community, and tradition
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-premium rounded-3xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-sunset-orange via-sunset-gold to-sunset-coral" />
              
              {/* Flyer */}
              <div className="relative bg-gradient-to-br from-charcoal/50 to-terracotta/20 p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[850/1100] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/powwow-flyer.jpg"
                      alt="3rd Annual Hollister Powwow & Native Gathering"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                  {['Cultural Celebration', '3-Day Event', 'Free Admission', 'Family Friendly'].map((badge, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-terracotta to-sunset-orange text-white text-sm font-medium rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Dates</p>
                      <p className="text-stone-gray">November 7-9, 2025</p>
                      <p className="text-sm text-stone-gray">Friday - Sunday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Location</p>
                      <p className="text-stone-gray">Bolado Park</p>
                      <p className="text-sm text-stone-gray">Tres Pinos, CA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Admission</p>
                      <p className="text-sunset-orange font-bold text-xl">FREE</p>
                      <p className="text-sm text-stone-gray">Community Event</p>
                    </div>
                  </div>
                </div>

                {/* Contact & Camping */}
                <div className="border-t border-stone-gray/20 pt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-terracotta" />
                      Contact & Information
                    </h3>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sunset-orange" />
                      <div>
                        <p className="text-sm text-stone-gray">General Info</p>
                        <a href="tel:+18318015530" className="text-sunset-orange hover:underline font-medium">
                          (831) 801-5530
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Tent className="w-5 h-5 text-terracotta" />
                      RV & Tent Camping
                    </h3>
                    <div className="bg-sunset-orange/5 rounded-xl p-4">
                      <p className="text-stone-gray mb-3 text-sm">
                        Camping available at the event site for the weekend
                      </p>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sunset-orange" />
                        <div>
                          <p className="text-sm text-stone-gray">Reservations</p>
                          <a href="tel:+18316289421" className="text-sunset-orange hover:underline font-medium">
                            (831) 628-9421
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SPONSORS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="sponsors" className="py-24 md:py-32 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <Reveal>
            <span className="inline-block px-4 py-2 bg-sunset-gold/10 text-sunset-gold rounded-full text-sm font-semibold tracking-wide mb-6">
              Our Supporters
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal mb-6 tracking-tight">
              Our Generous{' '}
              <span className="gradient-text">Sponsors</span>
            </h2>
            <p className="text-lg text-stone-gray max-w-2xl mx-auto mb-12 font-light">
              Thank you to the individuals and organizations making our mission possible
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-gradient-to-br from-warm-gray to-white p-8 rounded-3xl mb-8 max-w-3xl mx-auto">
              <p className="text-stone-gray mb-6">
                Our sponsors help preserve indigenous culture, support educational programs, and empower communities across 12+ tribal nations.
              </p>
              <Link 
                href="/sponsors"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white font-semibold rounded-full transition-all"
              >
                View All Sponsors
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BECOME A SPONSOR SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="become-sponsor" className="py-24 md:py-32 px-6 md:px-10 bg-gradient-to-br from-charcoal via-[#3a2f2f] to-charcoal relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sunset-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sunset-orange rounded-full text-white text-sm font-semibold tracking-wide mb-6">
              <Heart className="w-4 h-4" />
              Make an Impact Today
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
              Become a{' '}
              <span className="text-sunset-orange">Sponsor</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
              Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
            </p>
          </Reveal>

          {/* Main Card */}
          <Reveal delay={100}>
            <div className="card-premium rounded-3xl overflow-hidden mb-12">
              <div className="h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="inline-block p-8 bg-gradient-to-br from-warm-gray to-white rounded-3xl shadow-lg">
                      <Image
                        src="/images/barcode.png"
                        alt="Sponsorship QR Code"
                        width={256}
                        height={256}
                        className="w-56 h-56 md:w-64 md:h-64 rounded-xl"
                      />
                    </div>
                    <p className="mt-6 text-stone-gray font-medium">Scan to become a sponsor instantly</p>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-3xl font-bold text-charcoal mb-4 tracking-tight">
                      Make Your Impact
                    </h3>
                    <p className="text-lg text-stone-gray mb-8 leading-relaxed">
                      Every sponsorship helps us preserve indigenous culture, support educational programs, and empower communities.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-extrabold text-terracotta tracking-tight">$2.5M+</div>
                        <div className="text-sm text-stone-gray font-medium">Total Raised</div>
                      </div>
                      <div className="bg-gradient-to-br from-sunset-orange/10 to-sunset-orange/5 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-extrabold text-sunset-orange tracking-tight">1,000+</div>
                        <div className="text-sm text-stone-gray font-medium">Lives Impacted</div>
                      </div>
                    </div>

                    {/* Button */}
                    <a
                      href="https://example.com/sponsor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-sunset-orange to-terracotta hover:from-terracotta hover:to-sunset-orange text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <Heart className="w-5 h-5" />
                      Become a Sponsor
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-xs text-stone-gray text-center mt-3">Secure sponsorship processing</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Sponsorship Tiers */}
          <Reveal delay={200}>
            <div className="card-premium rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-8 text-center">
                Sponsorship Tiers
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: Shield, name: 'Turtle Tier', range: '$100 - $999', desc: 'Foundation supporter', color: 'from-turtle-emerald/20 to-emerald-100/50', iconColor: 'text-turtle-emerald' },
                  { Icon: Zap, name: 'Wolf Tier', range: '$1,000 - $4,999', desc: 'Community champion', color: 'from-wolf-silver/20 to-gray-100/50', iconColor: 'text-wolf-silver' },
                  { Icon: Mountain, name: 'Bear Tier', range: '$5,000 - $9,999', desc: 'Culture protector', color: 'from-bear-amber/20 to-amber-100/50', iconColor: 'text-bear-amber' },
                  { Icon: Bird, name: 'Eagle Tier', range: '$10,000+', desc: 'Visionary leader', color: 'from-eagle-gold/20 to-yellow-100/50', iconColor: 'text-eagle-gold' }
                ].map((tier, i) => (
                  <div key={i} className={`group text-center p-6 rounded-2xl bg-gradient-to-br ${tier.color} hover:scale-105 transition-transform cursor-default`}>
                    <div className="flex justify-center mb-3">
                      <tier.Icon className={`w-12 h-12 ${tier.iconColor} group-hover:scale-110 transition-transform`} />
                    </div>
                    <h4 className="font-semibold text-charcoal mb-1">{tier.name}</h4>
                    <p className="text-sm text-stone-gray mb-2">{tier.range}</p>
                    <p className="text-xs text-stone-gray">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          JOIN OUR CIRCLE CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange via-terracotta to-sunset-coral" />
        <div className="absolute inset-0 texture-woven" />
        
        {/* Circular ornaments */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/15 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/20 rounded-full" />

        <div className="relative max-w-[900px] mx-auto text-center text-white">
          <Reveal>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mb-8 font-semibold tracking-tight">
              Join Our Circle
            </h2>
            <p className="text-xl md:text-2xl mb-16 opacity-90 font-light leading-relaxed max-w-[700px] mx-auto">
              There&apos;s a place for you here. Multiple ways to walk with us, support our youth, and strengthen this community.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { Icon: Handshake, title: 'Become a Sponsor', description: 'Plant seeds for the next generation', link: '/sponsor' },
              { Icon: Star, title: 'Volunteer', description: 'Share your time and heart', link: '/register' },
              { Icon: Mail, title: 'Stay Connected', description: 'Receive stories and updates', link: '#newsletter' },
              { Icon: Calendar, title: 'Attend Events', description: 'Experience our community', link: '/events' }
            ].map((pathway, index) => (
              <Reveal key={index} delay={index * 100}>
                <Link
                  href={pathway.link}
                  className="group bg-white/10 backdrop-blur-sm p-8 rounded-3xl transition-all border border-white/20 hover:bg-white/20 hover:border-white/40 hover:-translate-y-2 block"
                >
                  <div className="flex justify-center mb-4">
                    <pathway.Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg mb-2 font-semibold">{pathway.title}</h3>
                  <p className="text-sm opacity-80">{pathway.description}</p>
                  <div className="mt-4 text-white/60 group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5 mx-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="border-t border-white/20 pt-16">
              <h3 className="text-2xl mb-10 font-light">
                Have questions? Want to talk? We&apos;re here.
              </h3>
              
              <div className="flex flex-col md:flex-row justify-center gap-16">
                <div className="text-center">
                  <strong className="block text-xl mb-3">Elvira Zaragoza Robinson</strong>
                  <a href="mailto:ezrlaw1948@gmail.com" className="block my-1 text-white/80 hover:text-white transition-colors">
                    ezrlaw1948@gmail.com
                  </a>
                  <a href="tel:+18318015530" className="block my-1 text-white/80 hover:text-white transition-colors">
                    (831) 801-5530
                  </a>
                </div>
                <div className="text-center">
                  <strong className="block text-xl mb-3">Charles Wall</strong>
                  <a href="mailto:charleswallandfam@gmail.com" className="block my-1 text-white/80 hover:text-white transition-colors">
                    charleswallandfam@gmail.com
                  </a>
                  <a href="tel:+17752710322" className="block my-1 text-white/80 hover:text-white transition-colors">
                    (775) 271-0322
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ENHANCED FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Mission */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl inline-block">
                <Image
                  src="/images/logo/indn-full-logo.jpg"
                  alt="Indigenous Nations Diversity Network"
                  width={250}
                  height={75}
                  className="w-full max-w-[250px] h-auto"
                />
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">
                Supporting Indigenous communities through cultural preservation, youth empowerment, and community connection. Building belonging, one circle at a time.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sunset-orange rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sunset-orange rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sunset-orange rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <nav className="flex flex-col gap-3">
                {['About Us', 'Our Board', 'Programs', 'Events', 'Donate', 'Volunteer'].map((link) => (
                  <Link key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-white/70 hover:text-sunset-orange transition-colors">
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Stay Connected</h3>
              <p className="text-white/70 text-sm mb-4">
                Get stories, updates, and event invitations delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-sunset-orange transition-colors"
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-sunset-orange hover:bg-sunset-orange/90 text-white font-semibold rounded-xl transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Indigenous Nations Diversity Network. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Made with ❤️ for Indigenous communities
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

