/**
 * Fallback.tsx - Error Boundary Fallback Component
 *
 * Displays when an uncaught error occurs in the app
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CODE_MODE } from "@/lib/config";
import { RiAlertLine, RiRefreshLine, RiHomeLine } from "@remixicon/react";
import type { FallbackProps } from "react-error-boundary";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <RiAlertLine className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred. Please try again or return to the home
            page.
          </p>

          {/* Error details (only in development) */}
          {CODE_MODE == "development" &&
            error instanceof Error &&
            error.message && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error details
                </summary>
                <pre className="mt-2 overflow-auto rounded-md bg-muted p-3 text-xs text-destructive">
                  {error.message}
                </pre>
              </details>
            )}

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <RiHomeLine className="h-4 w-4" />
              Go Home
            </Button>
            <Button className="flex-1 gap-2" onClick={resetErrorBoundary}>
              <RiRefreshLine className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Fallback;
