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
}

function EditorControl<T extends FieldValues>({
  control,
  name,
}: EditorControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <RichTextEditor value={field.value} onChange={field.onChange} />
        </>
      )}
    />
  );
}

export { EditorControl };
