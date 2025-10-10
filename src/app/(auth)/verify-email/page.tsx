'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setError('No verification token provided')
      setIsLoading(false)
    } else {
      setToken(tokenParam)
      verifyEmail(tokenParam)
    }
  }, [searchParams])

  async function verifyEmail(verificationToken: string) {
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: verificationToken }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
        if (data.alreadyVerified) {
          setTimeout(() => router.push('/login'), 2000)
        } else {
          setTimeout(() => router.push('/login'), 3000)
        }
      } else {
        setError(data.error || 'Verification failed')
      }
    } catch (err) {
      setError('Failed to verify email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResend() {
    setIsResending(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }), // User would need to provide email
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
      } else {
        setError(data.error || 'Failed to resend verification email')
      }
    } catch (err) {
      setError('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-gray">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">Verifying your email...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-gray px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-terracotta">
            Email Verification
          </CardTitle>
          <CardDescription>
            {message ? 'Success!' : 'Verifying your email address'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div className="p-4 bg-sage-green/10 text-sage-green rounded-md">
              <p className="font-medium">{message}</p>
              <p className="text-sm mt-2">Redirecting to login page...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              <p className="font-medium">{error}</p>
              {token && (
                <p className="text-sm mt-2">
                  The verification link may have expired or is invalid.
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Link href="/login">
              <Button className="w-full bg-terracotta hover:bg-terracotta/90">
                Go to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-warm-gray">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  )
}
