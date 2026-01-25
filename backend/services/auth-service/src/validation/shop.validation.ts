import { z } from "@multi-vendor-e-commerce/common";
import validator from 'validator'

export const createShopSchema = z.object({
    body: z.object({
        name: z.string(),
        bio: z.string(),
        address: z.string(),
        sellerId: z.string().refine(validator.isMongoId),
        opening_hour: z.string(),
        website: z.string().optional(),
        category: z.string(),
    })
})