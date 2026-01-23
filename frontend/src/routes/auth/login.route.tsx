import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const LoginPage = React.lazy(() => import("@/modules/auth/routes/LoginPage"));

export const Route = createFileRoute("/auth/login")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    );
  },
});
