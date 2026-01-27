import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { Pencil, WandSparkles, X } from "lucide-react";
import { useState } from "react";

interface ImagePlaceHolderProps {
  size: string;
  small?: boolean;
  onImageChange: (file: File | null, index: number) => void;
  onRemove?: (index: number) => void;
  defaultImage?: string | null;
  setOpenImageModal: (openImageModal: boolean) => void;
  index?: unknown;
}

const ImagePlaceHolder: React.FC<ImagePlaceHolderProps> = ({
  size,
  small,
  onImageChange,
  onRemove,
  defaultImage = null,
  setOpenImageModal,
  index = null,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(defaultImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageChange(file, index! as number);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full cursor-pointer border-gray-600 rounded-lg flex flex-col items-center justify-center",
        small ? "h-[180px]" : "h-[450px]",
      )}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={`image-upload-${index}`}
        onChange={handleFileChange}
      />
      {imagePreview ? (
        <>
          <Button
            type="button"
            onClick={() => onRemove?.(index! as number)}
            className="absolute right-3 top-3 p-2 rounded bg-red-600 shadow-lg"
          >
            <X size={16} />
          </Button>
          <Button
            type="button"
            className="absolute top-3 right-16 px-2 rounded bg-blue-500 shadow-lg"
            onClick={() => setOpenImageModal(true)}
          >
            <WandSparkles size={16} />
          </Button>
        </>
      ) : (
        <label
          className="absolute top-3 right-3 p-2 rounded bg-slate-600 shadow-lg cursor-pointer"
          htmlFor={`image-upload-${index}`}
        >
          <Pencil size={16} />
        </label>
      )}
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="upload"
          width={400}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <p
            className={cn(
              "text-gray-400 font-semibold",
              small ? "text-xl" : "text-4xl",
            )}
          >
            {size}
          </p>
          <p
            className={cn(
              "text-gray-500 pt-2 text-center",
              small ? "text-sm" : "text-lg",
            )}
          >
            Please Choose an image <br />
            According to the expected ratio
          </p>
        </>
      )}
    </div>
  );
};

export default ImagePlaceHolder;
