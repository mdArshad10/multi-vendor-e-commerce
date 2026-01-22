import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { useRef, useState } from "react";
import { RiUpload2Fill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  InputControl,
  TextareaControl,
  ColorSelectorControl,
  SelectControl,
} from "@/components/common/control";
import { EditorControl } from "@/components/common/control/EditorControl";

const productSchema = yup.object({
  title: yup.string().trim().required(),
  short_description: yup
    .string()
    .trim()
    .required()
    .max(150, "Short description must be at most 150 characters"),
  tag: yup.string().trim().required(),
  warranty: yup.string().trim().required(),
  slug: yup
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(50, "Slug must be at most 50 characters")
    .required(),
  brand: yup.string().trim().required(),
  stock: yup.number().required(),
  color: yup.array().min(1, "At least one color is required").required(),
  cashOnDelivery: yup.string().trim().required(),
  category: yup.string().trim().required(),
  sub_category: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const CreateProduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const handleSubmit = (data: yup.InferType<typeof productSchema>) => {
    console.log(data);
  };

  return (
    <>
      <DashboardLayout>
        <PageHeader
          title="Create Product"
          breadcrumbs={[
            { label: "Products", href: "/products" },
            { label: "Create Product" },
          ]}
        />

        <div className="px-6 pb-6">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column - Image Upload */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Product Images
              </h3>
              {!file ? (
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={handleBoxClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-full p-4">
                    <RiUpload2Fill className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Upload product image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Drag and drop or{" "}
                    <label
                      htmlFor="fileUpload"
                      className="text-primary hover:text-primary/90 font-medium cursor-pointer underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      click to browse
                    </label>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PNG, JPG, GIF up to 4MB
                  </p>
                  <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Product preview"
                    className="w-full h-80 object-cover"
                  />
                  <Button
                    type="button"
                    onClick={() => setFile(null)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-3 right-3"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-4">
              <InputControl
                name="title"
                control={form.control}
                label="Product Title"
                placeholder="e.g. iPhone 14 Pro Max"
                required
              />

              <TextareaControl
                name="short_description"
                control={form.control}
                label="Short Description"
                placeholder="Brief description of your product (max 150 characters)"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <InputControl
                  name="brand"
                  control={form.control}
                  label="Brand"
                  placeholder="e.g. Apple"
                  required
                />

                <InputControl
                  name="category"
                  control={form.control}
                  label="Category"
                  placeholder="e.g. Electronics"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputControl
                  name="warranty"
                  control={form.control}
                  label="Warranty"
                  placeholder="e.g. 1 Year"
                  required
                />

                <InputControl
                  name="stock"
                  control={form.control}
                  label="Stock Quantity"
                  placeholder="e.g. 100"
                  type="number"
                  required
                />
              </div>

              <ColorSelectorControl
                name="color"
                control={form.control}
                label="Color"
                placeholder="e.g. Red"
                required
              />

              <InputControl
                name="slug"
                control={form.control}
                label="URL Slug"
                placeholder="e.g. iphone-14-pro-max"
                required
              />

              <InputControl
                name="tag"
                control={form.control}
                label="Tags"
                placeholder="e.g. smartphone, apple, 5g (comma separated)"
                required
              />

              <SelectControl
                name="cashOnDelivery"
                control={form.control}
                label="Cash on Delivery"
                placeholder="e.g. Yes"
                data={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                required
              />
            </div>

            <div className="space-y-4">
              <SelectControl
                name="category"
                control={form.control}
                label="Category"
                placeholder="e.g. Yes"
                data={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                required
              />

              <SelectControl
                name="sub_category"
                control={form.control}
                label="Sub Category"
                placeholder="e.g. Yes"
                data={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                required
              />

              <EditorControl
                name="description"
                control={form.control}
                label="Description"
                placeholder="e.g. iPhone 14 Pro Max"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg">
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CreateProduct;
