import { apiClient } from "@/shared/api/api-client";
import type { createDiscountType } from "../types/discount.type";
import type { Response } from "@/types/Response.type";
// import type { Product } from "../types/product.type";



export function createDiscount(data: createDiscountType): Promise<Response<createDiscountType>> {
    return apiClient.post<Response<createDiscountType>>("/products/create-discount-code", data);
}

export function getAllDiscount(query: any): Promise<Response<any[]>> {
    return apiClient.get<Response<any[]>>("/products/discount-code", { params: query });
}

export function deleteDiscount(id: string): Promise<Response<void>> {
    return apiClient.delete<Response<void>>(`/products/discounts/${id}`);
}