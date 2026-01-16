import { z } from "@multi-vendor-e-commerce/common";

export const userRegisterSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(50),
        userType: z.enum(["USER", "SELLER"]).default("USER"),
        country: z.string().min(2).max(50).optional(),
        phone: z.string().min(10).max(15).optional(),
    })

}).superRefine(({ body }, ctx) => {
    if (body.userType == "SELLER") {
        if (!body.country || !body.phone) {
            ctx.addIssue({
                code: "custom",
                message: "country and phone are required for seller"
            })
        }
    }
})

export const userVerifySchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().min(4).max(4),
        password: z.string().min(6).max(50),
        name: z.string().min(3).max(50),
    })
})

export const userLoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6).max(50),
    })
})