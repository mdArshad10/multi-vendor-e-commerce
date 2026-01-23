/**
 * Auth Service Layer
 * 
 * Platform-independent API functions that return Promises.
 * These can be used with TanStack Query, RTK Query, or plain fetch.
 */
// 
import { apiClient } from "@/shared/api/api-client";
import type { LoginRequest, Response, ResponseLoginData } from "../types/auth.type";



/**
 * Login user
 */
export async function loginUser(credentials: LoginRequest): Promise<Response<ResponseLoginData>> {
    return apiClient.post<Response<ResponseLoginData>>("/auth/login", credentials);
}

/**
 * Register new user
 */
export async function registerUser(data: any): Promise<User> {
    return apiClient.post<User>("/auth/register", data);
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
export async function resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>("/auth/reset-password", { token, newPassword });
}

