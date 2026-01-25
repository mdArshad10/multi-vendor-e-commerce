import { z } from "@multi-vendor-e-commerce/common";



export const userRegisterSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
    })

});



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

export const userForgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().email(),
    })
})

export const updatePasswordSchema = z.object({
    body: z.object({
        password: z.string().min(6).max(50),
        email: z.string().email(),
    })
})

export const userForgotPasswordOtpSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().min(4).max(4),
    })
})

export const connectStripAccountSchema = z.object({
    body: z.object({
        sellerId: z.string()
    })
})