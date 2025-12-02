import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowRight, ExternalLink, Crown, Medal, Award } from 'lucide-react'
import Image from 'next/image'
import { TIER_INFO } from '@/lib/sponsorships'

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-warm-gray py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft mb-6">
            <Heart className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-charcoal tracking-wide">Make an Impact Today</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 tracking-tight">
            Become a <span className="text-terracotta">Sponsor</span>
          </h1>
          <p className="text-lg text-stone-gray max-w-2xl mx-auto leading-relaxed font-normal">
            Your generous sponsorship helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
          </p>
        </div>

        {/* Main Sponsorship Card with depth */}
        <Card className="mb-12 shadow-elevated border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600" />
          <CardContent className="p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: QR Code */}
              <div className="text-center">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-card">
                  <Image
                    src="/images/barcode.png"
                    alt="Sponsorship QR Code - Scan to become a sponsor"
                    width={256}
                    height={256}
                    className="w-64 h-64 rounded-xl"
                  />
                </div>
                <p className="mt-6 text-stone-gray font-medium">Scan to donate instantly</p>
              </div>

              {/* Right: Info and Link */}
              <div>
                <h2 className="text-3xl font-bold text-charcoal mb-4 tracking-tight">
                  Make Your Impact
                </h2>
                <p className="text-lg text-stone-gray mb-8 leading-relaxed font-normal">
                  Every sponsorship helps us preserve indigenous culture, support educational programs, and empower communities across 12+ tribal nations.
                </p>

                {/* Stats - Removed */}

                {/* Sponsor Buttons */}
                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full group bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
                  >
                    <Link
                      href="/sponsor/apply"
                      className="flex items-center justify-center gap-3"
                    >
                      <Heart className="w-5 h-5" />
                      Apply for Sponsorship
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                  >
                    <Link href="/sponsor/packages">
                      View Sponsorship Packages
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-stone-gray/70 text-center mt-3">Company sponsorships available via check payment</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              {/* Bronze */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-100/80 to-amber-200/50 border-2 border-amber-400/30">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-charcoal mb-1 text-lg">Bronze</h4>
                <p className="text-sm text-stone-gray mb-2">
                  ${TIER_INFO.bronze.minAmount.toLocaleString()} - ${TIER_INFO.bronze.maxAmount.toLocaleString()}
                </p>
                <p className="text-xs text-stone-gray">{TIER_INFO.bronze.description}</p>
              </div>

              {/* Silver */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/50 border-2 border-gray-300/50">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                  <Medal className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-charcoal mb-1 text-lg">Silver</h4>
                <p className="text-sm text-stone-gray mb-2">
                  ${TIER_INFO.silver.minAmount.toLocaleString()} - ${TIER_INFO.silver.maxAmount.toLocaleString()}
                </p>
                <p className="text-xs text-stone-gray">{TIER_INFO.silver.description}</p>
              </div>

              {/* Gold */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-100/50 border-2 border-yellow-400/50">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-charcoal mb-1 text-lg">Gold</h4>
                <p className="text-sm text-stone-gray mb-2">
                  ${TIER_INFO.gold.minAmount.toLocaleString()}+
                </p>
                <p className="text-xs text-stone-gray">{TIER_INFO.gold.description}</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                href="/sponsor/packages"
                className="text-terracotta hover:text-terracotta/80 text-sm font-medium inline-flex items-center gap-1"
              >
                View full benefits for each tier
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Impact Statement */}
        <Card className="mb-12 bg-gradient-to-br from-sage-green/5 to-sky-blue/5 border-sage-green/20 shadow-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4 text-center">
              Your Support Makes a Real Difference
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🎨</div>
                <h4 className="font-semibold text-charcoal mb-2">Cultural Programs</h4>
                <p className="text-sm text-stone-gray">Preserving languages and traditions</p>
              </div>
              <div>
                <div className="text-4xl mb-2">📚</div>
                <h4 className="font-semibold text-charcoal mb-2">Education</h4>
                <p className="text-sm text-stone-gray">Scholarships and mentorship</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🎪</div>
                <h4 className="font-semibold text-charcoal mb-2">Community Events</h4>
                <p className="text-sm text-stone-gray">Powwows and gatherings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Info */}
        <Card className="bg-white border-warm-earth/20 shadow-soft">
          <CardContent className="p-6">
            <p className="text-sm text-stone-gray text-center leading-relaxed">
              <strong className="text-charcoal">Tax Deductible:</strong> The Indigenous Nations Diversity Network is a 501(c)(3) tax-exempt organization.
              Your sponsorship is tax-deductible to the extent allowed by law. <span className="text-charcoal font-medium">Tax ID: XX-XXXXXXX</span>
            </p>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <p className="text-stone-gray mb-4">See the impact of our sponsors</p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white shadow-card hover:shadow-card-hover transition-depth"
          >
            <Link href="/sponsors" className="flex items-center gap-2">
              View Our Sponsors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
