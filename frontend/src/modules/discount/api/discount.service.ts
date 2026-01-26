import { apiClient } from "@/shared/api/api-client";
// import type { Product } from "../types/product.type";

export function createDisounct(data:any) {
    return apiClient.post("/discounts", data);
}

export function getAllDiscount(query:any) {
    return apiClient.get("/discounts", { params: query });
}

export function deleteDiscount(id:string) {
    return apiClient.delete(`/discounts/${id}`);
}