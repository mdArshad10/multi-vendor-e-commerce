/**
 * InputController.tsx - Controlled Input for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Password visibility toggle with icon
 * - Field, FieldLabel, FieldDescription, and FieldError support
 * - Supports all Input props
 */

import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { productColor } from "@/shared/config/productColor";
import { Button } from "@/components/ui/button";

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
    placeholder?: string;
    /** Input type (text, email, password, etc.) */
    type?: "text" | "email" | "password" | "number" | "tel" | "url";
    /** Additional class names */
    className?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Auto complete attribute */
    autoComplete?: string;
    /** Required field indicator */
    required?: boolean;
}

function ColorSelectorController<T extends FieldValues>({
    control,
    name,
    label,
    description,
    className,
    required,
}: InputControllerProps<T>) {

    const [selectedColor, setSelectedColor] = useState<Array<string>>(productColor);
    const [addColor, setAddColor] = useState<boolean>(false);

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

                    {/* Input with optional password toggle */}
                    <div className={cn("flex gap-2", selectedColor.length < 8 ? "items-center" : "item-start")}>
                        <div className="grid grid-cols-8 gap-2">
                            {selectedColor.map((color, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <Input
                                            {...field}
                                            id={name}
                                            type="color"
                                            value={color}
                                            className={cn(
                                                "h-11 w-11 rounded-full cursor-pointer overflow-hidden border-2 p-0",
                                            )}
                                            aria-invalid={!!error}
                                        />
                                        <div

                                            onClick={() => setSelectedColor(selectedColor.filter((_, i) => i !== index))}
                                            className="absolute -top-1 -right-1 cursor-pointer z-10"
                                        >
                                            <RiDeleteBinLine size={14} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Button
                            type="button"
                            onClick={() => setAddColor(true)}
                            variant="outline"
                            size="icon"
                            className="h-11 w-11"
                        >
                            <RiAddLine />
                        </Button>

                    </div>
                    {addColor && (
                        <Input
                            {...field}
                            id={name}
                            type="color"
                            value={""}
                            onChange={(e) => {
                                setSelectedColor([...selectedColor, e.target.value]);
                                setAddColor(false);
                            }}
                            className={cn(
                                "h-11 w-11 rounded-full cursor-pointer overflow-hidden border-2 p-0",
                                error && "border-destructive focus-visible:ring-destructive",
                                className
                            )}
                            aria-invalid={!!error}
                        />
                    )}

                    {/* Error message */}
                    {error?.message && <FieldError>{error.message}</FieldError>}
                </Field>
            )}
        />
    );
}

export { ColorSelectorController };
