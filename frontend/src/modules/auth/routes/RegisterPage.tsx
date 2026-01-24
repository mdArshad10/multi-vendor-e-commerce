/**
 * RegisterPage.tsx - Registration Page Component
 *
 * Two-step flow:
 * 1. Registration form (email, name, password)
 * 2. OTP verification
 */

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RiEyeLine, RiEyeOffLine, RiGoogleFill } from "@remixicon/react";
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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputControl } from "@/components/common/control";
import { useRegister, useVerifyUser } from "../api/auth.queries";
import { toast } from "sonner";

type Step = "register" | "verify-otp";

const RegisterPageSchema = yup.object({
  name: yup.string().trim().required(),
  password: yup
    .string()
    .trim()
    .min(6, "password must be greater then 6 characters")
    .max(50, "password must be less then 50 characters")
    .required(),
  email: yup.string().email().required(),
});

export function RegisterPage() {
  const [step, setStep] = useState<Step>("register");

  const form = useForm({
    resolver: yupResolver(RegisterPageSchema),
  });

  const { mutateAsync: registerUser, isPending } = useRegister();
  const { mutateAsync: verifyUser } = useVerifyUser();

  const handleSubmit = async (
    data: yup.InferType<typeof RegisterPageSchema>,
  ) => {
    console.log(data);

    try {
      const resp = await registerUser(data);
      if (resp.success) {
        setStep("verify-otp");
        toast.success(resp.message);
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const resp = await verifyUser({
        name: form.getValues("name"),
        password: form.getValues("password"),
        email: form.getValues("email"),
        otp,
      });
      if (resp.success) {
        toast.success(resp.message);
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleResendOtp = async () => {
    // TODO: Call resend OTP API
    console.log("Resending OTP to");

    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  // Show OTP verification step
  if (step === "verify-otp") {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <OtpVerificationCard
          email={form.getValues("email")}
          type="register"
          onVerify={handleVerifyOtp}
          onResendOtp={handleResendOtp}
          onBack={() => setStep("register")}
        />
      </div>
    );
  }

  // Registration form
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-2"
            onClick={handleGoogleLogin}
          >
            <RiGoogleFill className="h-5 w-5 text-[#4285F4]" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Name Field */}
            {/* <div className="space-y-2">
              <Label htmlFor="name">
                Name <sup className="text-destructive">*</sup>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="h-11"
              />
            </div> */}
            <InputControl
              control={form.control}
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              required
              className="h-11"
            />

            {/* Email Field */}
            <InputControl
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              className="h-11"
            />

            {/* Password Field */}
            <InputControl
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="name@example.com"
              required
              className="h-11"
            />

            {/* Password Field */}
            {/* <div className="space-y-2">
              <Label htmlFor="password">
                Password <sup className="text-destructive">*</sup>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-muted-foreground hover:text-foreground
                    transition-colors
                  "
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <RiEyeOffLine className="h-5 w-5" />
                  ) : (
                    <RiEyeLine className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div> */}

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;
