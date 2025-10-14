import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Calendar, Users, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23333' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-soft mb-8 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-medium text-charcoal">
              Join Our Community
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Volunteer with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-warm-earth">
              INDN
            </span>
          </h1>

          <p className="text-xl text-stone-gray mb-12 max-w-2xl mx-auto">
            Help us celebrate and preserve Indigenous culture by volunteering at
            community events. Your time makes a real difference.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg shadow-elevated hover:shadow-elevated-lg transition-depth"
          >
            <Link href="/register">Sign Up to Volunteer</Link>
          </Button>
        </div>
      </section>

      {/* Current Event */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-3">
              Current Opportunity
            </h2>
            <p className="text-stone-gray">
              Join us for our upcoming event
            </p>
          </div>

          <Card className="shadow-elevated border-0 overflow-hidden hover:shadow-elevated-lg transition-depth">
            <div className="h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-terracotta/10 to-sage-green/10 p-4 rounded-xl shadow-soft">
                  <Calendar className="w-8 h-8 text-terracotta" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal mb-2">
                    3rd Annual Hollister Powwow and Native Gathering
                  </h3>
                  <p className="text-stone-gray mb-4">
                    A celebration of Indigenous culture, traditions, and
                    community featuring traditional dance, music, art, and food.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="inline-flex items-center gap-1 text-charcoal">
                      <Calendar className="w-4 h-4 text-terracotta" />
                      April 2025
                    </span>
                    <span className="inline-flex items-center gap-1 text-charcoal">
                      📍 Hollister, CA
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-warm-gray/10 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-charcoal mb-3">
                  Volunteer Roles Needed:
                </h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-green mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal">Event setup and teardown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-green mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal">Vendor support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-green mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal">Guest registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-green mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal">Parking and logistics</span>
                  </li>
                </ul>
              </div>

              <Button
                asChild
                className="w-full md:w-auto bg-terracotta hover:bg-terracotta/90 text-white shadow-soft hover:shadow-card transition-depth"
              >
                <Link href="/register">Register as a Volunteer</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-white to-warm-gray/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-3">
              How It Works
            </h2>
            <p className="text-stone-gray">Three simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-card-hover transition-depth border-0">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta/10 to-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl font-bold text-terracotta">1</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  Sign Up
                </h3>
                <p className="text-stone-gray">
                  Create your volunteer account and tell us about your
                  interests and availability
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-depth border-0">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta/10 to-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl font-bold text-terracotta">2</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  Choose Events
                </h3>
                <p className="text-stone-gray">
                  Browse available events and select the opportunities that fit
                  your schedule
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-depth border-0">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta/10 to-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl font-bold text-terracotta">3</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  Make an Impact
                </h3>
                <p className="text-stone-gray">
                  Show up, help out, and be part of something meaningful in
                  Indigenous communities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-float border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-terracotta mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-stone-gray mb-8 max-w-2xl mx-auto">
                Join our volunteer community and help preserve Indigenous
                culture for future generations. Every hour you give creates
                lasting impact.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg shadow-elevated hover:shadow-elevated-lg transition-depth"
              >
                <Link href="/register">Get Started Today</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
