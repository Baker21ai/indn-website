import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Sparkles, Check, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-terracotta/10 to-warm-gray py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-terracotta mb-6">
            Indigenous Nations Diversity Network
          </h1>
          <p className="text-xl md:text-2xl text-charcoal mb-8 max-w-3xl mx-auto">
            Preserving indigenous culture, empowering communities, and building bridges for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90 text-lg">
              <Link href="/donate">Make a Donation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-terracotta text-terracotta hover:bg-terracotta/10">
              <Link href="/donor-wall">View Donor Wall</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-charcoal mb-12">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-terracotta flex items-center gap-2">
                  <Sparkles size={24} />
                  Cultural Preservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray">
                  Supporting programs that preserve indigenous languages, traditions, and cultural practices for future generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-sage-green flex items-center gap-2">
                  <Heart size={24} />
                  Community Empowerment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray">
                  Providing resources and opportunities that strengthen indigenous communities and promote self-determination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-sky-blue flex items-center gap-2">
                  <Sparkles size={24} />
                  Youth Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray">
                  Investing in educational programs and mentorship that empower indigenous youth to become future leaders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Tiers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-charcoal mb-4">
            Donor Recognition Tiers
          </h2>
          <p className="text-center text-stone-gray mb-12 max-w-2xl mx-auto">
            Join our community of supporters and receive recognition for your generosity
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2 border-turtle-emerald/30 hover:border-turtle-emerald transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-turtle-emerald flex items-center gap-2">
                  <Shield size={32} weight="regular" />
                  Turtle
                </CardTitle>
                <CardDescription className="text-lg font-bold">$100 - $999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Recognition on Donor Wall
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Digital badge
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Quarterly newsletter
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-wolf-silver/30 hover:border-wolf-silver transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-wolf-silver flex items-center gap-2">
                  <Heart size={32} />
                  Wolf
                </CardTitle>
                <CardDescription className="text-lg font-bold">$1,000 - $4,999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    All Turtle benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Event invitations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Annual report
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-bear-amber/30 hover:border-bear-amber transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-bear-amber flex items-center gap-2">
                  <Shield size={32} />
                  Bear
                </CardTitle>
                <CardDescription className="text-lg font-bold">$5,000 - $9,999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    All Wolf benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    VIP event access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Recognition plaque
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-eagle-gold/30 hover:border-eagle-gold transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-eagle-gold flex items-center gap-2">
                  <Sparkles size={32} />
                  Eagle
                </CardTitle>
                <CardDescription className="text-lg font-bold">$10,000+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    All Bear benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Board updates
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} weight="bold" />
                    Legacy recognition
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90">
              <Link href="/donate">Support Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-warm-gray to-sage-green/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6">
            Make a Difference Today
          </h2>
          <p className="text-lg text-stone-gray mb-8">
            Your support helps preserve indigenous culture and empower communities. Every contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Portal Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
