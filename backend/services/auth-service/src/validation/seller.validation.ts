import { z } from "@multi-vendor-e-commerce/common";
import validator from 'validator'


export const SellerVerifySchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().min(4).max(4),
        password: z.string().min(6).max(50),
        name: z.string().min(3).max(50),
        country: z.string().min(2).max(50),
        phone_number: z.string().refine(validator.isMobilePhone),
    })
})
