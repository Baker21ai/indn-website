'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Heart, TrendingUp, Users, Sparkles } from 'lucide-react'

const prototypes = [
  {
    id: 1,
    title: 'Version 1: Storytelling First',
    subtitle: 'Emotional Narrative Approach',
    description: 'Leads with the founding story and emotional connection. Warm earth tones, serif typography, and narrative flow inspired by Charity: Water.',
    icon: Heart,
    color: 'from-terracotta to-warm-earth',
    features: [
      'Personal founder narrative',
      'Warm, inviting design',
      'Split image/text sections',
      'Modular storytelling flow',
    ],
    href: '/prototypes/v1-storytelling.html',
    bestFor: 'Emotionally-driven donors',
  },
  {
    id: 2,
    title: 'Version 2: Impact Driven',
    subtitle: 'Data-First Professional Approach',
    description: 'Bold, high-contrast design emphasizing proven results and organizational credibility. Inspired by Doctors Without Borders.',
    icon: TrendingUp,
    color: 'from-charcoal via-stone-gray to-charcoal',
    features: [
      'Bold typography & metrics',
      'Numbered principles',
      'High-contrast design',
      'Multiple action pathways',
    ],
    href: '/prototypes/v2-impact.html',
    bestFor: 'Data-driven donors & corporate partners',
  },
  {
    id: 3,
    title: 'Version 3: Community Focused',
    subtitle: 'Indigenous-Centered Design',
    description: 'Circular, organic design rooted in Indigenous principles. Deep blues and earth tones with relationship-focused language.',
    icon: Users,
    color: 'from-sky-blue via-sage-green to-warm-earth',
    features: [
      'Circular Six Rs framework',
      'Organic shapes & patterns',
      'Community voices featured',
      'Gentle, invitational tone',
    ],
    href: '/prototypes/v3-community.html',
    bestFor: 'Community members & culturally-conscious donors',
  },
  {
    id: 4,
    title: 'Version 4: Hybrid',
    subtitle: 'Recommended Synthesis',
    description: 'Combines the best elements: V3\'s cultural authenticity, V1\'s emotional storytelling, and V2\'s bold data presentation.',
    icon: Sparkles,
    color: 'from-terracotta via-sage-green to-sky-blue',
    features: [
      'Bold hero + circular design',
      'Emotional narrative + data',
      'Six Rs cultural framework',
      'Multiple engagement pathways',
    ],
    href: '/prototypes/v4-hybrid.html',
    bestFor: 'Broad audience appeal',
    recommended: true,
  },
]

export default function PrototypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray/20 to-white">
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-soft mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-charcoal tracking-wide">
              Design Review
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6 tracking-tight">
            About Page{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-warm-earth">
              Prototypes
            </span>
          </h1>

          <p className="text-xl text-stone-gray mb-8 max-w-3xl mx-auto leading-relaxed font-normal">
            Four different design approaches for the INDN About page. Each version
            emphasizes different strengths—storytelling, data, community, or a
            synthesis of all three.
          </p>

          <div className="bg-warm-gray/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-sm text-stone-gray">
              <strong className="text-charcoal">For Board Review:</strong> Click "View
              Prototype" on any card to see the full design. These are standalone HTML
              pages showcasing different design directions for feedback and
              discussion.
            </p>
          </div>
        </div>
      </section>

      {/* Prototypes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {prototypes.map((prototype) => {
              const Icon = prototype.icon
              return (
                <Card
                  key={prototype.id}
                  className={`shadow-elevated border-0 overflow-hidden hover:shadow-elevated-lg transition-all duration-300 hover:-translate-y-1 ${
                    prototype.recommended ? 'ring-2 ring-terracotta' : ''
                  }`}
                >
                  {/* Gradient top border */}
                  <div className={`h-2 bg-gradient-to-r ${prototype.color}`} />

                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prototype.color} flex items-center justify-center shadow-card`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-charcoal tracking-tight">
                              {prototype.title}
                            </h3>
                            <p className="text-sm text-terracotta font-semibold">
                              {prototype.subtitle}
                            </p>
                          </div>
                        </div>
                        {prototype.recommended && (
                          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-bold rounded-full">
                            ⭐ RECOMMENDED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-stone-gray leading-relaxed mb-6">
                      {prototype.description}
                    </p>

                    {/* Features */}
                    <div className="bg-warm-gray/5 rounded-lg p-4 mb-6">
                      <p className="text-xs font-semibold text-terracotta mb-3 uppercase tracking-wide">
                        Key Features
                      </p>
                      <ul className="space-y-2">
                        {prototype.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-charcoal">
                            <span className="text-terracotta font-bold">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-stone-gray mb-1">
                        BEST FOR
                      </p>
                      <p className="text-sm text-charcoal font-medium">
                        {prototype.bestFor}
                      </p>
                    </div>

                    {/* View Button */}
                    <Button
                      asChild
                      size="lg"
                      className={`w-full ${
                        prototype.recommended
                          ? 'bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg'
                          : 'bg-charcoal hover:bg-charcoal/90 text-white'
                      } transition-depth`}
                    >
                      <a href={prototype.href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Prototype
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-warm-gray/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">
            Quick Comparison
          </h2>

          <div className="bg-white rounded-2xl shadow-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-warm-gray/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-charcoal">
                      Aspect
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-charcoal">
                      V1: Storytelling
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-charcoal">
                      V2: Impact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-charcoal">
                      V3: Community
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-terracotta">
                      V4: Hybrid ⭐
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-gray/10">
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      Primary Focus
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Emotional narrative
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">Data & proof</td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Cultural values
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                      All three balanced
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      Design Style
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Warm & elegant
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Bold & professional
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Organic & circular
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                      Circular + bold
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      Color Palette
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">Earth tones</td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      High contrast B&W
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Blues + earth
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                      Blues + terracotta
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      Call-to-Action
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      "Stand with Us"
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      "Take Action Now"
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      "Join Our Circle"
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                      "Join Our Circle"
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      Best Audience
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Heart-led donors
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Corporate partners
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-gray">
                      Community members
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                      Broad appeal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-float border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-terracotta via-warm-earth to-sage-green" />
            <CardContent className="p-12 text-center">
              <Sparkles className="w-12 h-12 text-terracotta mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Share Your Feedback
              </h2>
              <p className="text-stone-gray mb-8 max-w-2xl mx-auto">
                Which version resonates most with you? Your input will help guide the
                final About page design. Feel free to reach out with your thoughts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
                >
                  <Link href="/about/board">Back to Board Page</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-terracotta/30 text-terracotta hover:bg-terracotta/5"
                >
                  <Link href="/">View Live Site</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
