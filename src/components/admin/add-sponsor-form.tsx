'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Upload, X, Shield, PawPrint, Mountain, Bird } from 'lucide-react'
import Image from 'next/image'

export function AddSponsorForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  const [formData, setFormData] = useState({
    sponsorType: 'individual',
    email: '',
    displayName: '',
    tier: '',
    totalAmount: '',
    location: '',
    website: '',
    notes: '',
    memberSince: new Date().toISOString().split('T')[0],
  })

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingLogo(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload logo')
      }

      const data = await response.json()
      setUploadedLogoUrl(data.url)
    } catch (error) {
      console.error('Error uploading logo:', error)
      alert('Failed to upload logo. Please try again.')
    } finally {
      setUploadingLogo(false)
    }
  }

  function removeLogo() {
    setUploadedLogoUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validation
      if (!formData.email || !formData.displayName) {
        alert('Email and display name are required')
        setIsSubmitting(false)
        return
      }

      if (formData.sponsorType === 'company' && !uploadedLogoUrl) {
        const confirmWithoutLogo = confirm(
          'You are adding a company without a logo. Continue?'
        )
        if (!confirmWithoutLogo) {
          setIsSubmitting(false)
          return
        }
      }

      const payload = {
        sponsorType: formData.sponsorType,
        email: formData.email,
        displayName: formData.displayName,
        tier: formData.tier || null,
        totalAmount: parseFloat(formData.totalAmount) || 0,
        location: formData.location || null,
        logoUrl: uploadedLogoUrl,
        website: formData.website || null,
        notes: formData.notes || null,
        memberSince: formData.memberSince,
      }

      const response = await fetch('/api/admin/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create sponsor')
      }

      router.push('/portal/admin/sponsors')
      router.refresh()
    } catch (error) {
      console.error('Error creating sponsor:', error)
      alert(error instanceof Error ? error.message : 'Failed to create sponsor. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sponsor Type */}
          <div className="space-y-2">
            <Label>Sponsor Type *</Label>
            <RadioGroup
              value={formData.sponsorType}
              onValueChange={(value) => setFormData({ ...formData, sponsorType: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="font-normal cursor-pointer">
                  Individual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="font-normal cursor-pointer">
                  Company
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sponsor@example.com"
              required
            />
            <p className="text-xs text-muted-foreground">
              A user account will be created with this email
            </p>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name *</Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder={
                formData.sponsorType === 'company' ? 'Acme Corporation' : 'John Doe'
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              This name will appear on the sponsors page
            </p>
          </div>

          {/* Tier and Total Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tier">Recognition Tier</Label>
              <Select value={formData.tier} onValueChange={(value) => setFormData({ ...formData, tier: value })}>
                <SelectTrigger id="tier">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="turtle">
                    <div className="flex items-center gap-2">
                      <Shield size={16} />
                      Turtle ($100-$999)
                    </div>
                  </SelectItem>
                  <SelectItem value="wolf">
                    <div className="flex items-center gap-2">
                      <PawPrint size={16} />
                      Wolf ($1,000-$4,999)
                    </div>
                  </SelectItem>
                  <SelectItem value="bear">
                    <div className="flex items-center gap-2">
                      <Mountain size={16} />
                      Bear ($5,000-$9,999)
                    </div>
                  </SelectItem>
                  <SelectItem value="eagle">
                    <div className="flex items-center gap-2">
                      <Bird size={16} />
                      Eagle ($10,000+)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Sponsorship Amount</Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                min="0"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Location and Member Since */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberSince">Member Since</Label>
              <Input
                id="memberSince"
                type="date"
                value={formData.memberSince}
                onChange={(e) => setFormData({ ...formData, memberSince: e.target.value })}
              />
            </div>
          </div>

          {/* Website (Companies only) */}
          {formData.sponsorType === 'company' && (
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          )}

          {/* Logo Upload (Companies only) */}
          {formData.sponsorType === 'company' && (
            <div className="space-y-2">
              <Label>Company Logo</Label>
              {uploadedLogoUrl ? (
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <Image
                        src={uploadedLogoUrl}
                        alt="Uploaded logo"
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-600 font-medium mb-2">Logo uploaded successfully</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} className="mr-1" />
                        Remove Logo
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-colors"
                >
                  <Upload size={48} className="mx-auto mb-4 text-stone-gray" />
                  <p className="text-sm font-medium mb-1">
                    {uploadingLogo ? 'Uploading...' : 'Click to upload company logo'}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Admin Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Internal notes about this sponsor..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              These notes are only visible to admins
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || uploadingLogo}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              {isSubmitting ? 'Creating Sponsor...' : 'Create Sponsor'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
