import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Envelope, Phone, MapPin, Check, Shield, PawPrint, Mountains, Bird } from 'phosphor-react'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-warm-gray py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-terracotta mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg text-stone-gray max-w-2xl mx-auto">
            Your generous contribution helps preserve indigenous culture, empower communities, and build a brighter future for indigenous nations.
          </p>
        </div>

        {/* How to Donate Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-terracotta">How to Donate</CardTitle>
            <CardDescription>
              We accept donations through the following methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wire Transfer / Check */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Wire Transfer or Check</h3>
              <p className="text-stone-gray mb-4">
                For large donations or if you prefer traditional methods, please contact us directly:
              </p>
              <div className="space-y-2 text-stone-gray">
                <div className="flex items-center gap-2">
                  <Envelope size={20} weight="regular" className="text-terracotta" />
                  <a href="mailto:donations@indn.org" className="hover:text-terracotta">
                    donations@indn.org
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={20} weight="regular" className="text-terracotta" />
                  <a href="tel:+15551234567" className="hover:text-terracotta">
                    (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} weight="regular" className="text-terracotta" />
                  <span>123 Indigenous Way, San Francisco, CA 94102</span>
                </div>
              </div>
            </div>

            {/* Contact for More Info */}
            <div className="bg-sage-green/10 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Questions About Donating?</h3>
              <p className="text-stone-gray mb-4">
                Our team is here to help! Whether you're interested in corporate sponsorship, recurring donations, or have questions about our programs, we'd love to hear from you.
              </p>
              <Button asChild className="bg-terracotta hover:bg-terracotta/90">
                <a href="mailto:donations@indn.org">Contact Us</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recognition Tiers */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-center text-charcoal mb-4">
            Donor Recognition Tiers
          </h2>
          <p className="text-center text-stone-gray mb-8">
            All donors are recognized on our public Donor Wall based on their total contribution
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2 border-turtle-emerald/30 hover:border-turtle-emerald transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield size={48} weight="regular" className="text-turtle-emerald" />
                </div>
                <CardTitle className="text-2xl text-turtle-emerald">Turtle</CardTitle>
                <CardDescription className="text-lg font-bold">$100 - $999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Recognition on Donor Wall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Digital badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Quarterly newsletter</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-wolf-silver/30 hover:border-wolf-silver transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <PawPrint size={48} weight="regular" className="text-wolf-silver" />
                </div>
                <CardTitle className="text-2xl text-wolf-silver">Wolf</CardTitle>
                <CardDescription className="text-lg font-bold">$1,000 - $4,999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>All Turtle benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Event invitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Annual report</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-bear-amber/30 hover:border-bear-amber transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Mountains size={48} weight="regular" className="text-bear-amber" />
                </div>
                <CardTitle className="text-2xl text-bear-amber">Bear</CardTitle>
                <CardDescription className="text-lg font-bold">$5,000 - $9,999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>All Wolf benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>VIP event access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Recognition plaque</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-eagle-gold/30 hover:border-eagle-gold transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Bird size={48} weight="regular" className="text-eagle-gold" />
                </div>
                <CardTitle className="text-2xl text-eagle-gold">Eagle</CardTitle>
                <CardDescription className="text-lg font-bold">$10,000+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>All Bear benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Board updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} weight="bold" className="mt-0.5 flex-shrink-0" />
                    <span>Legacy recognition</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tax Info */}
        <Card className="bg-warm-earth/10 border-warm-earth/20">
          <CardContent className="pt-6">
            <p className="text-sm text-stone-gray text-center">
              <strong>Tax Deductible:</strong> The Indigenous Nations Diversity Network is a 501(c)(3) tax-exempt organization.
              Your donation is tax-deductible to the extent allowed by law. Tax ID: XX-XXXXXXX
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button asChild size="lg" variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
            <Link href="/donor-wall">View Our Supporters</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
