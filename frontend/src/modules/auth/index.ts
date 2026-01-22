/**
 * Auth Module - Public API
 * Barrel export for clean imports
 */

// Export hooks (TanStack Query version)
export {
    useCurrentUser,
    useLogin,
    useRegister,
    useLogout,
    useRequestPasswordReset,
    useResetPassword,
    authKeys
} from "./api/auth.queries";

// Export service functions (for direct use if needed)
export * as authService from "./api/auth.service";


// Export route components
export { LoginPage } from "./routes/LoginPage";
export { RegisterPage } from "./routes/RegisterPage";
export { ForgotPasswordPage } from "./routes/ForgotPasswordPage";
export { OtpVerificationCard } from "./components/OtpVerificationCard";
