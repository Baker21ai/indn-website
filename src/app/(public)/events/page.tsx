import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Music, Palette, Award, ExternalLink, Newspaper, Camera, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-warm-gray py-8 sm:py-10 md:py-12 px-4 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-terracotta mb-3 sm:mb-4 tracking-tight text-balanced">
            Past Events
          </h1>
          <p className="text-base sm:text-lg text-stone-gray max-w-2xl mx-auto font-normal leading-relaxed px-2 sm:px-0">
            Celebrating indigenous culture, community, and tradition
          </p>
        </div>

        {/* Featured Past Event - 2024 Powwow */}
        <Card className="shadow-elevated border-0 overflow-hidden mb-8 sm:mb-10 md:mb-12">
          <div className="h-2 sm:h-3 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />

          {/* Flyer Image Hero */}
          <div className="relative w-full bg-gradient-to-br from-charcoal to-terracotta/30">
            <div className="max-w-2xl mx-auto p-2 sm:p-4">
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

          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Event Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
              <Badge className="bg-terracotta text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Cultural Celebration</Badge>
              <Badge className="bg-sage-green text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">3-Day Event</Badge>
              <Badge className="bg-warm-earth text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">Family Friendly</Badge>
            </div>

            {/* Event Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-terracotta mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal mb-1">Date</p>
                  <p className="text-stone-gray">November 2024</p>
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
            </div>

            {/* Event Coverage & Articles Section */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3">
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
                Event Coverage & Articles
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Article Card Placeholder 1 */}
                <Card className="bg-white border border-warm-gray/30 hover:shadow-elevated transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-terracotta mb-3">
                      <Newspaper className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">News Article</span>
                    </div>
                    <h4 className="font-semibold text-charcoal mb-2 line-clamp-2">
                      Coming Soon
                    </h4>
                    <p className="text-sm text-stone-gray mb-4 line-clamp-3">
                      Articles and coverage from the event will be added here.
                    </p>
                    <span className="text-sm text-stone-gray/60 italic">
                      Link coming soon
                    </span>
                  </CardContent>
                </Card>

                {/* Photo Gallery Card Placeholder */}
                <Card className="bg-white border border-warm-gray/30 hover:shadow-elevated transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sage-green mb-3">
                      <Camera className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Photo Gallery</span>
                    </div>
                    <h4 className="font-semibold text-charcoal mb-2 line-clamp-2">
                      Event Photos
                    </h4>
                    <p className="text-sm text-stone-gray mb-4 line-clamp-3">
                      Browse photos from the celebration, performances, and community gathering.
                    </p>
                    <span className="text-sm text-stone-gray/60 italic">
                      Link coming soon
                    </span>
                  </CardContent>
                </Card>

                {/* Video Coverage Placeholder */}
                <Card className="bg-white border border-warm-gray/30 hover:shadow-elevated transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sky-blue mb-3">
                      <Video className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Video</span>
                    </div>
                    <h4 className="font-semibold text-charcoal mb-2 line-clamp-2">
                      Event Highlights
                    </h4>
                    <p className="text-sm text-stone-gray mb-4 line-clamp-3">
                      Watch video highlights from the powwow and cultural performances.
                    </p>
                    <span className="text-sm text-stone-gray/60 italic">
                      Link coming soon
                    </span>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities & Highlights */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
                Event Highlights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <Card className="bg-gradient-to-br from-terracotta/5 to-warm-earth/5 border-terracotta/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🎵</div>
                    <h4 className="font-semibold text-charcoal mb-1">Singing</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-sage-green/5 to-sky-blue/5 border-sage-green/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🥁</div>
                    <h4 className="font-semibold text-charcoal mb-1">Drumming</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-warm-earth/5 to-terracotta/5 border-warm-earth/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">💃</div>
                    <h4 className="font-semibold text-charcoal mb-1">Dancing</h4>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">👗</div>
                    <h4 className="font-semibold text-charcoal mb-1">Fashion</h4>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Thank You Section */}
            <div className="border-t border-warm-earth/20 pt-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-charcoal mb-4">
                  Thank You to Our Community
                </h3>
                <p className="text-stone-gray max-w-2xl mx-auto">
                  We are grateful to everyone who participated, attended, and supported this celebration 
                  of indigenous culture and heritage. Your presence made this gathering truly special.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stay Connected Card */}
        <Card className="bg-gradient-to-br from-terracotta/5 to-warm-earth/5 border-terracotta/20 shadow-card">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
              Stay Connected
            </h3>
            <p className="text-stone-gray max-w-2xl mx-auto mb-6">
              Follow us on social media to see photos, videos, and updates from our events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-stone-gray">
                <p className="font-medium text-charcoal mb-1">Facebook</p>
                <p className="text-sm">@Indigenous Nations Diversity Network</p>
              </div>
              <div className="hidden sm:block w-px bg-warm-gray/30" />
              <div className="text-stone-gray">
                <p className="font-medium text-charcoal mb-1">Instagram</p>
                <p className="text-sm">@indn_sbc</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
