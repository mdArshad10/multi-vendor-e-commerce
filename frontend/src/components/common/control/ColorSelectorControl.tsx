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
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { RiAddLine, RiDeleteBinLine, RiCheckLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { productColor } from "@/shared/config/productColor";
import { Button } from "@/components/ui/button";

interface ColorSelectorControlProps<T extends FieldValues> {
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

function ColorSelectorControl<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  required,
}: ColorSelectorControlProps<T>) {
  // Track available color options (default + custom added colors)
  const [availableColors, setAvailableColors] = useState<string[]>(productColor);
  const [addColor, setAddColor] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        // Selected colors from form field value
        const selectedColors = (field.value as string[]) || [];

        // Toggle color selection
        const handleToggleColor = (color: string) => {
          if (selectedColors.includes(color)) {
            // Deselect color
            field.onChange(selectedColors.filter((c) => c !== color));
          } else {
            // Select color
            field.onChange([...selectedColors, color]);
          }
        };

        // Add a new custom color to available options
        const handleAddColor = (newColor: string) => {
          if (!availableColors.includes(newColor)) {
            setAvailableColors([...availableColors, newColor]);
          }
          setAddColor(false);
        };

        // Remove a custom color from available options
        const handleRemoveColor = (color: string) => {
          // Remove from available colors
          setAvailableColors(availableColors.filter((c) => c !== color));
          // Also remove from selected if it was selected
          if (selectedColors.includes(color)) {
            field.onChange(selectedColors.filter((c) => c !== color));
          }
        };

        // Check if a color is from default palette (cannot be deleted)
        const isDefaultColor = (color: string) => productColor.includes(color);

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

            {/* Color Palette Grid with Add Button */}
            <div
              className={cn(
                "flex gap-2",
                availableColors.length < 8 ? "items-center" : "items-start",
              )}
            >
              <div className="grid grid-cols-8">
                {availableColors.map((color, index) => {
                  const isSelected = selectedColors.includes(color);
                  const isCustom = !isDefaultColor(color);

                  return (
                    <div key={index} className="relative group">
                      {/* Color Circle */}
                      <div
                        onClick={() => handleToggleColor(color)}
                        style={{ backgroundColor: color }}
                        className={cn(
                          "h-11 w-11 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all",
                          isSelected
                            ? "border-primary ring-2 ring-primary/50"
                            : "border-border hover:border-primary/50",
                          error && "border-destructive",
                        )}
                        aria-label={`Color ${color}`}
                      >
                        {/* Checkmark for selected colors */}
                        {isSelected && (
                          <div className="bg-primary rounded-full p-0.5">
                            <RiCheckLine size={16} className="text-primary-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Delete button for custom colors only */}
                      {isCustom && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveColor(color);
                          }}
                          className="absolute -top-1 -right-1 cursor-pointer z-10 bg-background rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <RiDeleteBinLine size={14} className="text-destructive" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add Color Button */}
              <Button
                type="button"
                onClick={() => setAddColor(true)}
                variant="outline"
                size="icon"
                className="h-11 w-11 flex-shrink-0"
              >
                <RiAddLine />
              </Button>
            </div>

            {/* Add New Color Input */}
            {addColor && (
              <Input
                id={`${name}-new`}
                type="color"
                defaultValue="#000000"
                onChange={(e) => handleAddColor(e.target.value)}
                onBlur={() => setAddColor(false)}
                className={cn(
                  "h-11 w-11 rounded-full cursor-pointer overflow-hidden border-2 p-0",
                  error && "border-destructive focus-visible:ring-destructive",
                  className,
                )}
                aria-invalid={!!error}
                autoFocus
              />
            )}

            {/* Error message */}
            {error?.message && <FieldError>{error.message}</FieldError>}
          </Field>
        );
      }}
    />
  );
}

export { ColorSelectorControl };
