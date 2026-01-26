/**
 * CustomPropertiesControl.tsx - Key with Multiple Values Control
 *
 * Features:
 * - Works with react-hook-form Controller
 * - One key can have multiple values (like tags)
 * - Add/remove values for each key
 * - Add/remove entire key-values pairs
 * - Field, FieldLabel, FieldError support
 */

import { Controller, useFieldArray } from "react-hook-form";
import type { ArrayPath, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RiAddCircleLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAddLine,
} from "@remixicon/react";
import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface CustomPropertiesControlProps<T extends FieldValues> {
  /** Form control from useForm */
  control: Control<T>;
  /** Field name (must match schema) - expects array of { key: string, values: string[] } */
  name: ArrayPath<T>;
  /** Controller name for accessing nested paths */
  controlName: string;
  /** Input label */
  label?: string;
  /** Description for add button */
  addDescription?: string;
  /** Placeholder for key input */
  keyPlaceholder?: string;
  /** Placeholder for value input */
  valuePlaceholder?: string;
  /** Required field indicator */
  required?: boolean;
  /** Additional class names */
  className?: string;
}

interface ValueInputProps {
  values: string[];
  onAddValue: (value: string) => void;
  onRemoveValue: (index: number) => void;
  placeholder?: string;
  error?: boolean;
}

/**
 * Internal component for handling multiple values input with tags
 */
function ValueInput({
  values,
  onAddValue,
  onRemoveValue,
  placeholder,
  error,
}: ValueInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      onAddValue(inputValue.trim());
      setInputValue("");
    }
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAddValue(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex-1 space-y-2">
      {/* Existing values as badges */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((value, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="gap-1 px-2 py-1 text-sm"
            >
              {value}
              <button
                type="button"
                onClick={() => onRemoveValue(idx)}
                className="ml-1 hover:text-destructive transition-colors"
                aria-label={`Remove ${value}`}
              >
                <RiCloseLine className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input for adding new values */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type and press Enter to add"}
          className={cn(
            "flex-1",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddClick}
          disabled={!inputValue.trim()}
          className="shrink-0"
        >
          <RiAddLine className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CustomPropertiesControl<T extends FieldValues>({
  control,
  name,
  controlName,
  label,
  addDescription = "Add Property",
  keyPlaceholder = "Property name",
  valuePlaceholder = "Add value...",
  required,
  className,
}: CustomPropertiesControlProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Label */}
      {label && (
        <FieldLabel className="text-sm font-medium">
          {label} {required && <sup className="text-destructive">*</sup>}
        </FieldLabel>
      )}

      {/* Property rows */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 items-start p-4 border rounded-lg bg-muted/30"
          >
            {/* Key input */}
            <Controller
              name={`${controlName}.${index}.key` as Path<T>}
              control={control}
              render={({ field: keyField, fieldState: { error } }) => (
                <Field data-invalid={!!error} className="w-40 shrink-0">
                  <Input
                    {...keyField}
                    type="text"
                    placeholder={keyPlaceholder}
                    className={cn(
                      "font-medium",
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                    )}
                    aria-invalid={!!error}
                  />
                  {error?.message && <FieldError>{error.message}</FieldError>}
                </Field>
              )}
            />

            {/* Values input */}
            <Controller
              name={`${controlName}.${index}.values` as Path<T>}
              control={control}
              render={({ field: valuesField, fieldState: { error } }) => (
                <Field data-invalid={!!error} className="flex-1">
                  <ValueInput
                    values={valuesField.value || []}
                    onAddValue={(value) => {
                      const currentValues = valuesField.value || [];
                      if (!currentValues.includes(value)) {
                        valuesField.onChange([...currentValues, value]);
                      }
                    }}
                    onRemoveValue={(idx) => {
                      const currentValues = valuesField.value || [];
                      valuesField.onChange(
                        currentValues.filter(
                          (_: string, i: number) => i !== idx,
                        ),
                      );
                    }}
                    placeholder={valuePlaceholder}
                    error={!!error}
                  />
                  {error?.message && <FieldError>{error.message}</FieldError>}
                </Field>
              )}
            />

            {/* Delete property button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => remove(index)}
              aria-label="Remove property"
            >
              <RiDeleteBinLine className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add property button */}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ key: "", values: [] } as Parameters<typeof append>[0])
        }
        className="gap-2"
      >
        <RiAddCircleLine className="h-4 w-4" />
        <span>{addDescription}</span>
      </Button>
    </div>
  );
}

export { CustomPropertiesControl };
export type { CustomPropertiesControlProps };
