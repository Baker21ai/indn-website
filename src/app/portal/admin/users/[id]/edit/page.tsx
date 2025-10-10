'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: 'volunteer' | 'board_member' | 'admin'
  phone?: string
  isActive: boolean
  emailVerified: Date | null
  createdAt: Date
  lastLoginAt: Date | null
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [resetPassword, setResetPassword] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'volunteer' as 'volunteer' | 'board_member' | 'admin',
    phone: '',
    isActive: true,
  })

  useEffect(() => {
    fetchUser()
  }, [params.id])

  async function fetchUser() {
    try {
      const res = await fetch(`/api/admin/users/${params.id}`)
      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        setFormData({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          phone: data.user.phone || '',
          isActive: data.user.isActive,
        })
      } else {
        setError(data.error || 'Failed to fetch user')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/portal/admin/users')
      } else {
        setError(data.error || 'Failed to update user')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleResetPassword() {
    if (!resetPassword || resetPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/users/${params.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: resetPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Password reset successfully')
        setResetPassword('')
        setShowResetPassword(false)
      } else {
        setError(data.error || 'Failed to reset password')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/portal/admin/users')
      } else {
        setError(data.error || 'Failed to delete user')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray p-8 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-gray p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-600">User not found</p>
          <Link href="/portal/admin/users">
            <Button className="mt-4">Back to Users</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-terracotta mb-2">
            Edit User
          </h1>
          <p className="text-stone-gray">Update user information</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2">
                  Role *
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as 'volunteer' | 'board_member' | 'admin',
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="board_member">Board Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm">
                  Account Active
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-terracotta hover:bg-terracotta/90"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link href="/portal/admin/users">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            {!showResetPassword ? (
              <Button
                onClick={() => setShowResetPassword(true)}
                variant="outline"
              >
                Reset User Password
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="resetPassword" className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    id="resetPassword"
                    type="password"
                    minLength={8}
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleResetPassword}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSaving ? 'Resetting...' : 'Reset Password'}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowResetPassword(false)
                      setResetPassword('')
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-gray mb-4">
              Deleting a user will permanently remove all their data. This action cannot be undone.
            </p>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
