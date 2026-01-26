/**
 * SellerLoginPage.tsx - Seller Login Page Component
 *
 * Split-screen design with:
 * - Left panel: Seller-focused branding & testimonials
 * - Right panel: Login form with Google OAuth
 */

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  RiGoogleFill,
  RiStoreLine,
  RiLineChartLine,
  RiSecurePaymentLine,
  RiCustomerService2Line,
  RiStarFill,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginSeller } from "../api/auth.queries";
import { toast } from "sonner";
import { InputControl } from "@/components/common/control";

const loginSchema = yup.object({
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be not less that 6 character")
    .max(50, "Password must not more that 50 character")
    .required(),
});

export function LoginPage() {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [rememberMe, setRememberMe] = useState(false);

  const { mutateAsync, isSuccess, isPending, isError } = useLoginSeller();

  const handleSubmit = async (data: yup.InferType<typeof loginSchema>) => {
    try {
      await mutateAsync(data);

      if (isSuccess) {
        toast.success("Login successfully");
      }
    } catch (error: unknown) {
      const err = error instanceof Error ? error : (error as Error);
      if (isError) {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  const features = [
    {
      icon: RiLineChartLine,
      title: "Analytics Dashboard",
      description: "Track your sales and performance in real-time",
    },
    {
      icon: RiSecurePaymentLine,
      title: "Secure Payments",
      description: "Fast and secure payment processing",
    },
    {
      icon: RiCustomerService2Line,
      title: "24/7 Support",
      description: "Dedicated seller support team",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <RiStoreLine className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Seller Portal</h2>
              <p className="text-sm text-white/70">Multi-Vendor Marketplace</p>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                Grow Your
                <br />
                Business With Us
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                Join thousands of successful sellers and reach millions of
                customers worldwide.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-colors"
                >
                  <div className="p-2 bg-white/20 rounded-lg shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-white/70">Active Sellers</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-3xl font-bold">1M+</p>
                <p className="text-sm text-white/70">Products Sold</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-3xl font-bold">99%</p>
                <p className="text-sm text-white/70">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <RiStarFill key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/90 italic mb-4">
              "This platform has transformed my business. The seller tools are
              incredible and the support team is always there when I need them."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                JD
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-white/60">Electronics Store Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <RiStoreLine className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Seller Portal</h2>
              <p className="text-sm text-muted-foreground">
                Multi-Vendor Marketplace
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, Seller!
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your store and track your sales.
            </p>
          </div>

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 gap-3 text-base font-medium hover:bg-accent transition-all duration-200"
            onClick={handleGoogleLogin}
          >
            <RiGoogleFill className="h-5 w-5 text-[#4285F4]" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <InputControl
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="seller@example.com"
                required
                autoComplete="email"
                className="h-12"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <InputControl
                control={form.control}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="h-12"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Remember me
                </Label>
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary font-medium hover:underline underline-offset-4 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign In to Seller Portal"
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground">
            Don't have a seller account?{" "}
            <Link
              to="/auth/seller-register"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Register as Seller
            </Link>
          </p>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <RiSecurePaymentLine className="h-4 w-4" />
                <span>SSL Secured</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <RiCustomerService2Line className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
