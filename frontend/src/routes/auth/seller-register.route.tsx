import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const SellerRegisterPage = React.lazy(
  () => import("@/modules/auth/routes/SellerRegisterPage"),
);

export const Route = createFileRoute("/auth/seller-register")({
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <SellerRegisterPage />
    </Suspense>
  ),
});
