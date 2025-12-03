import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  ArrowRight, 
  Crown, 
  Medal, 
  Award,
  Check,
  Users,
  Megaphone,
  Calendar,
  Image as ImageIcon,
  Star,
  Ticket,
  Handshake,
  FileText,
  Mountain
} from 'lucide-react'
import Image from 'next/image'
import { TIER_INFO } from '@/lib/sponsorships'

const tierIcons = {
  bronze: Award,
  silver: Medal,
  gold: Crown,
}

// Sponsorship benefits by tier
const tierBenefits = {
  bronze: [
    { icon: Ticket, text: '5 VIP Powwow tickets', highlight: true },
    { icon: ImageIcon, text: 'Logo on website sponsors page' },
    { icon: Megaphone, text: 'Social media recognition' },
    { icon: FileText, text: 'Certificate of appreciation' },
    { icon: Heart, text: 'Tax-deductible donation receipt' },
  ],
  silver: [
    { icon: Ticket, text: '10 VIP Powwow tickets', highlight: true },
    { icon: ImageIcon, text: 'Prominent logo on website' },
    { icon: Megaphone, text: 'Featured social media posts' },
    { icon: Calendar, text: 'Recognition at major events' },
    { icon: FileText, text: 'Certificate of appreciation' },
    { icon: Heart, text: 'Tax-deductible donation receipt' },
  ],
  gold: [
    { icon: Mountain, text: 'Indian Canyon Cultural Experience (up to 50 guests)', highlight: true, featured: true },
    { icon: Ticket, text: '25 VIP Powwow tickets', highlight: true },
    { icon: Crown, text: 'Premium logo placement on all materials' },
    { icon: Megaphone, text: 'Dedicated social media feature' },
    { icon: Calendar, text: 'Recognition at all major events' },
    { icon: Users, text: 'Meet & greet with leadership' },
    { icon: Handshake, text: 'Partnership opportunities' },
    { icon: Star, text: 'Exclusive sponsor updates' },
    { icon: FileText, text: 'Premium certificate of appreciation' },
    { icon: Heart, text: 'Tax-deductible donation receipt' },
  ],
}

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Top Section: Light/Warm Gray */}
      <div className="py-12 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft mb-6">
              <Heart className="w-4 h-4 text-terracotta" />
              <span className="text-label-badge text-charcoal">Make an Impact Today</span>
            </div>
            <h1 className="text-hero text-charcoal mb-4">
              Become a <span className="text-italic-accent text-terracotta">Sponsor</span>
            </h1>
            <p className="text-body text-stone-gray max-w-2xl mx-auto">
              Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Packages Section: Dark */}
      <div className="bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Sponsorship{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600">
                Packages
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Partner with INDN to preserve Indigenous culture, support youth programs, and strengthen communities across 12+ tribal nations.
            </p>
          </div>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Bronze Tier */}
            <Card className="relative border-0 shadow-elevated overflow-hidden bg-white group hover:-translate-y-2 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-700" />
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-1">Bronze</h3>
                  <p className="text-stone-gray text-sm">{TIER_INFO.bronze.description}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <p className="text-4xl font-bold text-charcoal">
                    ${TIER_INFO.bronze.minAmount.toLocaleString()}
                  </p>
                  <p className="text-stone-gray text-sm">sponsorship</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tierBenefits.bronze.map((benefit, i) => (
                    <li key={i} className={`flex items-start gap-3 ${benefit.highlight ? 'bg-amber-50 -mx-2 px-2 py-2 rounded-lg' : ''}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${benefit.highlight ? 'bg-amber-500' : 'bg-amber-100'}`}>
                        <Check className={`w-3 h-3 ${benefit.highlight ? 'text-white' : 'text-amber-700'}`} />
                      </div>
                      <span className={`text-sm ${benefit.highlight ? 'font-semibold text-amber-800' : 'text-charcoal'}`}>{benefit.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                >
                  <Link href="/sponsor/apply?tier=bronze" className="flex items-center justify-center gap-2">
                    Become Bronze Sponsor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Silver Tier */}
            <Card className="relative border-0 shadow-elevated overflow-hidden bg-white group hover:-translate-y-2 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-500" />
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Medal className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-1">Silver</h3>
                  <p className="text-stone-gray text-sm">{TIER_INFO.silver.description}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <p className="text-4xl font-bold text-charcoal">
                    ${TIER_INFO.silver.minAmount.toLocaleString()}
                  </p>
                  <p className="text-stone-gray text-sm">sponsorship</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tierBenefits.silver.map((benefit, i) => (
                    <li key={i} className={`flex items-start gap-3 ${benefit.highlight ? 'bg-gray-100 -mx-2 px-2 py-2 rounded-lg' : ''}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${benefit.highlight ? 'bg-gray-500' : 'bg-gray-200'}`}>
                        <Check className={`w-3 h-3 ${benefit.highlight ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className={`text-sm ${benefit.highlight ? 'font-semibold text-gray-800' : 'text-charcoal'}`}>{benefit.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white"
                >
                  <Link href="/sponsor/apply?tier=silver" className="flex items-center justify-center gap-2">
                    Become Silver Sponsor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Gold Tier - Featured */}
            <Card className="relative border-0 shadow-elevated overflow-hidden bg-white group hover:-translate-y-2 transition-all duration-300 md:-mt-4 md:mb-4">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                  MOST IMPACT
                </span>
              </div>
              <div className="h-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500" />
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal mb-1">Gold</h3>
                  <p className="text-stone-gray text-sm">{TIER_INFO.gold.description}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-yellow-100">
                  <p className="text-5xl font-bold text-charcoal">
                    ${TIER_INFO.gold.minAmount.toLocaleString()}
                  </p>
                  <p className="text-stone-gray text-sm">and above</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tierBenefits.gold.map((benefit, i) => (
                    <li key={i} className={`flex items-start gap-3 ${benefit.highlight ? 'bg-yellow-100 -mx-2 px-2 py-2 rounded-lg' : ''}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${benefit.highlight ? 'bg-yellow-500' : 'bg-yellow-100'}`}>
                        <Check className={`w-3 h-3 ${benefit.highlight ? 'text-white' : 'text-yellow-700'}`} />
                      </div>
                      <span className={`text-sm ${benefit.highlight ? 'font-semibold text-yellow-800' : 'text-charcoal'}`}>{benefit.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-amber-600 text-white shadow-lg"
                >
                  <Link href="/sponsor/apply?tier=gold" className="flex items-center justify-center gap-2">
                    Become Gold Sponsor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Indian Canyon Cultural Experience - Gold Exclusive */}
          <Card className="mb-12 border-0 overflow-hidden bg-gradient-to-br from-yellow-900/20 via-amber-900/10 to-yellow-900/20 backdrop-blur">
            <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
            <CardContent className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <Mountain className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30 mb-3">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-400 tracking-wide">GOLD TIER EXCLUSIVE</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Indian Canyon Cultural Experience
                  </h3>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    An exclusive private tour for up to 50 guests at Indian Canyon, a sacred Costanoan Ohlone cultural site. 
                    Experience hands-on learning through immersive cultural programming.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-yellow-400 font-semibold text-sm">Native Cooking</p>
                      <p className="text-white/60 text-xs">Traditional food preparation</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-yellow-400 font-semibold text-sm">Crafts & Gardening</p>
                      <p className="text-white/60 text-xs">Hands-on cultural education</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-yellow-400 font-semibold text-sm">Native Customs</p>
                      <p className="text-white/60 text-xs">Cultural teachings & history</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Why Sponsor */}
            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Why Become a Sponsor?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Make Real Impact</p>
                      <p className="text-sm text-white/70">
                        Support cultural preservation, youth education, and community programs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Connect With Community</p>
                      <p className="text-sm text-white/70">
                        Engage with 12+ tribal nations and 1,000+ community members
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                      <Megaphone className="w-4 h-4 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Visibility & Recognition</p>
                      <p className="text-sm text-white/70">
                        Showcase your commitment to diversity and Indigenous support
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tax Info */}
            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Tax Information</h3>
                <div className="space-y-4">
                  <p className="text-white/80">
                    The Indigenous Nations Diversity Network is a registered 501(c)(3) 
                    nonprofit organization. Your sponsorship is tax-deductible to the 
                    extent allowed by law.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-white/70 mb-1">Tax ID (EIN)</p>
                    <p className="text-xl font-mono font-bold text-white">XX-XXXXXXX</p>
                  </div>
                  <p className="text-sm text-white/60">
                    You will receive an official tax receipt after your sponsorship is processed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-0 bg-gradient-to-br from-terracotta to-sunset-orange overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-white/90 mb-8 max-w-xl mx-auto">
                  Join our growing family of sponsors who believe in preserving Indigenous 
                  culture and empowering future generations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-terracotta hover:bg-white/90 font-semibold shadow-lg"
                  >
                    <Link href="/sponsor/apply" className="flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <Link href="/sponsors">View Current Sponsors</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <p className="text-white/60 mb-2">Have questions about sponsorship?</p>
            <p className="text-white">
              Contact us at{' '}
              <a
                href="mailto:sponsors@indn.org"
                className="text-sunset-orange hover:text-sunset-orange/80 underline"
              >
                sponsors@indn.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
