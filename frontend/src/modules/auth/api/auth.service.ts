/**
 * Auth Service Layer
 * 
 * Platform-independent API functions that return Promises.
 * These can be used with TanStack Query, RTK Query, or plain fetch.
 */
// 
import { apiClient } from "@/shared/api/api-client";
// import type { LoginRequest, LoginResponse, RegisterRequest, User } from "../types";

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: "customer" | "vendor";
}

interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    role: "customer" | "vendor" | "admin";
    avatar?: string;
    createdAt: string;
}

/**
 * Login user
 */
export async function loginUser(credentials: any): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", credentials);
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
export async function requestPasswordReset(email: string): Promise<void> {
    return apiClient.post<void>("/auth/forgot-password", { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>("/auth/reset-password", { token, newPassword });
}
