import { InputControl, SelectControl } from "@/components/common/control";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createDiscountCodeSchema,
  type createDiscountType,
} from "../types/discount.type";
import { useCreateDiscount } from "../api/discount.queries";
import { toast } from "sonner";

interface CreateDiscountCodeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateDiscountCodeModal = ({
  isOpen,
  onOpenChange,
}: CreateDiscountCodeProps) => {
  const form = useForm({
    resolver: yupResolver(createDiscountCodeSchema),
  });
  const { mutateAsync: createDiscount } = useCreateDiscount();
  const onSubmit = async (data: createDiscountType) => {
    try {
      const resp = await createDiscount(data);
      if (resp.success) {
        toast.success(resp.message);
        onOpenChange(isOpen);
        console.log(resp);
      }
    } catch (error) {
      const err =
        error instanceof Error ? error : { message: "some thing want wrong" };
      toast.error(err.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Discount Code</DialogTitle>
            <DialogDescription>
              Fill the form to create a new discount code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <InputControl
              control={form.control}
              name="discountCode"
              label="Discount Code"
              placeholder="Enter discount code"
            />
            <SelectControl
              control={form.control}
              name="discountType"
              label="Discount Type"
              placeholder="Enter discount type"
              data={[
                { value: "percentage", label: "Percentage" },
                { value: "fixed", label: "Fixed" },
              ]}
            />
            <InputControl
              control={form.control}
              name="discountValue"
              label="Discount Value"
              placeholder="Enter discount value"
            />
            <InputControl
              control={form.control}
              name="public_name"
              label="Public Name"
              placeholder="Enter public name"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
