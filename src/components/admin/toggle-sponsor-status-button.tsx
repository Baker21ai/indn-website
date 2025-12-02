'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Archive, RotateCcw } from 'lucide-react'

interface ToggleSponsorStatusButtonProps {
  sponsorId: string
  currentStatus: string
  sponsorName: string
}

export function ToggleSponsorStatusButton({
  sponsorId,
  currentStatus,
  sponsorName,
}: ToggleSponsorStatusButtonProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const isFormer = currentStatus === 'former'
  const newStatus = isFormer ? 'active' : 'former'

  async function handleToggle() {
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/admin/sponsors/${sponsorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update sponsor status')
      }

      router.refresh()
    } catch (error) {
      console.error('Error updating sponsor status:', error)
      alert('Failed to update sponsor status. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={
            isFormer
              ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
              : 'border-gray-400 text-gray-600 hover:bg-gray-50'
          }
        >
          {isFormer ? (
            <>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reactivate
            </>
          ) : (
            <>
              <Archive className="w-4 h-4 mr-1" />
              Mark Former
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFormer ? 'Reactivate Sponsor?' : 'Mark as Former Sponsor?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isFormer ? (
              <>
                This will reactivate <strong>{sponsorName}</strong> and they will appear in the
                active sponsors list on the website.
              </>
            ) : (
              <>
                This will mark <strong>{sponsorName}</strong> as a former sponsor. They will be
                moved to the &quot;Former Sponsors&quot; section on the website.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            disabled={isUpdating}
            className={isFormer ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-500 hover:bg-gray-600'}
          >
            {isUpdating
              ? 'Updating...'
              : isFormer
              ? 'Reactivate Sponsor'
              : 'Mark as Former'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

