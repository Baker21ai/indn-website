'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
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
  CreditCard,
  Star,
  Heart,
  Users,
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

interface FormErrors {
  [key: string]: string
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

// Custom Error Message Component
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null
  return (
    <p className="text-sm text-red-500 mt-1 animate-in slide-in-from-top-1 duration-200">
      {message}
    </p>
  )
}

function SponsorApplyContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentInstructions, setPaymentInstructions] = useState<{
    check: {
      payableTo: string
      mailingAddress: string
      memo: string
      taxId?: string
    }
    online: {
      description: string
      qrCodePath: string
      link: string
    }
    fiscalSponsorNote?: string
  } | null>(null)
  const [globalError, setGlobalError] = useState('')
  
  // Ref for scrolling to top of form on step change or error
  const formTopRef = useRef<HTMLDivElement>(null)

  // Pre-select tier from URL parameter
  useEffect(() => {
    const tierParam = searchParams.get('tier')
    if (tierParam && ['gold', 'silver', 'bronze'].includes(tierParam)) {
      setFormData(prev => ({ ...prev, tier: tierParam as SponsorTier }))
    }
  }, [searchParams])

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    setGlobalError('')
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    switch (currentStep) {
      case 1:
        if (!formData.tier) {
          newErrors.tier = 'Please select a sponsorship tier'
          isValid = false
        }
        break
      case 2:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company/Individual name is required'
        if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required'
        if (!formData.contactEmail.trim()) {
          newErrors.contactEmail = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = 'Please enter a valid email address'
        }
        
        if (Object.keys(newErrors).length > 0) isValid = false
        break
      case 3:
        if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
        
        if (Object.keys(newErrors).length > 0) isValid = false
        break
      default:
        break
    }

    setErrors(newErrors)
    
    // If invalid, scroll to the first error
    if (!isValid) {
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      } else {
        formTopRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return isValid
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setErrors({})
    setGlobalError('')
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsSubmitting(true)
    setGlobalError('')

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

      setPaymentInstructions(data.paymentInstructions)
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      formTopRef.current?.scrollIntoView({ behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess && paymentInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-gray via-white to-warm-gray py-12 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-elevated overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600" />
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-charcoal mb-4">
                Application Submitted!
              </h1>
              <p className="text-lg text-stone-gray mb-12 max-w-2xl mx-auto">
                Thank you for your commitment to supporting Indigenous communities.
                Please choose your preferred payment method below.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
                {/* Option 1: Check Payment */}
                <div className="bg-gradient-to-br from-terracotta/5 to-sunset-orange/10 rounded-2xl p-6 md:p-8 border border-terracotta/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-terracotta" />
                    </div>
                    <h2 className="text-xl font-bold text-charcoal">
                      Pay by Check
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-terracotta mb-1">Make Payable To:</p>
                      <p className="text-charcoal font-medium">{paymentInstructions.check.payableTo}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-terracotta mb-1">Mail To:</p>
                      <p className="text-charcoal font-medium whitespace-pre-line">{paymentInstructions.check.mailingAddress}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-terracotta mb-1">Memo Line:</p>
                      <p className="text-charcoal font-medium">{paymentInstructions.check.memo}</p>
                    </div>

                    {paymentInstructions.check.taxId && (
                      <div>
                        <p className="text-sm font-semibold text-terracotta mb-1">Tax ID (EIN):</p>
                        <p className="text-charcoal font-medium">{paymentInstructions.check.taxId}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Option 2: Online Payment */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-charcoal">
                      Pay Online
                    </h2>
                  </div>

                  {/* Fiscal Sponsor Redirect Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-800 text-center">
                      <strong>Note:</strong> You will be redirected to our fiscal sponsor <strong>Youth Alliance&apos;s</strong> secure donation page to complete your sponsorship payment.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 inline-block mb-6 transition-transform hover:scale-105">
                      <a
                        href={paymentInstructions.online.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                         <Image
                          src={paymentInstructions.online.qrCodePath}
                          alt="Scan to Donate via Youth Alliance"
                          width={180}
                          height={180}
                          className="rounded-lg"
                        />
                      </a>
                    </div>
                    <p className="text-charcoal font-medium mb-2">Scan or Click to Pay via Youth Alliance</p>
                    <p className="text-sm text-stone-gray mb-4">
                      {paymentInstructions.online.description}
                    </p>
                    <Button
                      asChild
                      className="mb-4 bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
                    >
                      <a
                        href={paymentInstructions.online.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Sponsorship via Youth Alliance
                      </a>
                    </Button>
                    <p className="text-xs text-stone-gray bg-gray-50 p-3 rounded-lg">
                      Please mention <strong>&quot;INDN Sponsorship - {formData.companyName}&quot;</strong> in the donation comments/notes
                    </p>
                  </div>
                </div>
              </div>

              {/* Fiscal Sponsor Note */}
              {paymentInstructions.fiscalSponsorNote && (
                <div className="max-w-3xl mx-auto mb-12 p-4 bg-sage-green/10 border border-sage-green/20 rounded-lg text-center">
                  <p className="text-sm text-charcoal/80 font-medium">
                    {paymentInstructions.fiscalSponsorNote}
                  </p>
                </div>
              )}

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
    <div className="min-h-screen bg-gradient-to-br from-warm-gray via-white to-warm-gray py-12 px-4 pt-24" ref={formTopRef}>
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
          <h1 className="text-section text-charcoal mb-3">
            Become a <span className="text-italic-accent text-terracotta">Sponsor</span>
          </h1>
          <p className="text-body text-stone-gray">
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
          <span className={step >= 2 ? 'text-charcoal font-medium' : ''}>Sponsor Info</span>
          <span className={step >= 3 ? 'text-charcoal font-medium' : ''}>Address</span>
          <span className={step >= 4 ? 'text-charcoal font-medium' : ''}>Review</span>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-elevated overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-gray-300 to-amber-600" />

          <CardContent className="p-6 md:p-8">
            {globalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                {globalError}
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
                        } ${errors.tier ? 'border-red-300 bg-red-50' : ''}`}
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
                {errors.tier && (
                  <div className="text-center">
                    <ErrorMessage message={errors.tier} />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Company & Contact Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Building2 className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Sponsor Information</h2>
                  <p className="text-stone-gray">Tell us about yourself or your organization</p>
                </div>

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName" className="text-charcoal font-medium">
                        Company or Individual Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => updateField('companyName', e.target.value)}
                          className={`pl-10 ${errors.companyName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                          placeholder="Acme Corporation or John Doe"
                        />
                      </div>
                      <ErrorMessage message={errors.companyName} />
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
                            className={`pl-10 ${errors.contactName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            placeholder="John Smith"
                          />
                        </div>
                        <ErrorMessage message={errors.contactName} />
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
                              className={`pl-10 ${errors.contactEmail ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                              placeholder="john@example.com"
                            />
                          </div>
                          <ErrorMessage message={errors.contactEmail} />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone" className="text-charcoal font-medium">
                            Phone
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
                      className={`mt-1 ${errors.streetAddress ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      placeholder="123 Main Street, Suite 100"
                    />
                    <ErrorMessage message={errors.streetAddress} />
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
                        className={`mt-1 ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="San Francisco"
                      />
                      <ErrorMessage message={errors.city} />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-charcoal font-medium">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className={`mt-1 ${errors.state ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="CA"
                      />
                      <ErrorMessage message={errors.state} />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-charcoal font-medium">
                        ZIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => updateField('zipCode', e.target.value)}
                        className={`mt-1 ${errors.zipCode ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="94102"
                      />
                      <ErrorMessage message={errors.zipCode} />
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

            {/* Step 4: Enhanced Review & Submit */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-3 bg-terracotta/10 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-terracotta" />
                  </div>
                  <h2 className="text-3xl font-bold text-charcoal mb-2">Your Impact Awaits</h2>
                  <p className="text-lg text-stone-gray max-w-2xl mx-auto">
                    You&apos;re about to create lasting change for Indigenous communities.
                    Here&apos;s a summary of your generous commitment and what you&apos;ll experience.
                  </p>
                </div>

                {/* Tier & Benefits Showcase */}
                {formData.tier && (() => {
                  const info = TIER_INFO[formData.tier as SponsorTier]
                  const Icon = tierIcons[formData.tier as SponsorTier]
                  
                  return (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal to-gray-900 text-white p-8 md:p-10 shadow-xl">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-green/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="flex-shrink-0">
                          <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/20`}>
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                            <h3 className="text-3xl font-bold text-white">{info.name} Partner</h3>
                            <span className="text-xl text-white/80 font-medium">
                              ${info.minAmount.toLocaleString()} Contribution
                            </span>
                          </div>
                          
                          <p className="text-lg text-white/90 mb-6 italic">
                            &ldquo;{info.description}&rdquo;
                          </p>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-white/10 rounded-lg mt-0.5">
                                <Star className="w-4 h-4 text-yellow-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">VIP Recognition</p>
                                <p className="text-sm text-white/70">Featured on our website & events</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-white/10 rounded-lg mt-0.5">
                                <Users className="w-4 h-4 text-blue-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">{info.vipTickets} VIP Tickets</p>
                                <p className="text-sm text-white/70">Annual Hollister Powwow access</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-white/10 rounded-lg mt-0.5">
                                <Heart className="w-4 h-4 text-red-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">Community Impact</p>
                                <p className="text-sm text-white/70">Direct support for youth programs</p>
                              </div>
                            </div>

                            {formData.tier === 'gold' && (
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-white/10 rounded-lg mt-0.5">
                                  <Sparkles className="w-4 h-4 text-terracotta" />
                                  </div>
                                <div>
                                  <p className="font-semibold text-white">Exclusive Experience</p>
                                  <p className="text-sm text-white/70">Private Indian Canyon tour</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Indian Canyon Experience - Highlight for All or Specific Tiers */}
                <div className="bg-sage-green/5 rounded-2xl p-8 border border-sage-green/20">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-charcoal flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-terracotta" />
                      Experience Indian Canyon
                    </h3>
                    <p className="text-stone-gray leading-relaxed">
                      As a valued partner, you&apos;re invited to connect deeply with the land. 
                      Indian Canyon is the only federally recognized "Indian Country" between 
                      Sonoma and Santa Barbara—a sacred space for ceremony and revitalization.
                    </p>
                    <p className="text-sm font-medium text-terracotta">
                      {formData.tier === 'gold' 
                        ? '✨ Your Gold tier includes a private cultural experience for up to 50 guests.' 
                        : '🌿 All sponsors receive priority invitations to seasonal gatherings.'}
                    </p>
                  </div>
                </div>

                {/* Verification Summary */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Confirm Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                      <span className="text-stone-gray block mb-1">Sponsor Name</span>
                      <span className="font-medium text-charcoal">{formData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-stone-gray block mb-1">Contact Email</span>
                      <span className="font-medium text-charcoal">{formData.contactEmail}</span>
                    </div>
                    <div>
                      <span className="text-stone-gray block mb-1">Contact Person</span>
                      <span className="font-medium text-charcoal">{formData.contactName}</span>
                    </div>
                    <div>
                      <span className="text-stone-gray block mb-1">Mailing Address</span>
                      <span className="font-medium text-charcoal">
                        {formData.streetAddress}, {formData.city}, {formData.state} {formData.zipCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 p-4 bg-terracotta/5 rounded-lg">
                  <div className="mt-1">
                    <Sparkles className="w-5 h-5 text-terracotta" />
                  </div>
                  <p className="text-sm text-charcoal/80">
                    By clicking submit, you confirm your commitment to the INDN mission. 
                    We are honored to walk this path together.
                  </p>
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
                  className="bg-terracotta hover:bg-terracotta/90 text-white gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Complete Sponsorship
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
            <strong>Note:</strong> After submitting, you&apos;ll receive instructions for mailing your sponsorship check or paying online.
            <br />
            Your sponsorship will be activated once payment is received.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SponsorApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SponsorApplyContent />
    </Suspense>
  )
}
