/**
 * TanStack Query Hooks for Auth
 * 
 * This layer connects TanStack Query to the service layer.
 * To switch to RTK Query, create auth.rtk.ts instead.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from "./auth.service";
import type { LoginRequest, RegisterRequest, VerifyUserRequest } from "../types/auth.type";
import type { SellerRegistrationData, ShopCreationData } from "../components/SellerRegisterComponent";

/**
 * Query Keys
 * Centralized for cache invalidation
 */
export const authKeys = {
    all: ["auth"] as const,
    seller: ["seller"] as const,
    currentUser: () => [...authKeys.all, "currentUser"] as const,
    currentSeller: () => [...authKeys.seller, "currentSeller"] as const
};

/**
 * Get current user (query)
 */
export function useCurrentUser() {
    return useQuery({
        queryKey: authKeys.currentUser(),
        queryFn: authService.getCurrentUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}

/**
 * Login mutation
 */
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => authService.loginUser(credentials),
        onSuccess: () => {
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        },
    });
}

/**
 * Register mutation
 */
export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.registerUser(data),
    });
}

/**
 * Register mutation
 */
export function useRegisterSeller() {
    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.registerSeller(data),
    });
}

export function useVerifySeller() {
    return useMutation({
        mutationFn: (data: SellerRegistrationData & { otp: string }) => authService.verifySeller(data),
    });
}

export function useCreateShop() {
    return useMutation({
        mutationFn: (data: ShopCreationData & { sellerId: string }) => authService.createShop(data),
    });
}

export function useLoginSeller() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: LoginRequest) => authService.loginSeller(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        }
    });
}


export function useConnectBank() {
    return useMutation({
        mutationFn: (sellerId: string) => authService.connectBank(sellerId),
    });
}

export function useVerifyUser() {
    return useMutation({
        mutationFn: (data: VerifyUserRequest) => authService.verifyUser(data),
    });
}

/**
 * Logout mutation
 */
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logoutUser,
        onSuccess: () => {
            // Clear all auth-related cache
            queryClient.clear();
        },
    });
}

/**
 * Request password reset mutation
 */
export function useForgotPassword() {
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
    });
}

/**
 * verify password opt
 */
export function useVerifyForgotPasswordOtp() {
    return useMutation({
        mutationFn: ({ otp, email }: { otp: string, email: string }) => authService.verifyForgotPasswordOtp(otp, email),
    });
}

/**
 * Reset password mutation
 */
export function useResetPassword() {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authService.resetPassword(email, password),
    });
}

