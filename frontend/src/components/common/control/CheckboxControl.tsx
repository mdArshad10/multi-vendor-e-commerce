/**
 * CheckboxController.tsx - Controlled Checkbox for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Label support with clickable area
 * - Error message display
 */

import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxControlProps<T extends FieldValues> {
  /** Form control from useForm */
  control: Control<T>;
  /** Field name (must match schema) */
  name: Path<T>;
  /** Checkbox label */
  label: string;
  /** Additional class names for container */
  className?: string;
  /** Disable the checkbox */
  disabled?: boolean;
}

function CheckboxControl<T extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
}: CheckboxControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-1", className)}>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={cn(error && "border-destructive")}
            />
            <Label
              htmlFor={name}
              className={cn(
                "text-sm font-normal cursor-pointer",
                error && "text-destructive",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {label}
            </Label>
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

export { CheckboxControl };
