import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const SellerLoginPage = React.lazy(
  () => import("@/modules/auth/routes/SellerLoginPage"),
);

export const Route = createFileRoute("/auth/seller-login")({
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <SellerLoginPage />
    </Suspense>
  ),
});
