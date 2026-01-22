import LoadingSpinner from '@/components/common/LoadingSpinner';
import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react';

const DashboardPage = React.lazy(() => import("@/modules/dashboard/routes"));

export const Route = createFileRoute('/dashboard/')({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardPage />
      </Suspense>
    );
  },
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
