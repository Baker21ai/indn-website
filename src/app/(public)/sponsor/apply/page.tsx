'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TIER_INFO } from '@/lib/sponsorships'
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileText,
  Send,
  Crown,
  Medal,
  Award,
} from 'lucide-react'

type SponsorTier = 'bronze' | 'silver' | 'gold'

interface FormData {
  companyName: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  tier: SponsorTier | ''
  notes: string
}

const initialFormData: FormData = {
  companyName: '',
  website: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  tier: '',
  notes: '',
}

const tierIcons = {
  bronze: Award,
  silver: Medal,
  gold: Crown,
}

export default function SponsorApplyPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [checkInstructions, setCheckInstructions] = useState<{
    payableTo: string
    mailingAddress: string
    memo: string
  } | null>(null)
  const [error, setError] = useState('')

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.tier) {
          setError('Please select a sponsorship tier')
          return false
        }
        return true
      case 2:
        if (!formData.companyName || !formData.contactName || !formData.contactEmail || !formData.contactPhone) {
          setError('Please fill in all required fields')
          return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          setError('Please enter a valid email address')
          return false
        }
        return true
      case 3:
        if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode) {
          setError('Please fill in all address fields')
          return false
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/sponsor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setCheckInstructions(data.checkInstructions)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess && checkInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-gray via-white to-warm-gray py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-elevated overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600" />
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-charcoal mb-4">
                Application Submitted!
              </h1>
              <p className="text-lg text-stone-gray mb-8">
                Thank you for your commitment to supporting Indigenous communities.
              </p>

              {/* Check Mailing Instructions */}
              <div className="bg-gradient-to-br from-terracotta/5 to-sunset-orange/10 rounded-2xl p-6 md:p-8 text-left mb-8">
                <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-terracotta" />
                  Check Mailing Instructions
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-terracotta mb-1">Make Check Payable To:</p>
                    <p className="text-charcoal font-medium">{checkInstructions.payableTo}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-terracotta mb-1">Mail To:</p>
                    <p className="text-charcoal font-medium">{checkInstructions.mailingAddress}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-terracotta mb-1">Memo Line:</p>
                    <p className="text-charcoal font-medium">{checkInstructions.memo}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-lg">
                  <p className="text-sm text-stone-gray">
                    <strong>Note:</strong> Your sponsorship will be activated once we receive and process your check.
                    You will receive an email confirmation when your sponsorship is live.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white">
                  <Link href="/sponsor/packages">View Sponsorship Benefits</Link>
                </Button>
                <Button asChild className="bg-terracotta hover:bg-terracotta/90 text-white">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-gray via-white to-warm-gray py-12 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/sponsor/packages"
            className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta/80 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View Sponsorship Packages
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Become a Sponsor
          </h1>
          <p className="text-stone-gray text-lg">
            Join our circle of supporters making a difference
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  s === step
                    ? 'bg-terracotta text-white scale-110'
                    : s < step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 md:w-20 h-1 mx-1 rounded ${
                    s < step ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-xs md:text-sm text-stone-gray mb-8 px-4">
          <span className={step >= 1 ? 'text-charcoal font-medium' : ''}>Select Tier</span>
          <span className={step >= 2 ? 'text-charcoal font-medium' : ''}>Company Info</span>
          <span className={step >= 3 ? 'text-charcoal font-medium' : ''}>Address</span>
          <span className={step >= 4 ? 'text-charcoal font-medium' : ''}>Review</span>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-elevated overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600" />

          <CardContent className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Select Tier */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Sparkles className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Choose Your Sponsorship Level</h2>
                  <p className="text-stone-gray">Select the tier that best fits your organization&apos;s goals</p>
                </div>

                <div className="grid gap-4">
                  {(['gold', 'silver', 'bronze'] as const).map((tier) => {
                    const info = TIER_INFO[tier]
                    const Icon = tierIcons[tier]
                    const isSelected = formData.tier === tier

                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => updateField('tier', tier)}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-terracotta bg-terracotta/5 shadow-lg scale-[1.02]'
                            : 'border-gray-200 hover:border-terracotta/50 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center ${
                              tier === 'gold'
                                ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
                                : tier === 'silver'
                                ? 'bg-gradient-to-br from-gray-200 to-gray-400'
                                : 'bg-gradient-to-br from-amber-500 to-amber-700'
                            }`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-charcoal">{info.name} Tier</h3>
                            <p className="text-stone-gray">{info.description}</p>
                            {tier === 'gold' && info.culturalTour && (
                              <p className="text-xs text-yellow-700 mt-1 font-medium">
                                + Indian Canyon Cultural Experience (50 guests)
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-charcoal">
                              ${info.minAmount.toLocaleString()}
                            </p>
                            <p className="text-sm text-terracotta font-medium">
                              {info.vipTickets} VIP Tickets
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-4 right-4">
                            <CheckCircle2 className="w-6 h-6 text-terracotta" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Company & Contact Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Building2 className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Company Information</h2>
                  <p className="text-stone-gray">Tell us about your organization</p>
                </div>

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName" className="text-charcoal font-medium">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => updateField('companyName', e.target.value)}
                          className="pl-10"
                          placeholder="Acme Corporation"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-charcoal font-medium">
                        Website
                      </Label>
                      <div className="relative mt-1">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => updateField('website', e.target.value)}
                          className="pl-10"
                          placeholder="https://www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-terracotta" />
                      Primary Contact
                    </h3>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="contactName" className="text-charcoal font-medium">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => updateField('contactName', e.target.value)}
                            className="pl-10"
                            placeholder="John Smith"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactEmail" className="text-charcoal font-medium">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                            <Input
                              id="contactEmail"
                              type="email"
                              value={formData.contactEmail}
                              onChange={(e) => updateField('contactEmail', e.target.value)}
                              className="pl-10"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="contactPhone" className="text-charcoal font-medium">
                            Phone <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative mt-1">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                            <Input
                              id="contactPhone"
                              type="tel"
                              value={formData.contactPhone}
                              onChange={(e) => updateField('contactPhone', e.target.value)}
                              className="pl-10"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Mailing Address */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <MapPin className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Mailing Address</h2>
                  <p className="text-stone-gray">Where should we send correspondence?</p>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="streetAddress" className="text-charcoal font-medium">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => updateField('streetAddress', e.target.value)}
                      className="mt-1"
                      placeholder="123 Main Street, Suite 100"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <Label htmlFor="city" className="text-charcoal font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className="mt-1"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-charcoal font-medium">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className="mt-1"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-charcoal font-medium">
                        ZIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => updateField('zipCode', e.target.value)}
                        className="mt-1"
                        placeholder="94102"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-charcoal font-medium">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      className="mt-1"
                      placeholder="Any special instructions or comments..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Send className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Review & Submit</h2>
                  <p className="text-stone-gray">Please verify your information before submitting</p>
                </div>

                <div className="space-y-6">
                  {/* Tier Summary */}
                  {formData.tier && (
                    <div className="bg-gradient-to-br from-terracotta/5 to-sunset-orange/10 rounded-xl p-6">
                      <h3 className="font-semibold text-charcoal mb-3">Selected Sponsorship</h3>
                      <div className="flex items-center gap-4">
                        {(() => {
                          const Icon = tierIcons[formData.tier as SponsorTier]
                          return (
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                formData.tier === 'gold'
                                  ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
                                  : formData.tier === 'silver'
                                  ? 'bg-gradient-to-br from-gray-200 to-gray-400'
                                  : 'bg-gradient-to-br from-amber-500 to-amber-700'
                              }`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          )
                        })()}
                        <div>
                          <p className="text-lg font-bold text-charcoal">
                            {TIER_INFO[formData.tier as SponsorTier].name} Tier
                          </p>
                          <p className="text-stone-gray">
                            ${TIER_INFO[formData.tier as SponsorTier].minAmount.toLocaleString()} •{' '}
                            <span className="text-terracotta font-medium">
                              {TIER_INFO[formData.tier as SponsorTier].vipTickets} VIP Tickets
                            </span>
                          </p>
                          {formData.tier === 'gold' && TIER_INFO.gold.culturalTour && (
                            <p className="text-yellow-700 text-sm mt-1 font-medium">
                              + Indian Canyon Cultural Experience (up to 50 guests)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Company Info Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-terracotta" />
                      Company Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-stone-gray">Company Name</p>
                        <p className="font-medium text-charcoal">{formData.companyName}</p>
                      </div>
                      {formData.website && (
                        <div>
                          <p className="text-stone-gray">Website</p>
                          <p className="font-medium text-charcoal">{formData.website}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-terracotta" />
                      Primary Contact
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-stone-gray">Name</p>
                        <p className="font-medium text-charcoal">{formData.contactName}</p>
                      </div>
                      <div>
                        <p className="text-stone-gray">Email</p>
                        <p className="font-medium text-charcoal">{formData.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-stone-gray">Phone</p>
                        <p className="font-medium text-charcoal">{formData.contactPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-terracotta" />
                      Mailing Address
                    </h3>
                    <p className="text-charcoal">
                      {formData.streetAddress}
                      <br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  {formData.notes && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-charcoal mb-3">Additional Notes</h3>
                      <p className="text-stone-gray">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-terracotta hover:bg-terracotta/90 text-white gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-terracotta hover:bg-terracotta/90 text-white gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-gray">
            <strong>Note:</strong> After submitting, you&apos;ll receive instructions for mailing your sponsorship check.
            <br />
            Your sponsorship will be activated once payment is received.
          </p>
        </div>
      </div>
    </div>
  )
}

