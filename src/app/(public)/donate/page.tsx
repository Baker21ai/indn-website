import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-warm-gray py-8 sm:py-10 md:py-12 px-4 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-soft mb-4 sm:mb-6">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terracotta" />
            <span className="text-xs sm:text-sm font-semibold text-charcoal tracking-wide">Make an Impact Today</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-3 sm:mb-4 tracking-tight text-balanced">
            Support Our <span className="text-terracotta">Mission</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-gray max-w-2xl mx-auto leading-relaxed font-normal px-2 sm:px-0 text-pretty">
            Your generous contribution helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
          </p>
        </div>

        {/* Main Donation Card with depth */}
        <Card className="mb-8 sm:mb-10 md:mb-12 shadow-elevated border-0 overflow-hidden">
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Left: QR Code */}
              <div className="text-center">
                <div className="inline-block p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-card">
                  <Image
                    src="/images/barcode.png"
                    alt="Donation QR Code - Scan to donate"
                    width={256}
                    height={256}
                    className="w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-lg sm:rounded-xl"
                  />
                </div>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-stone-gray font-medium">Scan to donate instantly</p>
              </div>

              {/* Right: Info and Link */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3 sm:mb-4 tracking-tight">
                  Make Your Impact
                </h2>
                <p className="text-base sm:text-lg text-stone-gray mb-5 sm:mb-6 md:mb-8 leading-relaxed font-normal">
                  Every donation helps us preserve indigenous culture, support educational programs, and empower communities across 12+ tribal nations.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                  <div className="bg-terracotta/5 rounded-lg p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-extrabold text-terracotta tracking-tight">$2.5M+</div>
                    <div className="text-xs sm:text-sm text-stone-gray font-medium">Total Raised</div>
                  </div>
                  <div className="bg-sage-green/5 rounded-lg p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-extrabold text-sage-green tracking-tight">1,000+</div>
                    <div className="text-xs sm:text-sm text-stone-gray font-medium">Lives Impacted</div>
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full group bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth touch-target"
                >
                  <a
                    href="https://example.com/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Donate Now</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
                <p className="text-xs text-stone-gray/70 text-center mt-2 sm:mt-3">Secure donation processing via external platform</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Statement */}
        <Card className="mb-8 sm:mb-10 md:mb-12 bg-gradient-to-br from-sage-green/5 to-sky-blue/5 border-sage-green/20 shadow-card">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mb-4 sm:mb-5 md:mb-6 text-center">
              Your Support Makes a Real Difference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl mb-2">🎨</div>
                <h4 className="font-semibold text-charcoal mb-1 sm:mb-2 text-sm sm:text-base">Cultural Programs</h4>
                <p className="text-xs sm:text-sm text-stone-gray">Preserving languages and traditions</p>
              </div>
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl mb-2">📚</div>
                <h4 className="font-semibold text-charcoal mb-1 sm:mb-2 text-sm sm:text-base">Education</h4>
                <p className="text-xs sm:text-sm text-stone-gray">Scholarships and mentorship</p>
              </div>
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl mb-2">🎪</div>
                <h4 className="font-semibold text-charcoal mb-1 sm:mb-2 text-sm sm:text-base">Community Events</h4>
                <p className="text-xs sm:text-sm text-stone-gray">Powwows and gatherings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Info */}
        <Card className="bg-white border-warm-earth/20 shadow-soft">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-stone-gray text-center leading-relaxed">
              <strong className="text-charcoal">Tax Deductible:</strong> The Indigenous Nations Diversity Network is a 501(c)(3) tax-exempt organization.
              Your donation is tax-deductible to the extent allowed by law. <span className="text-charcoal font-medium">Tax ID: XX-XXXXXXX</span>
            </p>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-stone-gray mb-3 sm:mb-4 text-sm sm:text-base">See the impact of our donors</p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white shadow-card hover:shadow-card-hover transition-depth touch-target"
          >
            <Link href="/donor-wall" className="flex items-center gap-2">
              <span className="text-sm sm:text-base">View Donor Wall</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
