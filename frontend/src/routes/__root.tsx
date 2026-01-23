/**
 * __root.tsx - Root Layout
 *
 * The root route that wraps ALL other routes.
 * Use this for:
 * - Global layout (Navbar, Footer)
 * - Error boundaries
 * - Global context providers
 */

import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { Header } from '@/components/common/Header'
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        {/* <Header 
        favoritesCount={5}
        cartCount={3}
        userName="Hello, Arshad!"
      /> */}

        {/* Main content - child routes render here */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        {/* <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2024 Multi-Vendor E-Commerce. All rights reserved.
      </footer> */}
      </div>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
