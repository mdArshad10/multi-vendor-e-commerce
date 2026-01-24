/**
 * ForgotPasswordPage.tsx - Forgot Password Flow
 *
 * Two-step flow:
 * 1. Enter email to receive OTP
 * 2. Verify OTP and reset password
 */

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { RiMailLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpVerificationCard } from "../components/OtpVerificationCard";
import { toast } from "sonner";
import {
  useForgotPassword,
  useResetPassword,
  useVerifyForgotPasswordOtp,
} from "../api/auth.queries";

type Step = "email" | "verify-otp" | "reset-password";

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useForgotPassword();
  const { mutateAsync: verifyOtp } = useVerifyForgotPasswordOtp();
  const { mutateAsync: restPassword } = useResetPassword();

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() == "") {
      toast.message("plz fill the email");
      return;
    }
    try {
      const resp = await mutateAsync(email);
      if (resp.success) {
        toast.success(resp.message);
        setStep("verify-otp");
      }
    } catch (error) {
      const err = error instanceof Error ? error : (error as Error);
      toast.error(err.message);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const resp = await verifyOtp({ otp, email });
      if (resp.success) {
        toast.success(resp.message);
        setStep("reset-password");
      }
    } catch (error) {
      const err = error instanceof Error ? error : (error as Error);
      toast.error(err.message);
    }
  };

  const handleResendOtp = async () => {
    // TODO: Call resend OTP API
    console.log("Resending OTP to:", email);

    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleResetPassword = async () => {
    try {
      if (password.trim() !== "") {
        return;
      }

      const resp = await restPassword({ email, password });
      if (resp.success) {
        toast.success(resp.message);
        navigate({ to: "/auth/login", replace: true });
      }
    } catch (error) {
      const err = error instanceof Error ? error : (error as Error);
      toast.error(err.message);
    }
  };

  const ForgotPasswordComp = (step: string) => {
    // Show OTP verification step
    if (step == "verify-otp") {
      return (
        <OtpVerificationCard
          email={email}
          type="forgot-password"
          onVerify={handleVerifyOtp}
          onResendOtp={handleResendOtp}
          onBack={() => setStep("email")}
        />
      );
    }

    if (step == "reset-password") {
      return (
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="eg. password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isPending || password.trim() === ""}
                onClick={handleResetPassword}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Password Reset...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <RiMailLine className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a code to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmitEmail} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending code...
                </span>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>

          {/* Back to login */}
          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Email form
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      {ForgotPasswordComp(step)}
    </div>
  );
}

export default ForgotPasswordPage;
