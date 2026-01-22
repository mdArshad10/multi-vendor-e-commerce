import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/common/PageHeader";
import "@/components/common/PageHeader.css";
import { useRef, useState } from "react";
import { RiUpload2Fill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, TextareaController } from "@/components/common/controller";

const productSchema = yup.object({
    title: yup.string().trim().required(),
    short_description: yup.string().trim().required().max(150, "Short description must be at most 150 characters"),
    tag: yup.string().trim().required(),
    warranty: yup.string().trim().required(),
    slug: yup.string().trim().min(3, "Slug must be at least 3 characters").max(50, "Slug must be at most 50 characters").required(),
    category: yup.string().trim().required(),
    brand: yup.string().trim().required(),
    stock: yup.number().required(),
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
                    description="Add a new product to your inventory"
                    breadcrumbs={[
                        { label: "Products", href: "/products" },
                        { label: "Create Product" }
                    ]}
                    actions={
                        <button className="btn-primary">Save Product</button>
                    }
                />

                {/* Your product form goes here */}
                <div className="px-6">
                    {file ? (<div
                        className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
                        onClick={handleBoxClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="mb-2 bg-muted rounded-full p-3">
                            <RiUpload2Fill className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            Upload a project image
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            or,{" "}
                            <label
                                htmlFor="fileUpload"
                                className="text-primary hover:text-primary/90 font-medium cursor-pointer"
                                onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
                            >
                                click to browse
                            </label>{" "}
                            (4MB max)
                        </p>
                        <input
                            type="file"
                            id="fileUpload"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileSelect(e.target.files)}
                        />
                    </div>) : (
                        <div>
                            <img
                                src={file ? URL.createObjectURL(file) : ""}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <Button
                                onClick={() => setFile(null)}
                                className="absolute top-2 right-2"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputController
                        name="title"
                        control={form.control}
                        label="Product Title"
                        placeholder="eg. iPhone 14"
                        required
                    />

                    <TextareaController
                        name="short_description"
                        control={form.control}
                        label="Short Description* (max 150 words)"
                        placeholder="eg. iPhone 14"
                        required
                    />

                    <InputController
                        name="tag"
                        control={form.control}
                        label="Tags"
                        placeholder="eg. iPhone 14"
                        required
                    />

                    <InputController
                        name="warranty"
                        control={form.control}
                        label="Warranty"
                        placeholder="eg. 1 Year"
                        required
                    />

                    <InputController
                        name="slug"
                        control={form.control}
                        label="Slug"
                        placeholder="eg. iPhone 14"
                        required
                    />

                    <InputController
                        name="brand"
                        control={form.control}
                        label="Brand"
                        placeholder="eg. iPhone 14"
                        required
                    />

                    <InputController
                        name="category"
                        control={form.control}
                        label="Category"
                        placeholder="eg. iPhone 14"
                        required
                    />






                </form>
            </DashboardLayout>
        </>
    )
}

export default CreateProduct;