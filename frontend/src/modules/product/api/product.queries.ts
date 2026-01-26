import { useMutation, useQuery } from "@tanstack/react-query";
import * as productService from "./product.service";

/**
 * Query Keys
 * Centralized for cache invalidation
 */
export const productKeys = {
    all: ["products"] as const,
    currentUser: () => [...productKeys.all, "currentUser"] as const,
};

/**
 * Get current user (query)
 */
export function useGetProducts() {
    return useQuery({
        queryKey: productKeys.currentUser(),
        queryFn: () => productService.getProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}

/**
 * create a product
 */
export function useCreateProduct() {
    return useMutation({
        mutationFn: (data: any) => productService.createProduct(data),
    });
}

