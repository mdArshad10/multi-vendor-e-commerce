import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const CreateProductPage = React.lazy(
  () => import("@/modules/product/routes/CreateProduct"),
);

export const Route = createFileRoute("/_dashboard/dashboard/product")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <CreateProductPage />
      </Suspense>
    );
  },
});
