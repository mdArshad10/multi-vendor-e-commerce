import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const RegisterPage = React.lazy(
  () => import("@/modules/auth/routes/RegisterPage"),
);

export const Route = createFileRoute("/auth/register")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterPage />
      </Suspense>
    );
  },
});
