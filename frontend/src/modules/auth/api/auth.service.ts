/**
 * Auth Service Layer
 * 
 * Platform-independent API functions that return Promises.
 * These can be used with TanStack Query, RTK Query, or plain fetch.
 */
// 
import { apiClient } from "@/shared/api/api-client";
import type { LoginRequest, RegisterRequest, ResponseLoginData, SellerUser, User, VerifyUserRequest } from "../types/auth.type";
import type { SellerRegistrationData, ShopCreationData } from "../components/SellerRegisterComponent";
import type { Response } from "@/types/Response.type";



/**
 * Login user
 */
export async function loginUser(credentials: LoginRequest): Promise<Response<ResponseLoginData>> {
    return apiClient.post<Response<ResponseLoginData>>("/auth/login", credentials);
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterRequest): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/register", data);
}

export async function verifyUser(data: VerifyUserRequest): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/verify", data);
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
    return apiClient.post<void>("/auth/logout");
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/me");
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<{ accessToken: string }> {
    return apiClient.post<{ accessToken: string }>("/auth/refresh");
}

/**
 * Request password reset
 */
export async function forgotPassword(email: string): Promise<Response<null>> {
    return apiClient.post<Response<null>>("/auth/forgot-password", { email });
}

/**
 *  verify forgot password OTP
 */
export async function verifyForgotPasswordOtp(otp: string, email: string): Promise<Response<null>> {
    return apiClient.post<Response<null>>("/auth/verify-forgot-password-otp", { otp, email });
}

/**
 * Reset password with token
 */
export async function resetPassword(email: string, password: string): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/update-password", { email, password });
}

export async function registerSeller(data: RegisterRequest): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/register-seller", data);
}

export async function verifySeller(data: SellerRegistrationData & { otp: string }): Promise<Response<SellerUser>> {
    return apiClient.post<Response<SellerUser>>("/auth/verify-seller", data);
}

export async function createShop(data: ShopCreationData & { sellerId: string }): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/create-shop", data);
}

export async function connectBank(sellerId: string): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/connect-bank", { sellerId });
}


export async function loginSeller(data: LoginRequest): Promise<Response<void>> {
    return apiClient.post<Response<void>>("/auth/login-seller", data);
}

