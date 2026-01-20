import { z } from "@multi-vendor-e-commerce/common";

export const createProductSchemaValidation = z.object({
    body: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.string(),
        sub_category: z.string(),
        images:z.array(z.string()).optional(),
        short_description: z.string(),
        detailed_description: z.string(),
        video_url: z.string().optional(),
        tag: z.string(),
        brand: z.string().optional(),
        colors: z.array(z.string()),
        size: z.array(z.string()),
        starting_date: z.iso.datetime(),
        ending_date: z.iso.datetime(),
        stock: z.int(),
        sale_price: z.float32(), // 
        regular_price: z.float64(),
        rating: z.float64(),
        warranty: z.string(),
        custom_specification:z.json(),
        custom_property:z.json(),
        discount_codes:z.array(z.string()),
        status: z.string().default("active")
    })
})

export type createProductSchemaValidationDto = z.infer<typeof createProductSchemaValidation.shape.body>