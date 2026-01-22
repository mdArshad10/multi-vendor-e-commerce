/**
 * router.tsx - Router Configuration
 *
 * Creates the TanStack Router instance from the generated route tree.
 * This file is the central place for:
 * - Router configuration
 * - Default error/pending components
 * - 404 handling
 */

import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import LoadingSpinner from "@/components/common/LoadingSpinner";

/**
 * Create the router instance
 *
 * TanStack Router will auto-generate routeTree.gen.ts
 * based on files in src/routes/
 */
export const router = createRouter({
  routeTree,

  // Default pending (loading) component for all routes
  defaultPendingComponent: () => <LoadingSpinner size="md" />,

  // Default error component for all routes
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-destructive">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),

  // Default 404 component
  defaultNotFoundComponent: () => (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
    </div>
  ),
});

/**
 * Register the router for TypeScript type inference
 * This enables type-safe navigation throughout the app
 */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
