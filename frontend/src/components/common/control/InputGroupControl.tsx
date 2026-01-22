/**
 * InputGroupController.tsx - Controlled InputGroup for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Supports addons (icons, text, buttons) at start/end
 * - Password visibility toggle
 * - Error message display
 */

import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface InputGroupControlProps<T extends FieldValues> {
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
  /** Additional class names for InputGroup container */
  className?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Auto complete attribute */
  autoComplete?: string;
  /** Required field indicator */
  required?: boolean;
  /** Icon or element at the start (left) */
  startAddon?: ReactNode;
  /** Icon or element at the end (right) */
  endAddon?: ReactNode;
}

function InputGroupControl<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  disabled,
  autoComplete,
  required,
  startAddon,
  endAddon,
}: InputGroupControlProps<T>) {
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

          {/* InputGroup with addons */}
          <InputGroup
            className={cn(
              "rounded-md",
              error && "border-destructive ring-1 ring-destructive/20",
              className,
            )}
            data-disabled={disabled}
          >
            {/* Start addon */}
            {startAddon && (
              <InputGroupAddon align="inline-start">
                <InputGroupText>{startAddon}</InputGroupText>
              </InputGroupAddon>
            )}

            {/* Input */}
            <InputGroupInput
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              aria-invalid={!!error}
            />

            {/* Password toggle or end addon */}
            {type === "password" ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <RiEyeOffLine className="h-4 w-4" />
                  ) : (
                    <RiEyeLine className="h-4 w-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            ) : endAddon ? (
              <InputGroupAddon align="inline-end">
                <InputGroupText>{endAddon}</InputGroupText>
              </InputGroupAddon>
            ) : null}
          </InputGroup>

          {/* Error message */}
          {error?.message && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export { InputGroupControl };
