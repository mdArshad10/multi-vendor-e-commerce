/**
 * SizeSelectorControl.tsx - Controlled Size Selector for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Multi-select size options
 * - Field, FieldLabel, FieldDescription, and FieldError support
 * - No custom size addition (fixed options only)
 */

import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
} from "@/components/ui/field";
import { RiCheckLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { ProductSize } from "@/shared/config/ProductSize";

interface SizeSelectorControlProps<T extends FieldValues> {
    /** Form control from useForm */
    control: Control<T>;
    /** Field name (must match schema) */
    name: Path<T>;
    /** Input label */
    label?: string;
    /** Field description (helper text) */
    description?: string;
    /** Additional class names */
    className?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Required field indicator */
    required?: boolean;
}

function SizeSelectorControl<T extends FieldValues>({
    control,
    name,
    label,
    description,
    className,
    required,
    disabled,
}: SizeSelectorControlProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                // Selected sizes from form field value
                const selectedSizes = (field.value as string[]) || [];

                // Toggle size selection
                const handleToggleSize = (size: string) => {
                    if (disabled) return;

                    if (selectedSizes.includes(size)) {
                        // Deselect size
                        field.onChange(selectedSizes.filter((s) => s !== size));
                    } else {
                        // Select size
                        field.onChange([...selectedSizes, size]);
                    }
                };

                return (
                    <Field data-invalid={!!error}>
                        {/* Label */}
                        {label && (
                            <FieldLabel
                                htmlFor={name}
                                className={cn(error && "text-destructive")}
                            >
                                {label} {required && <sup className="text-destructive">*</sup>}
                            </FieldLabel>
                        )}

                        {/* Description */}
                        {description && <FieldDescription>{description}</FieldDescription>}

                        {/* Size Options Grid */}
                        <div className="flex flex-wrap gap-2">
                            {ProductSize.map((size, index) => {
                                const isSelected = selectedSizes.includes(size);

                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleToggleSize(size)}
                                        className={cn(
                                            "relative min-w-[60px] h-11 px-4 rounded-md cursor-pointer border-2 flex items-center justify-center transition-all font-medium",
                                            isSelected
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-border bg-background hover:border-primary/50 hover:bg-accent",
                                            error && "border-destructive",
                                            disabled && "opacity-50 cursor-not-allowed",
                                            className,
                                        )}
                                        aria-label={`Size ${size}`}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                    >
                                        <span className="text-sm">{size}</span>

                                        {/* Checkmark for selected sizes */}
                                        {isSelected && (
                                            <RiCheckLine
                                                size={16}
                                                className="ml-1.5 text-primary-foreground"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Error message */}
                        {error?.message && <FieldError>{error.message}</FieldError>}
                    </Field>
                );
            }}
        />
    );
}

export { SizeSelectorControl };
