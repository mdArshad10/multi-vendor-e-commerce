/**
 * LoadingSpinner.tsx - Full page loading spinner
 *
 * Use as Suspense fallback for lazy-loaded pages
 */

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
  /** Additional classes */
  className?: string;
  /** Show full page centered or inline */
  fullPage?: boolean;
}

const sizeClasses = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
};

export function LoadingSpinner({
  size = "lg",
  className,
  fullPage = true,
}: LoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner className={cn(sizeClasses[size], "text-primary", className)} />
      </div>
    );
  }

  return (
    <Spinner className={cn(sizeClasses[size], "text-primary", className)} />
  );
}

export default LoadingSpinner;
