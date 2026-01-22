/**
 * providers.tsx - Application Providers
 *
 * Centralizes all context providers in one place.
 * Uses a compose pattern to avoid deep nesting.
 */

import { ThemeProvider } from "@/components/ui/theme-provider";
import { CODE_MODE } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode, ComponentType } from "react";

// ============================================
// Query Client Configuration
// ============================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: CODE_MODE !== "development",
    },
  },
});

// ============================================
// Provider Type Definition
// ============================================
type ProviderComponent = ComponentType<{ children: ReactNode }>;

// ============================================
// Individual Providers (add new providers here)
// ============================================

function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {CODE_MODE == "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

function UiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

// Example: Auth Provider (uncomment when needed)
// function AuthProvider({ children }: { children: ReactNode }) {
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
// }

// Example: Redux Provider (uncomment when needed)
// function StoreProvider({ children }: { children: ReactNode }) {
//   return <Provider store={store}>{children}</Provider>
// }

// ============================================
// Compose Helper - Avoids deep nesting
// ============================================
function composeProviders(...providers: ProviderComponent[]) {
  return function ComposedProviders({ children }: { children: ReactNode }) {
    return providers.reduceRight(
      (child, Provider) => <Provider>{child}</Provider>,
      children,
    );
  };
}

// ============================================
// Main Providers Component
// ============================================

/**
 * Add providers to this array in order (outermost first)
 *
 * Example with more providers:
 * const ComposedProviders = composeProviders(
 *   StoreProvider,    // Redux (outermost)
 *   QueryProvider,    // React Query
 *   AuthProvider,     // Auth context
 *   ThemeProvider,    // Theme (innermost)
 * )
 */
const ComposedProviders = composeProviders(
  QueryProvider,
  UiThemeProvider,
  // Add more providers here as your app grows
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ComposedProviders>{children}</ComposedProviders>;
}

// Export queryClient for use outside React (e.g., in router loaders)
export { queryClient };
