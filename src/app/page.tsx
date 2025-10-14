import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Sparkles, Check, Shield, Users, Globe, Award, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Hero Section - Full viewport with depth */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-terracotta/20 via-warm-gray to-sage-green/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-soft mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-charcoal tracking-wide">Standing Together Since 2015</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal mb-6 leading-[1.1] tracking-tight">
            Indigenous Nations
            <br />
            <span className="text-terracotta">Diversity Network</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-xl sm:text-2xl text-stone-gray max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            Preserving indigenous culture, empowering communities, and building bridges for future generations through unity and collaboration.
          </p>

          {/* CTA Buttons with depth */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="group bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg shadow-elevated hover:shadow-elevated-lg transition-depth"
            >
              <Link href="/donate" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Make a Difference
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-white/90 backdrop-blur-sm px-8 py-6 text-lg border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white shadow-card hover:shadow-card-hover transition-depth"
            >
              <Link href="/portal/volunteer/events" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Get Involved
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-stone-gray font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sage-green" />
              <span>501(c)(3) Nonprofit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sage-green" />
              <span>Serving 12+ Tribal Nations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sage-green" />
              <span>10 Years of Impact</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{
          clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
        }} />
      </section>

      {/* Stats Section - Floating cards with depth */}
      <section className="relative -mt-20 pb-24 px-4 sm:px-6 lg:px-8 layer-elevated">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                value: '$2.5M+',
                label: 'Total Impact',
                description: 'Raised for communities'
              },
              {
                icon: Users,
                value: '500+',
                label: 'Active Volunteers',
                description: 'Making a difference'
              },
              {
                icon: Globe,
                value: '12+',
                label: 'Tribal Nations',
                description: 'United together'
              },
              {
                icon: Award,
                value: '1,000+',
                label: 'Lives Changed',
                description: 'Students & families'
              }
            ].map((stat, index) => (
              <Card
                key={index}
                className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 shadow-card hover:shadow-elevated transition-depth cursor-pointer border-0"
              >
                <CardContent className="p-8">
                  <div className="inline-flex p-3 rounded-xl bg-terracotta/10 mb-4 shadow-soft">
                    <stat.icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <div className="text-4xl font-extrabold text-charcoal mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-lg font-semibold text-stone-gray mb-1">{stat.label}</div>
                  <div className="text-sm text-stone-gray/70 font-normal">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section with layered cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-warm-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 tracking-tight">
              Our Programs
            </h2>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto font-normal leading-relaxed">
              Creating lasting impact through education, culture, and community empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cultural Preservation',
                description: 'Protecting and celebrating indigenous languages, traditions, and arts for future generations.',
                icon: '🎨',
                color: 'from-terracotta/10 to-terracotta/5'
              },
              {
                title: 'Youth Education',
                description: 'Scholarships, mentorship, and educational resources to empower the next generation of leaders.',
                icon: '📚',
                color: 'from-sage-green/10 to-sage-green/5'
              },
              {
                title: 'Community Events',
                description: 'Annual gatherings, powwows, and celebrations that strengthen cultural bonds and unity.',
                icon: '🎪',
                color: 'from-sky-blue/10 to-sky-blue/5'
              }
            ].map((program, index) => (
              <Card
                key={index}
                className="group bg-white border-0 shadow-card hover:shadow-elevated-lg transition-depth overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-semibold text-charcoal mb-3 tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-stone-gray mb-6 leading-relaxed font-normal">
                    {program.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group/btn text-terracotta hover:text-terracotta hover:bg-terracotta/10 p-0 font-semibold"
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with elevated design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-terracotta via-terracotta/95 to-warm-earth relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed font-normal">
            Every contribution helps preserve culture, empower communities, and create opportunities for indigenous youth. Stand together with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group bg-white text-terracotta hover:bg-white/95 px-8 py-6 text-lg shadow-float hover:shadow-elevated-lg transition-depth"
            >
              <Link href="/donate" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Donate Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-terracotta px-8 py-6 text-lg shadow-elevated hover:shadow-elevated-lg transition-depth"
            >
              <Link href="/donor-wall" className="flex items-center gap-2">
                See Our Donors
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Indigenous Nations Diversity Network</h3>
              <p className="text-white/70 text-sm font-normal leading-relaxed">
                A 501(c)(3) nonprofit organization dedicated to preserving indigenous culture and empowering communities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="/donate" className="text-white/70 hover:text-white transition-colors">Donate</Link></li>
                <li><Link href="/donor-wall" className="text-white/70 hover:text-white transition-colors">Donor Wall</Link></li>
                <li><Link href="/portal/volunteer/events" className="text-white/70 hover:text-white transition-colors">Volunteer</Link></li>
                <li><Link href="/login" className="text-white/70 hover:text-white transition-colors">Member Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/70 font-normal">
                <li>Email: info@indn.org</li>
                <li>Phone: (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60 font-normal">
            <p>&copy; {new Date().getFullYear()} Indigenous Nations Diversity Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
