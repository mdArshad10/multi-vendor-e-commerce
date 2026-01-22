/**
 * App.tsx - Root Application Component
 *
 * The main entry component that:
 * - Wraps everything in providers
 * - Renders the router with error boundary
 * - Provides dev tools in development
 */

import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Providers } from "./providers";
import { router } from "./router";
import { Fallback } from "@/components/common/Fallback";
import { CODE_MODE } from "@/lib/config";

export function App() {
  return (
    <Providers>
      <ErrorBoundary FallbackComponent={Fallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
      {/* Router devtools - only in development */}
      {CODE_MODE == "development" && (
        <TanStackRouterDevtools router={router} position="bottom-right" />
      )}
    </Providers>
  );
}

export default App;
