'use client'

import { useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface EnrollmentRecord {
  id: string
  studentFullName: string
  dateOfBirth: string
  studentAddress: string
  parentGuardianName: string
  phoneNumber: string
  emailAddress: string
  emergencyContact: string
  submittedAt: string
}

export interface ReviewRecord {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  submittedAt: string
}

interface UseRealtimeSubscriptionsProps {
  onEnrollmentInsert?: (enrollment: EnrollmentRecord) => void
  onEnrollmentUpdate?: (enrollment: EnrollmentRecord) => void
  onEnrollmentDelete?: (id: string) => void
  onReviewInsert?: (review: ReviewRecord) => void
  onReviewUpdate?: (review: ReviewRecord) => void
  onReviewDelete?: (id: string) => void
  onConnectionChange?: (connected: boolean) => void
}

export function useRealtimeSubscriptions({
  onEnrollmentInsert,
  onEnrollmentUpdate,
  onEnrollmentDelete,
  onReviewInsert,
  onReviewUpdate,
  onReviewDelete,
  onConnectionChange,
}: UseRealtimeSubscriptionsProps = {}) {
  const channelsRef = useRef<RealtimeChannel[]>([])
  const isSubscribedRef = useRef(false)

  const subscribe = useCallback(() => {
    if (isSubscribedRef.current) return

    try {
      // Subscribe to enrollment changes
      const enrollmentChannel = supabase.channel('enrollments').on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'enrollment',
        },
        (payload) => {
          console.log('[v0] New enrollment received:', payload.new)
          onEnrollmentInsert?.(payload.new as EnrollmentRecord)
        }
      ).on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'enrollment',
        },
        (payload) => {
          console.log('[v0] Enrollment updated:', payload.new)
          onEnrollmentUpdate?.(payload.new as EnrollmentRecord)
        }
      ).on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'enrollment',
        },
        (payload) => {
          console.log('[v0] Enrollment deleted:', payload.old.id)
          onEnrollmentDelete?.(payload.old.id)
        }
      )

      // Subscribe to review/vacancy changes
      const reviewChannel = supabase.channel('reviews').on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'vacancy',
        },
        (payload) => {
          console.log('[v0] New review/vacancy received:', payload.new)
          onReviewInsert?.(payload.new as ReviewRecord)
        }
      ).on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'vacancy',
        },
        (payload) => {
          console.log('[v0] Review/vacancy updated:', payload.new)
          onReviewUpdate?.(payload.new as ReviewRecord)
        }
      ).on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'vacancy',
        },
        (payload) => {
          console.log('[v0] Review/vacancy deleted:', payload.old.id)
          onReviewDelete?.(payload.old.id)
        }
      )

      channelsRef.current = [enrollmentChannel, reviewChannel]

      // Subscribe to all channels
      enrollmentChannel.subscribe((status) => {
        console.log('[v0] Enrollment channel status:', status)
        if (status === 'SUBSCRIBED') {
          onConnectionChange?.(true)
        }
      })

      reviewChannel.subscribe((status) => {
        console.log('[v0] Review channel status:', status)
        if (status === 'SUBSCRIBED') {
          onConnectionChange?.(true)
        }
      })

      isSubscribedRef.current = true
    } catch (error) {
      console.error('[v0] Error subscribing to realtime:', error)
      onConnectionChange?.(false)
    }
  }, [onEnrollmentInsert, onEnrollmentUpdate, onEnrollmentDelete, onReviewInsert, onReviewUpdate, onReviewDelete, onConnectionChange])

  const unsubscribe = useCallback(() => {
    channelsRef.current.forEach((channel) => {
      supabase.removeChannel(channel)
    })
    channelsRef.current = []
    isSubscribedRef.current = false
  }, [])

  useEffect(() => {
    subscribe()

    return () => {
      unsubscribe()
    }
  }, [subscribe, unsubscribe])
}
