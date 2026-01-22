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
import { RichTextEditor } from "../RichTextEditor";

interface EditorControlProps<T extends FieldValues> {
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
  /** Auto complete attribute */
  autoComplete?: string;
  /** Required field indicator */
  required?: boolean;
}

function EditorControl<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  className,
  disabled,
  autoComplete,
  required,
}: EditorControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <RichTextEditor value={field.value} onChange={field.onChange} />
        </>
      )}
    />
  );
}

export { EditorControl };
