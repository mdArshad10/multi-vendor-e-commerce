import { UserRepository } from "@/repository/user.repository";
import { ErrorHandler, getRedisClient, jwt, NotFoundError, ValidationError, z } from "@multi-vendor-e-commerce/common";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";
import bcrypt from "bcryptjs";

import { env } from "@/config/env";
import { ProductRepository } from "@/repository/product.repository";
import { SellerRepository } from "@/repository/seller.repository";
import Stripe from "stripe";
import { SellerVerifySchema } from "@/validation/seller.validation";
import { createShopSchema } from "@/validation/shop.validation";
import { ShopRepository } from "@/repository/shop.respository";

class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly productRepository: ProductRepository,
        private readonly sellerRepository: SellerRepository,
        private readonly shopRepository: ShopRepository,
        private readonly strip: Stripe
    ) { }

    async registerUser(email: string, name: string, userType: "user" | "seller" = "user") {
        const user = userType == "user" ?
            await this.userRepository.findUserByEmail(email) :
            await this.sellerRepository.findUserByEmail(email);
        if (user) {
            throw new ValidationError(`${userType == "user" ? "User" : ""} already exist with this email`)
        }
        await this._otpRestriction(email);
        await this._sendOtp(email, name, userType == "user" ? "user-activation-email" : "seller-activation-email");
    }

    async verifyUser(email: string, otp: number, password: string, name: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (user) {
            throw new ValidationError("User already exist with this email")
        }
        await this._verifyOtp(otp, email);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.create({
            email,
            name,
            password: hashedPassword
        })
        return newUser;
    }

    async verifySeller(body: z.infer<typeof SellerVerifySchema.shape.body>, userType: "seller") {
        const seller = await this.sellerRepository.findUserByEmail(body.name);
        if (seller) {
            throw new ValidationError("User already exist with this email")
        }
        await this._verifyOtp(Number(body.otp), body.email);
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newSeller = await this.sellerRepository.create({
            email: body.email,
            name: body.name,
            password: hashedPassword,
            country: body.country,
            phone_number: body.phone_number,
            followers: [],
            following: []
        })
        return newSeller;
    }

    async loginUser(email: string, password: string, userType: "user" | "seller" = "user") {
        const user = userType == "user" ? await this.userRepository.findUserByEmail(email) : await this.sellerRepository.findUserByEmail(email);
        if (!user) {
            throw new ValidationError(`${userType == "user" ? "User" : "Seller"} not found`)
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password!);
        if (!isPasswordMatch) {
            throw new ValidationError("Invalid password")
        }
        const accessToken = jwt.sign(
            { userId: user.id, role: userType == "user" ? 'user' : "seller" },
            env.JWT_SECRET as string,
            { expiresIn: env.JWT_EXPIRES_IN as string as unknown as number }
        );

        const refreshToken = jwt.sign(
            { userId: user.id, role: userType == "user" ? 'user' : "seller" },
            env.REFRESH_TOKEN_SECRET,
            { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as string as unknown as number }
        );
        return { user, accessToken, refreshToken };
    }

    async forgotPassword(email: string, userType: 'user' | 'seller' = "user") {
        const user = userType === 'user' && await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ValidationError(`${email} is not found`)
        }
        await this._trackOtpRequest(email)
        await this._otpRestriction(email)
        await this._sendOtp(email, user.name, userType === 'user' ? "user-forgot-password" : "seller-forgot-password")
    }

    async updatePassword(email: string, password: string, userType: "user" | "seller" = "user") {
        const user = await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ValidationError(`${email} is not found`)
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password!);
        if (isPasswordMatch) {
            throw new ValidationError("Password is not same as old")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.update({ email }, { password: hashedPassword })
    }

    async verifyForgotPasswordOtp(email: string, otp: number, userType: 'user' | 'seller' = "user") {
        const user = userType === 'user' && await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ValidationError(`${email} is not found`)
        }
        await this._verifyOtp(otp, email)
    }

    async createRefreshToken(refreshToken?: string) {
        if (!refreshToken) {
            throw new ErrorHandler("Refresh token is not found", 404)
        }

        const decode = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET as string) as { id: string, role: string };
        if (!decode || !decode.role || !decode.id) {
            throw new ValidationError("Forbidden! Invalid refresh Token")
        }
        const user = await this.userRepository.findById({ id: decode.id });
        if (!user) {
            throw new NotFoundError('Forbidden User/Seller not found');
        }

        const createNewRefreshToken = jwt.sign(
            { id: decode.id, role: decode.role },
            env.JWT_SECRET as string,
            { expiresIn: env.JWT_EXPIRES_IN as string as unknown as number }
        )

        return createNewRefreshToken;

    }

    async getUser(id: string) {
        const user = await this.userRepository.findById({ id });
        if (!user) {
            throw new ValidationError("user not found or invalidate payload")
        }
        if (user?.password) {
            const { password = null, ...safeUser } = user;
            return safeUser;
        }
        return user;
    }

    async createShop(data: z.infer<typeof createShopSchema.shape.body>) {
        const shopData = {
            name: data.name,
            category: data.category,
            opening_hours: data.opening_hour,
            seller: { connect: { id: data.sellerId } },
            address: data.address ?? "",
            bio: data.bio,
            website: data.website?.trim() || undefined,
        }
        await this.shopRepository.create(shopData);
        return true
    }

    async connectStripAccount(sellerId: string) {
        const seller = await this.sellerRepository.findById({ id: sellerId });
        if (!seller) {
            throw new ValidationError("seller is not found")
        }
        console.log(seller)
        const data = await this.strip.accounts.create({
            type: "express",
            email: seller.email,
            country: "GB",
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            }
        })
        console.log(data)
        await this.sellerRepository.update({
            id: seller.id
        }, {
            stripId: data.id
        })
        console.log(data)
        const accountLink = await this.strip.accountLinks.create({
            refresh_url: "http://localhost:3000/success",
            return_url: "http://localhost:3000/success",
            account: data.id,
            type: "account_onboarding"
        })
        return accountLink;
    }


    async _otpRestriction(email: string) {
        const redis = getRedisClient();

        if (await redis.get(`otp_lock:${email}`)) {
            throw new ValidationError("Due to multiple attempts, you are not allowed to send OTP. Please wait for 30 minutes to resend OTP")
        }

        if (await redis.get(`otp_spam_lock:${email}`)) {
            throw new ValidationError("Too many requests. Please wait for 1hr to resend OTP")
        }


        if (await redis.get(`otp_cool_down:${email}`)) {
            throw new ValidationError("Please wait for 1 minute to resend OTP")
        }
    }

    async _sendOtp(email: string, name: string, template: string) {
        const otp = crypto.randomInt(1000, 9999).toString();
        const redis = getRedisClient();

        await sendEmail(email, "Email is send to email", template, { otp, name });
        await redis.set(`otp:${email}`, otp, "EX", 300);
        await redis.set(`otp_cool_down:${email}`, otp, "EX", 60)
    }

    async _trackOtpRequest(email: string) {
        const redis = getRedisClient();
        let otpRequestCount = Number.parseInt((await redis.get(`otp_request_count:${email}`)) || "0");
        if (otpRequestCount >= 2) {
            await redis.set(`otp_spam_lock:${email}`, 'LOCKED', "EX", 3600);
            throw new ValidationError("Too many request")
        }
        await redis.incr(`otp_request_count:${email}`);
        await redis.expire(`otp_request_count:${email}`, 300);
    }

    async _verifyOtp(otp: number, email: string) {
        const redis = getRedisClient();
        const storedOtp = await redis.get(`otp:${email}`);
        if (!storedOtp) {
            throw new ValidationError("Invalid OTP")
        }
        const failedAttemptsKey = `failed_attempts:${email}`;
        const failedAttempts = Number.parseInt((await redis.get(failedAttemptsKey)) || "0");

        if (storedOtp !== otp.toString()) {
            if (failedAttempts >= 2) {
                await redis.set(`otp_lock:${email}`, 'LOCKED', "EX", 1800);
                await redis.del(failedAttemptsKey);
                throw new ValidationError("Too many attempts")
            }

        }
        await redis.del(`otp:${email}`);
        return true;
    }
}

export default UserService;
