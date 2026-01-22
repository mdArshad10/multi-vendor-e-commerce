/**
 * InputController.tsx - Controlled Input for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Password visibility toggle with icon
 * - Error message display
 * - Supports all Input props
 */

import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface InputControllerProps<T extends FieldValues> {
  /** Form control from useForm */
  control: Control<T>;
  /** Field name (must match schema) */
  name: Path<T>;
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input type (text, email, password, etc.) */
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  /** Additional class names */
  className?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Auto complete attribute */
  autoComplete?: string;
  required?: boolean;
}

function InputController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  disabled,
  autoComplete,
  required,
}: InputControllerProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine actual input type (for password toggle)
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <Label htmlFor={name} className={cn(error && "text-destructive")}>
              {label} {required && <sup className="text-destructive">*</sup>}
            </Label>
          )}

          {/* Input with optional password toggle */}
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              className={cn(
                "h-11",
                type === "password" && "pr-10",
                error && "border-destructive focus-visible:ring-destructive",
                className,
              )}
            />

            {/* Password visibility toggle */}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-muted-foreground hover:text-foreground
                  transition-colors
                "
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <RiEyeOffLine className="h-5 w-5" />
                ) : (
                  <RiEyeLine className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Error message */}
          {error?.message && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export { InputController };
