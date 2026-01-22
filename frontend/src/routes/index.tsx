/**
 * index.tsx - Home Page Route
 * 
 * The landing page at /
 */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Multi-Vendor E-Commerce
      </h1>
      <p className="text-muted-foreground">
        Your marketplace for everything.
      </p>
    </div>
  )
}
