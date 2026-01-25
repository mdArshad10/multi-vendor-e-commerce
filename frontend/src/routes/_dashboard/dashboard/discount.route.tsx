import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const CreateDiscountCodePage = React.lazy(
  () => import("@/modules/discount/routes/DiscountCode"),
);

export const Route = createFileRoute("/_dashboard/dashboard/discount")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <CreateDiscountCodePage />
      </Suspense>
    );
  },
});
