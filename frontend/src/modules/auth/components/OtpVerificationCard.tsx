/**
 * OtpVerificationCard.tsx - Reusable OTP Verification Component
 *
 * Used for:
 * - Email verification after registration
 * - Forgot password verification
 *
 * Features:
 * - 6-digit OTP input
 * - Auto-focus next input
 * - Verify button with loading state
 * - Resend OTP with countdown timer
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiMailCheckLine, RiLockLine } from "@remixicon/react";

interface OtpVerificationCardProps {
  /** Email address to show in description */
  email: string;
  /** Type of verification (affects title/description) */
  type: "register" | "forgot-password";
  /** Callback when OTP is verified successfully */
  onVerify: (otp: string) => Promise<void>;
  /** Callback to resend OTP */
  onResendOtp: () => Promise<void>;
  /** Callback to go back to previous step */
  onBack?: () => void;
  /** Number of OTP digits */
  otpLength?: number;
  /** Resend cooldown in seconds */
  resendCooldown?: number;
}

function OtpVerificationCard({
  email,
  type,
  onVerify,
  onResendOtp,
  onBack,
  otpLength = 6,
  resendCooldown = 60,
}: OtpVerificationCardProps) {
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(resendCooldown);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace - move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = pastedData.slice(0, otpLength).split("");

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[otpLength - 1]?.focus();
    }
  };

  const handleVerify = useCallback(async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== otpLength) return;

    setIsVerifying(true);
    try {
      await onVerify(otpValue);
    } finally {
      setIsVerifying(false);
    }
  }, [otp, otpLength, onVerify]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResendOtp();
      setCountdown(resendCooldown);
      setCanResend(false);
      setOtp(new Array(otpLength).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const config = {
    register: {
      title: "Verify Your Email",
      description: `We've sent a ${otpLength}-digit code to`,
      icon: <RiMailCheckLine className="h-12 w-12 text-primary" />,
    },
    "forgot-password": {
      title: "Reset Password",
      description: `Enter the ${otpLength}-digit code sent to`,
      icon: <RiLockLine className="h-12 w-12 text-primary" />,
    },
  };

  const { title, description, icon } = config[type];

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="space-y-1">
          <p>{description}</p>
          <p className="font-medium text-foreground">{email}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-12 text-center text-lg font-semibold"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full h-11"
          disabled={!isOtpComplete || isVerifying}
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </Button>

        {/* Resend OTP */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Didn't receive the code?{" "}
          </span>
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-primary font-medium hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <span className="text-muted-foreground">
              Resend in{" "}
              <span className="font-medium text-foreground">{countdown}s</span>
            </span>
          )}
        </div>

        {/* Back Button */}
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="w-full">
            ← Back
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export { OtpVerificationCard };
