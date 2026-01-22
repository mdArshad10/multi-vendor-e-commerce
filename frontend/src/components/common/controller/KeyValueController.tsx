

/**
 * InputController.tsx - Controlled Input for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Password visibility toggle with icon
 * - Field, FieldLabel, FieldDescription, and FieldError support
 * - Supports all Input props
 */

import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InputControllerProps<T extends FieldValues> {
    /** Form control from useForm */
    control: Control<T>;
    /** Field name (must match schema) */
    name: Path<T>;
    /** Input label */
    label?: string;
    /** Field description (helper text) */
    description?: string;
    /** Placeholder text */
    Keyplaceholder?: string;
    valuePlacehodler?: string
    /** Disable the input */
    disabled?: boolean;
    /** Required field indicator */
    required?: boolean;
}

function InputController<T extends FieldValues>({
    control,
    name,
    label,
    description,
    Keyplaceholder,
    valuePlacehodler,
    required,
}: InputControllerProps<T>) {
    const [object, setObject] = useState<Array<{ key: string; value: string }>>([{}])
    return (
        <div className="flex gap-2">
            { }
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Field data-invalid={!!error}>
                        {/* Label */}
                        {label && (
                            <FieldLabel htmlFor={name} className={cn(error && "text-destructive")}>
                                {label} {required && <sup className="text-destructive">*</sup>}
                            </FieldLabel>
                        )}

                        {/* Description */}
                        {description && <FieldDescription>{description}</FieldDescription>}

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
                                    className
                                )}
                                aria-invalid={!!error}
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
                        {error?.message && <FieldError>{error.message}</FieldError>}
                    </Field>
                )}
            />
            <Button
                type="button"

            >
                Add
            </Button>
        </div>
    );
}

export { InputController };
