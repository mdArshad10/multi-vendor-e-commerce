/**
 * LoginPage.tsx - Login Page Component
 *
 * Centered login card with:
 * - Google OAuth
 * - Email/Password form
 * - Remember me & Forgot password
 */

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../api/auth.queries";
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

  const { mutateAsync, isSuccess, isPending, isError } = useLogin();

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

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Email Field */}
            <div className="space-y-2">
              {/* <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11"
              /> */}
              <InputControl
                control={form.control}
                name="email"
                label="Email"
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="h-11"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <InputControl
                  control={form.control}
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="h-11 pr-10"
                />

                {/* <Button
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
                </Button> */}
              </div>
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
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
