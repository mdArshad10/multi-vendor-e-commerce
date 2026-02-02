// title,
// description,
// isOpen,
// onOpenChange,
// onDelete

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface DeleteDataModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
}

export const DeleteDataModal = ({
  title,
  description,
  isOpen,
  onOpenChange,
  onDelete,
}: DeleteDataModalProps) => {
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    if (message !== "DELETE") {
      return;
    }
    await onDelete();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="border-2 bg-red-100 rounded-lg p-4 space-y-3">
          <h3 className="text-red-900 font-semibold text-lg">
            Are you sure you want to delete this data?
          </h3>
          <p className="text-red-800">
            Once deleted, you will not be able to recover this data.
          </p>
          <Input
            type="text"
            placeholder="Enter DELETE to confirm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-red-300 focus:border-red-500 focus:ring-red-500 text-red-700"
          />
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={message !== "DELETE"}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
