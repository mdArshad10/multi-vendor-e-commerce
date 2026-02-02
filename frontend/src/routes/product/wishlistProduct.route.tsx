import LoadingSpinner from "@/components/common/LoadingSpinner";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const WishlistProductPage = lazy(
  () => import("@/modules/product/routes/WishlistProduct"),
);

export const Route = createFileRoute("/product/wishlistProduct")({
  component: () => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <WishlistProductPage />
      </Suspense>
    );
  },
});


