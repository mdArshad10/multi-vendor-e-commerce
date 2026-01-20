import { z } from "@multi-vendor-e-commerce/common";

export const createDiscountSchema = z.object({
    body: z.object({
        public_name: z.string().trim(),
        discountType: z.string(),
        discountValue: z.float32(),
        discountCode: z.string()
    })
})

export type createDiscountCodeDto = z.infer<typeof createDiscountSchema.shape.body>;
