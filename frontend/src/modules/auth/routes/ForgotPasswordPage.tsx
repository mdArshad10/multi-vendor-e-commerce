/**
 * ForgotPasswordPage.tsx - Forgot Password Flow
 *
 * Two-step flow:
 * 1. Enter email to receive OTP
 * 2. Verify OTP and reset password
 */

import { useState } from "react";
import { Link } from "@tanstack/react-router";
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
  useVerifyForgotPasswordOtp,
} from "../api/auth.queries";

type Step = "email" | "verify-otp" | "reset-password";

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const { mutateAsync, isPending, isSuccess, isError } = useForgotPassword();
  const { mutateAsync: verifyOtp, isSuccess: isVerifyOtpSuccess } =
    useVerifyForgotPasswordOtp();

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() == "") {
      toast.message("plz fill the email");
      return;
    }
    try {
      const resp = await mutateAsync(email);
      if (isSuccess) {
        toast.success(resp.message);
        setStep("verify-otp");
      }
    } catch (error) {
      const err = error instanceof Error ? error : (error as Error);
      if (isError) {
        toast.error(err.message);
      }
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    console.log("Verify OTP:", otp);
    if (otp.length !== 4 || otp.trim() == "") {
      toast.warning("plz enter the valid otp");
      return;
    }

    try {
      const resp = await verifyOtp({ otp, email });
      if (isVerifyOtpSuccess) {
        toast.success(resp.message);
        setStep("reset-password");
      }
    } catch (error) {
      const err = error instanceof Error ? error : (error as Error);
      if (isError) {
        toast.error(err.message);
      }
    }
  };

  const handleResendOtp = async () => {
    // TODO: Call resend OTP API
    console.log("Resending OTP to:", email);

    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Show OTP verification step
  if (step === "verify-otp") {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <OtpVerificationCard
          email={email}
          type="forgot-password"
          onVerify={handleVerifyOtp}
          onResendOtp={handleResendOtp}
          onBack={() => setStep("email")}
        />
      </div>
    );
  }

  // TODO: Add reset password form step
  if (step === "reset-password") {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              TODO: Add new password form here
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Email form
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
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
    </div>
  );
}

export default ForgotPasswordPage;
