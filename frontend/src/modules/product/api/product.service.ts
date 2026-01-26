import { apiClient } from "@/shared/api/api-client";
// import type { Product } from "../types/product.type";

interface Product {
    id: number;
    name: string;
    price: number;
}

/**
 * Get products
 */
export async function getProducts(): Promise<Product[]> {
    return apiClient.get<Product[]>("/products");
}

/**
 * create products
 */
export async function createProduct(product: Product): Promise<Product> {
    return apiClient.post<Product>("/products", product);
}


