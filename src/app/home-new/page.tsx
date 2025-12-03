'use client'

import { useState, useEffect } from 'react'
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
    Handshake, Star, ArrowRight, Activity
} from 'lucide-react'

// Live Ticker Component
function LiveTicker() {
    const [messages, setMessages] = useState([
        "Sarah just donated $50!",
        "New volunteer joined from Hollister",
        "Community Garden harvested 20lbs of tomatoes",
        "Michael earned the 'Wolf' badge",
        "Tech Corp matched a $500 donation"
    ])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [messages.length])

    return (
        <div className="bg-charcoal text-white py-2 px-4 overflow-hidden flex items-center justify-center border-b border-white/10">
            <div className="flex items-center gap-2 animate-pulse">
                <Activity className="w-4 h-4 text-sunset-orange" />
                <span className="text-sm font-medium tracking-wide">LIVE IMPACT:</span>
            </div>
            <div className="ml-4 w-64 h-6 relative overflow-hidden">
                <div key={currentIndex} className="animate-in slide-in-from-bottom duration-500 absolute w-full text-sm text-stone-300">
                    {messages[currentIndex]}
                </div>
            </div>
        </div>
    )
}

export default function HomePageVariantB() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-warm-gray font-sans selection:bg-terracotta selection:text-white">
            <LiveTicker />

            {/* Hero - Premium Video/Parallax Feel */}
            <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-charcoal">
                    <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta/80 via-charcoal/90 to-charcoal/95 z-10"></div>
                    {/* Animated Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sunset-orange/20 rounded-full blur-3xl animate-pulse duration-[10s]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage-green/10 rounded-full blur-3xl animate-pulse duration-[8s] delay-1000"></div>
                </div>

                <div className="relative z-20 text-center text-white max-w-[1200px] px-6">
                    <div className="mb-12 flex justify-center">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-full border border-white/10 shadow-2xl">
                            <Image
                                src="/images/logo/indn-full-logo.jpg"
                                alt="Indigenous Nations Diversity Network"
                                width={400}
                                height={120}
                                className="w-auto h-24 md:h-32 object-contain brightness-110"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight drop-shadow-xl">
                        Standing <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-orange to-sunset-gold">Together</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90 max-w-[800px] mx-auto mb-12 text-balance">
                        Honoring our ancestors by empowering our youth. Join the circle where culture, community, and innovation meet.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white text-lg px-10 py-8 rounded-full shadow-terracotta hover:scale-105 transition-all duration-300">
                            Make a Difference
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-8 rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300">
                            Learn Our Story
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                    <ChevronDown className="w-8 h-8" />
                </div>
            </section>

            {/* Impact Stats - Glassmorphism */}
            <section className="relative -mt-20 z-30 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Lives Impacted", value: "1,000+", icon: Users },
                        { label: "Tribal Nations", value: "12+", icon: MapPin },
                        { label: "Youth Programs", value: "15+", icon: Sprout },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-elevated border border-white/50 flex items-center gap-6 hover:-translate-y-1 transition-transform duration-300">
                            <div className="bg-terracotta/10 p-4 rounded-full">
                                <stat.icon className="w-8 h-8 text-terracotta" />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-charcoal">{stat.value}</div>
                                <div className="text-stone-gray font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values Section - Clean Grid */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">Rooted in Our Values</h2>
                        <p className="text-xl text-stone-gray max-w-2xl mx-auto">Principles that have guided Indigenous communities for generations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Respect', desc: 'For elders, traditions, land, and every person in our circle.' },
                            { title: 'Reciprocity', desc: 'What we receive, we give back. What we learn, we share.' },
                            { title: 'Relationality', desc: 'We are connected to each other, our ancestors, and future generations.' },
                            { title: 'Responsibility', desc: 'To preserve culture and prepare youth for the world they will inherit.' },
                            { title: 'Relevance', desc: 'Honoring tradition while embracing what youth need today.' },
                            { title: 'Representation', desc: 'Every voice matters, every story deserves to be heard.' }
                        ].map((value, i) => (
                            <div key={i} className="group p-10 rounded-[2rem] bg-warm-gray/30 hover:bg-white border border-transparent hover:border-terracotta/20 transition-all duration-300 hover:shadow-xl">
                                <h3 className="font-serif text-2xl font-bold text-charcoal mb-4 group-hover:text-terracotta transition-colors">{value.title}</h3>
                                <p className="text-stone-gray leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative Section - "The Why" */}
            <section className="py-32 px-6 bg-warm-gray overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 bg-white p-2 rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/images/powwow-flyer.jpg"
                                alt="Community Gathering"
                                width={600}
                                height={800}
                                className="rounded-[1.5rem] w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-green/10 text-sage-green font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Our Origin Story</span>
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl text-charcoal font-bold mb-8 leading-tight">
                            From a Void came a <span className="text-terracotta">Vision</span>.
                        </h2>
                        <p className="text-xl text-stone-gray leading-relaxed mb-8">
                            In 2023, when our local Indian Market closed, we didn&apos;t just lose an event—we lost our gathering place. But in that silence, we heard a call to action.
                        </p>
                        <p className="text-xl text-stone-gray leading-relaxed mb-10">
                            We built INDN not to replace what was lost, but to create what was needed: a year-round home for culture, connection, and the future of our youth.
                        </p>

                        <div className="flex gap-4">
                            <Button variant="link" className="text-terracotta text-lg font-semibold p-0 hover:text-terracotta/80 group">
                                Read the full story <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Board Members - Premium Cards */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-5xl font-bold text-charcoal mb-6">Leadership & Guidance</h2>
                        <p className="text-xl text-stone-gray max-w-2xl mx-auto">Decades of experience in advocacy, preservation, and community leadership.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {boardMembers.map((member) => (
                            <div key={member.id} className="group bg-white rounded-[2rem] border border-stone-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                                <div className="h-32 bg-gradient-to-r from-terracotta to-sunset-orange relative">
                                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 p-1 bg-white rounded-full">
                                        <div className="w-32 h-32 rounded-full overflow-hidden relative">
                                            <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-20 pb-8 px-8 text-center">
                                    <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">{member.name}</h3>
                                    <p className="text-terracotta font-semibold text-sm mb-2">{member.tribe}</p>
                                    <p className="text-stone-gray text-sm mb-6">{member.title}</p>

                                    <div className={`text-stone-600 text-sm leading-relaxed mb-6 ${expandedId === member.id ? '' : 'line-clamp-3'}`}>
                                        {member.bio}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleExpand(member.id)}
                                        className="text-terracotta hover:text-terracotta/80 hover:bg-terracotta/5 w-full"
                                    >
                                        {expandedId === member.id ? 'Show Less' : 'Read Full Bio'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs - Cards with Hover Effects */}
            <section className="py-32 px-6 bg-charcoal text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">How We Walk Together</h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">Interconnected programs designed to nurture every aspect of our community.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: 'Cultural Nights',
                                desc: 'Monthly gatherings keeping traditions alive through shared meals and arts.',
                                icon: Moon,
                                color: 'from-sunset-orange to-terracotta'
                            },
                            {
                                title: 'Youth Garden',
                                desc: 'Connecting hands to earth, growing food and wisdom simultaneously.',
                                icon: Sprout,
                                color: 'from-sage-green to-emerald-600'
                            },
                            {
                                title: 'Four Directions',
                                desc: 'Bridging ancient wisdom with modern tech through AI and career workshops.',
                                icon: Sparkles,
                                color: 'from-sky-blue to-blue-600'
                            },
                            {
                                title: 'Annual Pow Wow',
                                desc: 'Our flagship celebration of joy, dance, and unity.',
                                icon: Users2,
                                color: 'from-sunset-purple to-purple-600'
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className="p-10 relative z-10">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-serif text-3xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-lg text-white/70 leading-relaxed mb-8">{item.desc}</p>
                                    <div className="flex items-center text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Event - Integrated Design */}
            <section className="py-32 px-6 bg-warm-gray">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
                        <div className="relative h-[500px] md:h-auto bg-charcoal">
                            <Image src="/images/powwow-flyer.jpg" alt="Powwow Flyer" fill className="object-contain p-8" />
                        </div>
                        <div className="p-12 md:p-20 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 text-terracotta font-bold tracking-widest uppercase text-sm mb-6">
                                <Calendar className="w-4 h-4" />
                                Upcoming Event
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">3rd Annual Hollister Powwow</h2>
                            <p className="text-xl text-stone-gray mb-8 leading-relaxed">Join us for a 3-day celebration of Indigenous culture, dance, and community at Bolado Park.</p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 text-charcoal font-medium">
                                    <Clock className="w-5 h-5 text-terracotta" />
                                    <span>November 7-9, 2025</span>
                                </div>
                                <div className="flex items-center gap-4 text-charcoal font-medium">
                                    <MapPin className="w-5 h-5 text-terracotta" />
                                    <span>Bolado Park, Tres Pinos, CA</span>
                                </div>
                                <div className="flex items-center gap-4 text-charcoal font-medium">
                                    <TicketIcon className="w-5 h-5 text-terracotta" />
                                    <span>Free Admission</span>
                                </div>
                            </div>

                            <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-10 py-6 w-fit">
                                Event Details
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsors - Clean Grid */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">Our Generous Sponsors</h2>
                    <p className="text-xl text-stone-gray max-w-2xl mx-auto mb-16">Making our mission possible through their support.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {[
                            { tier: 'Eagle', amount: '$10k+', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                            { tier: 'Bear', amount: '$5k+', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                            { tier: 'Wolf', amount: '$1k+', color: 'bg-gray-50 text-gray-700 border-gray-200' },
                            { tier: 'Turtle', amount: '$100+', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        ].map((tier, i) => (
                            <div key={i} className={`p-8 rounded-2xl border ${tier.color} flex flex-col items-center justify-center`}>
                                <div className="text-3xl font-serif font-bold mb-2">{tier.tier}</div>
                                <div className="text-sm font-medium opacity-80">{tier.amount}</div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" size="lg" className="rounded-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-10">
                        Become a Sponsor
                    </Button>
                </div>
            </section>

            {/* Call to Action - Join the Circle */}
            <section className="py-32 px-6 bg-gradient-to-br from-terracotta to-sunset-orange text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif text-6xl md:text-7xl font-bold mb-8">Join Our Circle</h2>
                    <p className="text-2xl opacity-90 mb-12 max-w-2xl mx-auto">
                        Whether you donate, volunteer, or simply share our story, you become part of the solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="bg-white text-terracotta hover:bg-white/90 text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Become a Sponsor
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-12 py-8 rounded-full hover:scale-105 transition-all duration-300">
                            Volunteer With Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

function TicketIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
        </svg>
    )
}
