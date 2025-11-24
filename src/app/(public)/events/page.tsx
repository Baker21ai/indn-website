import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Users, Mail, Phone, Tent, Music, Palette, Award } from 'lucide-react'
import Image from 'next/image'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-warm-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-lg text-stone-gray max-w-2xl mx-auto font-normal leading-relaxed">
            Join us in celebrating indigenous culture, community, and tradition
          </p>
        </div>

        {/* Featured Event - Powwow */}
        <Card className="shadow-elevated border-0 overflow-hidden mb-12">
          <div className="h-3 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />

          {/* Flyer Image Hero */}
          <div className="relative w-full bg-gradient-to-br from-charcoal to-terracotta/30">
            <div className="max-w-2xl mx-auto p-4">
              <div className="relative aspect-[850/1100] rounded-lg overflow-hidden">
                <Image
                  src="/images/powwow-flyer.png"
                  alt="3rd Annual Hollister Powwow & Native Gathering - November 7-9, 2025 at Bolado Park, Tres Pinos, CA"
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
              <Badge className="bg-sage-green text-white px-4 py-2 text-sm">3-Day Event</Badge>
              <Badge className="bg-sky-blue text-white px-4 py-2 text-sm">Free Admission</Badge>
              <Badge className="bg-warm-earth text-white px-4 py-2 text-sm">Family Friendly</Badge>
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
                  <p className="text-sage-green font-semibold">FREE</p>
                  <p className="text-sm text-stone-gray">Community Event</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-terracotta" />
                Event Schedule
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Friday */}
                <Card className="bg-gradient-to-br from-terracotta/5 to-warm-earth/5 border-terracotta/20">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-block px-4 py-2 bg-terracotta text-white rounded-full font-semibold mb-2">
                        Friday, Nov 7
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-charcoal mb-1">6:00 PM</p>
                        <p className="text-sm text-stone-gray">Ceremonial Evening</p>
                        <p className="text-sm text-terracotta font-medium">Bear Dance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Saturday */}
                <Card className="bg-gradient-to-br from-sage-green/5 to-sky-blue/5 border-sage-green/20">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-block px-4 py-2 bg-sage-green text-white rounded-full font-semibold mb-2">
                        Saturday, Nov 8
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-charcoal mb-1">10:00 AM - 9:45 PM</p>
                        <p className="text-sm text-stone-gray mb-2">Powwow</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Palette className="w-4 h-4 text-sage-green" />
                          <p className="text-sage-green font-medium">Indigenous Fashion Show!</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sunday */}
                <Card className="bg-gradient-to-br from-warm-earth/5 to-terracotta/5 border-warm-earth/20">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-block px-4 py-2 bg-warm-earth text-white rounded-full font-semibold mb-2">
                        Sunday, Nov 9
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-charcoal mb-1">10:00 AM - 6:00 PM</p>
                        <p className="text-sm text-stone-gray">Powwow</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Featured Participants */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center flex items-center justify-center gap-3">
                <Users className="w-6 h-6 text-terracotta" />
                Featured Participants
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Leadership */}
                <Card className="bg-warm-gray/30">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Music className="w-5 h-5 text-terracotta" />
                      Leadership & Hosts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-gray">Emcee:</span>
                        <span className="font-medium text-charcoal">Tom Phillips</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-gray">Arena Director:</span>
                        <span className="font-medium text-charcoal">Erik Kimple</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-gray">Head Tablulator:</span>
                        <span className="font-medium text-charcoal">Kaylene Kimple</span>
                      </div>
                      <div className="border-t border-warm-earth/20 my-3 pt-3">
                        <p className="text-xs text-stone-gray mb-2">HOST SOUTHERN DRUM</p>
                        <p className="font-medium text-charcoal">Full Metal Jacket Singers</p>
                        <p className="text-xs text-stone-gray">Oklahoma</p>
                      </div>
                      <div className="border-t border-warm-earth/20 my-3 pt-3">
                        <p className="text-xs text-stone-gray mb-2">HOST NORTHERN DRUM</p>
                        <p className="font-medium text-charcoal">Red Hoop Singers</p>
                        <p className="text-xs text-stone-gray">Nevada</p>
                      </div>
                      <div className="border-t border-warm-earth/20 my-3 pt-3">
                        <p className="text-xs text-stone-gray mb-2">HOST GOURD SOCIETY</p>
                        <p className="font-medium text-charcoal">Silver State Gourd Society</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Head Dancers */}
                <Card className="bg-warm-gray/30">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-terracotta" />
                      Head Dancers
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-gray">Head Man Dancer:</span>
                        <span className="font-medium text-charcoal">Robert Le Roy</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-gray">Head Woman Dancer:</span>
                        <span className="font-medium text-charcoal">Jamie Saunsoci</span>
                      </div>
                      <div className="border-t border-warm-earth/20 my-3 pt-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-stone-gray">Head Teen Boy:</span>
                          <span className="font-medium text-charcoal">Murphy Bear McLoud</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-gray">Head Teen Girl:</span>
                          <span className="font-medium text-charcoal">Cambria Wilson</span>
                        </div>
                      </div>
                      <div className="border-t border-warm-earth/20 my-3 pt-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-stone-gray">Head Boy Dancer:</span>
                          <span className="font-medium text-charcoal">Declan Ahboah Miller</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-gray">Head Girl Dancer:</span>
                          <span className="font-medium text-charcoal">Velma Ahboah</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Fashion Show */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center flex items-center justify-center gap-3">
                <Palette className="w-6 h-6 text-terracotta" />
                Indigenous Fashion Show
              </h3>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Featured Designers</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-stone-gray">
                          <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                          Rebekah Jarvey
                        </li>
                        <li className="flex items-center gap-2 text-stone-gray">
                          <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                          Hands Lopez
                        </li>
                        <li className="flex items-center gap-2 text-stone-gray">
                          <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                          Jamie Saunsoci
                        </li>
                        <li className="flex items-center gap-2 text-stone-gray">
                          <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                          Bhic-Cic Zahn-Nantzu
                        </li>
                        <li className="flex items-center gap-2 text-stone-gray">
                          <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                          Corrina Inez Rojas Snow
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Hair and Makeup</h4>
                      <p className="text-stone-gray mb-4">Clarissa Mashburn</p>

                      <h4 className="font-semibold text-charcoal mb-3 mt-6">Prizes</h4>
                      <ul className="space-y-1 text-sm text-stone-gray">
                        <li>• Best Indigenous Dressed</li>
                        <li>• Fashion Show Awards</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities & Competitions */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-terracotta" />
                Activities & Competitions
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-terracotta/5 to-warm-earth/5 border-terracotta/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🎵</div>
                    <h4 className="font-semibold text-charcoal mb-1">Singing Contest</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-sage-green/5 to-sky-blue/5 border-sage-green/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🥁</div>
                    <h4 className="font-semibold text-charcoal mb-1">Day Pay for Drums</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-warm-earth/5 to-terracotta/5 border-warm-earth/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">💃</div>
                    <h4 className="font-semibold text-charcoal mb-1">Dance Competition</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">👗</div>
                    <h4 className="font-semibold text-charcoal mb-1">Best Dressed</h4>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Partners & Sponsors */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center">
                Our Partners & Sponsors
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                    YOUTH<br/>ALLIANCE
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                    ASC<br/>COTTRELL
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                    ROTARY
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                    GAVILAN<br/>COLLEGE
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                    CITY OF<br/>HOLLISTER
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-stone-gray mt-6">
                Thank you to all our partners for making this event possible
              </p>
            </div>

            {/* Contact & Camping */}
            <div className="border-t border-warm-earth/20 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-terracotta" />
                    Contact & Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sage-green" />
                      <div>
                        <p className="text-sm text-muted-foreground">General Info</p>
                        <a href="tel:+18318015530" className="text-sage-green hover:underline font-medium">
                          (831) 801-5530
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-stone-gray">
                      <p className="font-medium text-charcoal">Follow Us:</p>
                      <p>Facebook: @Indigenous Nations Diversity Network</p>
                      <p>Instagram: @indn_sbc</p>
                    </div>
                  </div>
                </div>

                {/* Camping */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <Tent className="w-5 h-5 text-terracotta" />
                    RV & Tent Camping
                  </h3>
                  <div className="bg-sage-green/5 rounded-lg p-4">
                    <p className="text-stone-gray mb-3">
                      Camping available at the event site for the weekend
                    </p>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sage-green" />
                      <div>
                        <p className="text-sm text-muted-foreground">Camping Reservations</p>
                        <a href="tel:+18316289421" className="text-sage-green hover:underline font-medium">
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

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-terracotta/5 to-warm-earth/5 border-terracotta/20 shadow-card">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
              Join Us for This Historic Gathering
            </h3>
            <p className="text-stone-gray max-w-2xl mx-auto mb-6">
              Experience three days of cultural celebration, traditional performances, and community connection.
              This FREE event welcomes all to honor and celebrate indigenous heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18318015530"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta/90 text-white font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </a>
              <a
                href="tel:+18316289421"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-green hover:bg-sage-green/90 text-white font-semibold rounded-lg transition-colors"
              >
                <Tent className="w-4 h-4" />
                Camping Info
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
