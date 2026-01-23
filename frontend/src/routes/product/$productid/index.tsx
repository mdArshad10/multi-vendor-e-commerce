import LoadingSpinner from '@/components/common/LoadingSpinner'
import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const ProductDetailPage = React.lazy(() => import('@/modules/product/routes/Product'))


export const Route = createFileRoute('/product/$productid/')({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>

        <ProductDetailPage />
      </Suspense>

    )
  },
})

