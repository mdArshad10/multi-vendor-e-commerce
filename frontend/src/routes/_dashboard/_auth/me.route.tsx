import LoadingSpinner from '@/components/common/LoadingSpinner'
import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const ProfilePage = React.lazy(() => import('@/modules/profile'))

export const Route = createFileRoute('/_dashboard/_auth/me')({
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfilePage />
    </Suspense>
  ),
})
