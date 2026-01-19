import { z } from "@multi-vendor-e-commerce/common";

export const createShopSchema = z.object({
    body:z.object({
        name:z.string(),
        bio:z.string().optional(),
        address:z.string().optional(),
        opening_hour:z.string(),
        website:z.string(),
        category:z.string(),
        sellerId:z.string(),
    })
})