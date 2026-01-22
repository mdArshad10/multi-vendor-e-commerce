/**
 * SelectController.tsx - Controlled Select for react-hook-form
 *
 * Features:
 * - Works with react-hook-form Controller
 * - Field, FieldLabel, FieldDescription, and FieldError support
 * - Async data fetching with loader
 * - Supports static data or async function for options
 */

import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

/** Option format for select items */
export interface SelectOption {
  label: string;
  value: string;
}

/** Async function type that returns options */
export type AsyncOptionsFn = () => Promise<SelectOption[]>;

interface SelectControlProps<T extends FieldValues> {
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
  /** Additional class names */
  className?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Static options data */
  data?: SelectOption[];
  /** Async function to fetch options (returns { label, value }[]) */
  asyncFn?: AsyncOptionsFn;
  /** Callback when async fetch fails */
  onError?: (error: Error) => void;
}

function SelectControl<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  className,
  disabled,
  data,
  required,
  asyncFn,
  onError,
}: SelectControlProps<T>) {
  const [options, setOptions] = useState<SelectOption[]>(data || []);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch options from async function
  useEffect(() => {
    if (!asyncFn) {
      // If static data is provided, use it
      if (data) {
        setOptions(data);
      }
      return;
    }

    let isMounted = true;

    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const result = await asyncFn();
        if (isMounted) {
          setOptions(result);
        }
      } catch (error) {
        if (isMounted) {
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOptions();

    return () => {
      isMounted = false;
    };
  }, [asyncFn, data, onError]);

  // Update options when static data changes
  useEffect(() => {
    if (!asyncFn && data) {
      setOptions(data);
    }
  }, [data, asyncFn]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
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

          {/* Select with loader */}
          <div className="relative">
            <Select
              disabled={disabled || isLoading}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className={cn(
                  "w-full",
                  error && "border-destructive focus-visible:ring-destructive",
                  className,
                )}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                ) : (
                  <SelectValue placeholder={placeholder} />
                )}
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : options.length === 0 ? (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No options available
                  </div>
                ) : (
                  options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Error message */}
          {error?.message && <FieldError>{error.message}</FieldError>}
        </Field>
      )}
    />
  );
}

export { SelectControl };
