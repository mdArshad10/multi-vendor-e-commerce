import { useMutation, useQuery } from "@tanstack/react-query";
import * as discountService from "./discount.service";
import type { createDiscountType } from "../types/discount.type";

/**
 * Get all discounts (query)
 */
export function useGetProducts() {
    return useQuery({
        queryKey: ["discounts"],
        queryFn: (query: any) => discountService.getAllDiscount(query),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
}

/**
 * create a discount
 */
export function useCreateDiscount() {
    return useMutation({
        mutationFn: (data: createDiscountType) => discountService.createDiscount(data),
    });
}

/**
 * delete a discount
 */
export function useDeleteDiscount() {
    return useMutation({
        mutationFn: (id: string) => discountService.deleteDiscount(id),
    });
}
