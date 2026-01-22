import { Controller, useFieldArray } from "react-hook-form";
import type { ArrayPath, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RiAddCircleLine, RiDeleteBinLine } from "@remixicon/react";

interface KeyValueControlProps<T extends FieldValues> {
  /** Form control from useForm */
  control: Control<T>;
  /** Field name (must match schema) */
  name: ArrayPath<T>;
  controlName: string;
  /** Input label */
  label?: string;
  /** Field description (helper text) */
  addDescription?: string;
  /** Placeholder text */
  KeyPlaceholder?: string;
  valuePlaceholder?: string;
}

function KeyValueControl<T extends FieldValues>({
  control,
  name,
  label,
  controlName,
  KeyPlaceholder,
  valuePlaceholder,
  addDescription,
}: KeyValueControlProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  return (
    <div className="flex gap-2">
      <div>{label}</div>
      {fields.map((_, index) => {
        return (
          <div key={index} className="flex gap-2 items-center">
            <Controller
              name={`${controlName}.${index}.name` as Path<T>}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Field data-invalid={!!error}>
                  {/* Input with optional password toggle */}
                  <div className="relative">
                    <Input
                      {...field}
                      type="text"
                      placeholder={KeyPlaceholder}
                      aria-invalid={!!error}
                    />
                  </div>
                </Field>
              )}
            />

            <Controller
              name={`${controlName}.${index}.value` as Path<T>}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Field data-invalid={!!error}>
                  {/* Input with optional password toggle */}
                  <div className="relative">
                    <Input
                      {...field}
                      type="text"
                      placeholder={valuePlaceholder}
                      aria-invalid={!!error}
                    />
                  </div>
                </Field>
              )}
            />
            <Button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => remove(index)}
            >
              <RiDeleteBinLine size={14} />
            </Button>
          </div>
        );
      })}

      <Button type="button" onClick={() => append({ name: "", value: "" })}>
        <RiAddCircleLine size={16} />
        <span>{addDescription}</span>
      </Button>
    </div>
  );
}

export { KeyValueControl };
