/**
 * TextareaController.tsx - Controlled Textarea for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Field, FieldLabel, and FieldDescription support
 * - Error message display
 * - Supports all Textarea props
 */

import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface TextareaControllerProps<T extends FieldValues> {
    /** Form control from useForm */
    control: Control<T>;
    /** Field name (must match schema) */
    name: Path<T>;
    /** Field label */
    label?: string;
    /** Field description (helper text) */
    description?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Additional class names */
    className?: string;
    /** Disable the textarea */
    disabled?: boolean;
    /** Required field indicator */
    required?: boolean;
    /** Number of rows */
    rows?: number;
    /** Maximum length */
    maxLength?: number;
}

function TextareaController<T extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder,
    className,
    disabled,
    required,
    rows = 4,
    maxLength,
}: TextareaControllerProps<T>) {
    return (
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

                    {/* Textarea */}
                    <Textarea
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                        maxLength={maxLength}
                        className={cn(
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        aria-invalid={!!error}
                    />

                    {/* Error message */}
                    {error?.message && <FieldError>{error.message}</FieldError>}
                </Field>
            )}
        />
    );
}

export { TextareaController };
