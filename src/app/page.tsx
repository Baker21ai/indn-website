'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { boardMembers } from '@/data/leadership'
import {
  ChevronDown, ChevronUp, Heart, Users, Calendar, MapPin,
  Clock, Mail, Phone, Tent, Music, Palette, Award, ExternalLink,
  Moon, Sprout, Sparkles, Users2, Shield, Zap, Mountain, Bird,
  Handshake, Star
} from 'lucide-react'

export default function HomePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Hero - Circular/Organic Design */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-terracotta to-sunset-orange/40">
        {/* Background gradient circles */}
        <div className="absolute top-[-50%] right-[-20%] w-full h-full bg-[radial-gradient(circle,_rgba(255,107,53,0.3)_0%,_transparent_70%)] rounded-full" />
        <div className="absolute bottom-[-40%] left-[-30%] w-full h-full bg-[radial-gradient(circle,_rgba(234,107,62,0.2)_0%,_transparent_70%)] rounded-full" />

        <div className="relative z-10 text-center text-white max-w-[1000px] px-4 sm:px-6 md:px-10">
          {/* Full logo */}
          <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-warm-gray/10 w-full max-w-[280px] sm:max-w-[380px] md:max-w-[500px] aspect-square flex items-center justify-center">
              <Image
                src="/images/logo/indn-full-logo.jpg"
                alt="Indigenous Nations Diversity Network"
                width={500}
                height={150}
                className="w-full max-w-[85%] h-auto"
                priority
              />
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 sm:mb-8">
            Welcome to Our Circle
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed opacity-95 max-w-[700px] mx-auto px-2 sm:px-0">
            Where ancestral wisdom meets tomorrow&apos;s possibilities, and every young person belongs to something greater than themselves
          </p>
        </div>
      </section>

      {/* Six Values Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal mb-5 font-semibold">
              Rooted in Our Values
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-stone-gray max-w-[700px] mx-auto font-light px-2 sm:px-0">
              Everything we do flows from the principles that have guided Indigenous communities for generations
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-[800px] mx-auto">
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
                className="bg-warm-gray p-8 sm:p-10 md:p-12 rounded-full aspect-square flex flex-col items-center justify-center text-center transition-all duration-400 border-[3px] border-transparent hover:bg-white hover:border-terracotta hover:scale-105 hover:shadow-[0_10px_40px_rgba(234,107,62,0.15)]"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-charcoal mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-[0.95rem] text-stone-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-br from-terracotta to-sunset-orange text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10 text-center font-semibold">
            How This Circle Began
          </h2>
          
          <p className="text-xl leading-loose mb-8 opacity-95 font-light">
            In 2023, when the San Juan Bautista Indian Market closed, something precious was lost. Not just an event, but a gathering place. A home for Indigenous youth in San Benito County to see themselves reflected, to connect with their heritage, to simply belong.
          </p>

          <p className="text-xl leading-loose mb-8 opacity-95 font-light">
            We didn&apos;t wait for someone else to fill that void. Our community came together. Elders who carried knowledge, families who carried hope, and youth who carried tomorrow&apos;s dreams created something new.
          </p>

          <div className="bg-white/10 p-10 rounded-[20px] my-12 border-l-4 border-terracotta">
            <p className="font-serif text-[1.6rem] italic leading-relaxed">
              &ldquo;We are the only organization providing year-round Indigenous cultural programming in San Benito County. But we&apos;re not here to replace what was lost. We&apos;re here to build what&apos;s needed.&rdquo;
            </p>
          </div>

          <p className="text-xl leading-loose mb-8 opacity-95 font-light">
            From 500 to 1,000+ participants in three years. From one annual event to monthly gatherings, youth-led programs, gardens growing food for families, and AI workshops preparing our youth for futures we can barely imagine.
          </p>

          <p className="text-3xl leading-tight font-bold text-white mt-12 drop-shadow-lg">
            This is what happens when a community refuses to let its youth fall through the cracks.
          </p>
        </div>
      </section>
      {/* Board Members Section */}
      <section id="board" className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-orange shadow-soft mb-8">
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white tracking-wide">
                Leadership & Guidance
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6 font-semibold tracking-tight">
              Meet Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
                Board
              </span>
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
              Our board members bring decades of experience in Indigenous
              advocacy, cultural preservation, and community leadership. Together,
              they guide INDN&apos;s mission to honor heritage and empower future
              generations.
            </p>
          </div>

          {/* Board Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <Card
                key={member.id}
                className="shadow-elevated border-0 overflow-hidden hover:shadow-elevated-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient top border */}
                <div className="h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />

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

      {/* Programs Section */}
      <section className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl text-white mb-5 font-semibold">
              How We Walk Together
            </h2>
            <p className="text-xl text-white/80 max-w-[700px] mx-auto font-light">
              Our programs are interconnected, just like our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
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
                className="bg-gradient-to-br from-sunset-orange to-terracotta p-12 rounded-[30px] shadow-[0_4px_20px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,107,53,0.5)] relative border-2 border-sunset-orange hover:border-white"
              >
                <div className="absolute top-[-10px] right-[-10px] w-16 h-16 bg-white rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />

                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <program.Icon className="w-8 h-8 text-sunset-orange" />
                </div>
                
                <h3 className="text-[1.6rem] text-white mb-4 font-semibold">
                  {program.title}
                </h3>
                
                <p className="text-lg leading-relaxed text-white/90 mb-5">
                  {program.description}
                </p>
                
                <div className="text-[0.95rem] text-white font-semibold italic">
                  {program.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessings Section */}
      <section className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="mb-16">
            <h2 className="font-serif text-5xl text-white mb-5 font-semibold">
              Guided by Our Leaders
            </h2>
          </div>

          <p className="max-w-[700px] mx-auto mb-20 text-xl leading-loose text-white/80 font-light">
            Our work is blessed and guided by tribal leaders who have stewarded their communities for generations. Their trust is our foundation. Their wisdom lights our path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                className="bg-gradient-to-br from-sunset-orange to-sunset-coral p-16 rounded-[30px] transition-all hover:border-white border-2 border-sunset-orange hover:-translate-y-2 shadow-[0_4px_20px_rgba(255,107,53,0.3)] hover:shadow-[0_12px_40px_rgba(255,107,53,0.5)]"
              >
                <div className="w-[50px] h-[50px] border-2 border-white rounded-full mx-auto mb-6" />

                <h4 className="font-serif text-2xl text-white mb-2 font-semibold">
                  {leader.name}
                </h4>

                <p className="text-white text-base mb-5 italic">
                  {leader.affiliation}
                </p>

                <p className="text-white/90 text-[0.95rem] leading-relaxed">
                  {leader.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events/Powow Section */}
      <section id="events" className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-5xl font-bold text-sunset-orange mb-4 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
              Join us in celebrating indigenous culture, community, and tradition
            </p>
          </div>

          {/* Featured Event - Powwow */}
          <Card className="shadow-elevated border-0 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />

            {/* Flyer Image Hero */}
            <div className="relative w-full bg-gradient-to-br from-charcoal to-terracotta/30">
              <div className="max-w-2xl mx-auto p-4">
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

            <CardContent className="p-8 md:p-12">
              {/* Event Badges */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                <Badge className="bg-terracotta text-white px-4 py-2 text-sm">Cultural Celebration</Badge>
                <Badge className="bg-sunset-orange text-white px-4 py-2 text-sm">3-Day Event</Badge>
                <Badge className="bg-sunset-coral text-white px-4 py-2 text-sm">Free Admission</Badge>
                <Badge className="bg-terracotta text-white px-4 py-2 text-sm">Family Friendly</Badge>
              </div>

              {/* Quick Event Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Dates</p>
                    <p className="text-stone-gray">November 7-9, 2025</p>
                    <p className="text-sm text-stone-gray">Friday - Sunday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Location</p>
                    <p className="text-stone-gray">Bolado Park</p>
                    <p className="text-sm text-stone-gray">Tres Pinos, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Admission</p>
                    <p className="text-sunset-orange font-semibold">FREE</p>
                    <p className="text-sm text-stone-gray">Community Event</p>
                  </div>
                </div>
              </div>

              {/* Contact & Camping */}
              <div className="border-t border-terracotta/20 pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-terracotta" />
                      Contact & Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sunset-orange" />
                        <div>
                          <p className="text-sm text-muted-foreground">General Info</p>
                          <a href="tel:+18318015530" className="text-sunset-orange hover:underline font-medium">
                            (831) 801-5530
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Camping */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Tent className="w-5 h-5 text-terracotta" />
                      RV & Tent Camping
                    </h3>
                    <div className="bg-sunset-orange/5 rounded-lg p-4">
                      <p className="text-stone-gray mb-3">
                        Camping available at the event site for the weekend
                      </p>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sunset-orange" />
                        <div>
                          <p className="text-sm text-muted-foreground">Camping Reservations</p>
                          <a href="tel:+18316289421" className="text-sunset-orange hover:underline font-medium">
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
      <section id="sponsors" className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-5xl font-bold text-white mb-6 tracking-tight">
            Our Generous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-coral">
              Sponsors
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Thank you to the individuals and organizations making our mission possible
          </p>

          <div className="mb-12">
            <p className="text-white/80 mb-4">
              Our sponsors help preserve indigenous culture, support educational programs, and empower communities across 12+ tribal nations.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white shadow-card hover:shadow-card-hover transition-depth"
            >
              <Link href="/sponsors">View All Sponsors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section */}
      <section id="become-sponsor" className="bg-charcoal py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset-orange shadow-soft mb-6">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white tracking-wide">Make an Impact Today</span>
            </div>
            <h2 className="font-serif text-5xl font-bold text-white mb-4 tracking-tight">
              Become a <span className="text-sunset-orange">Sponsor</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
              Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
            </p>
          </div>

          {/* Main Sponsorship Card */}
          <Card className="mb-12 shadow-elevated border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-sunset-orange via-terracotta to-sunset-coral" />
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                {/* Left: QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-card">
                    <Image
                      src="/images/barcode.png"
                      alt="Sponsorship QR Code"
                      width={256}
                      height={256}
                      className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl"
                    />
                  </div>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base text-stone-gray font-medium">Scan to become a sponsor instantly</p>
                </div>

                {/* Right: Info and Link */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3 sm:mb-4 tracking-tight">
                    Make Your Impact
                  </h3>
                  <p className="text-base sm:text-lg text-stone-gray mb-6 sm:mb-8 leading-relaxed font-normal">
                    Every sponsorship helps us preserve indigenous culture, support educational programs, and empower communities.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-terracotta/5 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-extrabold text-terracotta tracking-tight">$2.5M+</div>
                      <div className="text-xs sm:text-sm text-stone-gray font-medium">Total Raised</div>
                    </div>
                    <div className="bg-sunset-orange/5 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-extrabold text-sunset-orange tracking-tight">1,000+</div>
                      <div className="text-xs sm:text-sm text-stone-gray font-medium">Lives Impacted</div>
                    </div>
                  </div>

                  {/* Sponsor Button */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full group bg-sunset-orange hover:bg-sunset-orange/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
                  >
                    <a
                      href="https://example.com/sponsor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <Heart className="w-5 h-5" />
                      Become a Sponsor
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                  <p className="text-xs text-stone-gray/70 text-center mt-3">Secure sponsorship processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Tiers */}
          <Card className="mb-12 bg-white border-0 shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center">
                Sponsorship Tiers
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <div className="flex justify-center mb-2">
                    <Shield className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-1">Turtle Tier</h4>
                  <p className="text-sm text-stone-gray mb-2">$100 - $999</p>
                  <p className="text-xs text-stone-gray">Foundation supporter</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100/50">
                  <div className="flex justify-center mb-2">
                    <Zap className="w-10 h-10 text-gray-600" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-1">Wolf Tier</h4>
                  <p className="text-sm text-stone-gray mb-2">$1,000 - $4,999</p>
                  <p className="text-xs text-stone-gray">Community champion</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50">
                  <div className="flex justify-center mb-2">
                    <Mountain className="w-10 h-10 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-1">Bear Tier</h4>
                  <p className="text-sm text-stone-gray mb-2">$5,000 - $9,999</p>
                  <p className="text-xs text-stone-gray">Culture protector</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50">
                  <div className="flex justify-center mb-2">
                    <Bird className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-charcoal mb-1">Eagle Tier</h4>
                  <p className="text-sm text-stone-gray mb-2">$10,000+</p>
                  <p className="text-xs text-stone-gray">Visionary leader</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join Section */}
      <section className="relative bg-gradient-to-br from-sunset-orange to-sunset-coral text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 text-center overflow-hidden">
        {/* Circular ornaments */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-terracotta/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-terracotta/15 rounded-full" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="font-serif text-6xl mb-8 font-semibold">
            Join Our Circle
          </h2>
          
          <p className="text-2xl mb-16 opacity-95 font-light leading-relaxed">
            There&apos;s a place for you here. Multiple ways to walk with us, support our youth, and strengthen this community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
                className="bg-white/10 p-10 rounded-[20px] transition-all border-2 border-transparent hover:bg-white/15 hover:border-terracotta hover:-translate-y-2"
              >
                <div className="flex justify-center mb-5">
                  <pathway.Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl mb-4 font-semibold">{pathway.title}</h3>
                <p className="text-base opacity-90 leading-relaxed">{pathway.description}</p>
                <div className="mt-5 text-terracotta font-semibold">→</div>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/20 pt-16 mt-16">
            <h3 className="text-[1.6rem] mb-10 font-normal">
              Have questions? Want to talk? We&apos;re here.
            </h3>
            
            <div className="flex flex-col md:flex-row justify-center gap-20">
              <div className="text-center">
                <strong className="block text-xl mb-4 font-medium">Elvira Zaragoza Robinson</strong>
                <a href="mailto:ezrlaw1948@gmail.com" className="block my-2 text-white/90 hover:text-terracotta transition-colors">
                  ezrlaw1948@gmail.com
                </a>
                <a href="tel:+18318015530" className="block my-2 text-white/90 hover:text-terracotta transition-colors">
                  (831) 801-5530
                </a>
              </div>
              <div className="text-center">
                <strong className="block text-xl mb-4 font-medium">Charles Wall</strong>
                <a href="mailto:charleswallandfam@gmail.com" className="block my-2 text-white/90 hover:text-terracotta transition-colors">
                  charleswallandfam@gmail.com
                </a>
                <a href="tel:+17752710322" className="block my-2 text-white/90 hover:text-terracotta transition-colors">
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

