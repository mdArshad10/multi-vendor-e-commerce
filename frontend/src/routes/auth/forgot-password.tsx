/**
 * forgot-password.tsx - Forgot Password Route
 *
 * Route: /auth/forgot-password
 */

import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const ForgotPasswordPage = React.lazy(
  () => import("@/modules/auth/routes/ForgotPasswordPage"),
);

export const Route = createFileRoute("/auth/forgot-password")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ForgotPasswordPage />
      </Suspense>
    );
  },
});
