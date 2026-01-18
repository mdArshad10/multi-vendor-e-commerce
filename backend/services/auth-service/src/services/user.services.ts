import { UserRepository } from "@/repository/user.repository";
import { getRedisClient, jwt, ValidationError } from "@multi-vendor-e-commerce/common";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";
import bcrypt from "bcryptjs";

import { env } from "@/config/env";

class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async registerUser(email: string, name: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (user) {
            throw new ValidationError("User already exist with this email")
        }
        await this._otpRestriction(email);
        await this._sendOtp(email, name, "user-activation-email");
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

    async loginUser(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new ValidationError("User not found")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password!);
        if (!isPasswordMatch) {
            throw new ValidationError("Invalid password")
        }
        const accessToken = jwt.sign(
            { userId: user.id, role: 'user' },
            env.JWT_SECRET as string,
            { expiresIn: env.JWT_EXPIRES_IN as string as unknown as number }
        );

        const refreshToken = jwt.sign(
            { userId: user.id, role: 'user' },
            env.REFRESH_TOKEN_SECRET,
            { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as string as unknown as number }
        );
        return { user, accessToken, refreshToken };
    }

    async forgotPassword(email: string, userType: 'user' | 'seller') {
        const user = userType === 'user' && await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ValidationError(`${email} is not found`)
        }
        await this._trackOtpRequest(email)
        await this._otpRestriction(email)
        await this._sendOtp(email, user.name, "user-forgot-password")
    }

    async updatePassword(email: string, password: string) {
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

    async verifyForgotPasswordOtp(email: string, otp: number, userType: 'user' | 'seller') {
        const user = userType === 'user' && await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ValidationError(`${email} is not found`)
        }
        await this._verifyOtp(otp, email)
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
