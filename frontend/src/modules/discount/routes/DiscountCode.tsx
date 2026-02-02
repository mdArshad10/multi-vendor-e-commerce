import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { CreateDiscountCodeModal } from "../compoents/CreateDiscountCodeModal";
import { useDeleteDiscount, useGetProducts } from "../api/discount.queries";
import { toast } from "sonner";
import { DeleteDataModal } from "@/components/common/DeleteDataModal";

const DiscountCodeAction = ({ row }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync } = useDeleteDiscount();

  const handleDeleteDiscount = async () => {
    try {
      const resp = await mutateAsync(row.original.id);
      if (resp.success) {
        toast.success(resp.message);
      }
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : { message: "failed to delete discount" };
      toast.error(error.message);
    }
  };

  const handleDeleteButtonModel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button type="button" onClick={handleDeleteButtonModel}>
        Delete
      </Button>
      <DeleteDataModal
        isOpen={isOpen}
        title="Delete the Discount Code"
        description="if you delete this discount code"
        onDelete={handleDeleteDiscount}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

const discountTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <div className="w-full flex items-center justify-center">
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "discountCode",
    size: 280,
    header: () => <span>Discount Code</span>,
    cell: ({ row }) => {
      return (
        <div className={`text-xs text-white font-medium line-clamp-2`}>
          {row.original.discountCode}
        </div>
      );
    },
  },
  {
    accessorKey: "discountType",
    size: 280,
    header: () => <span>Discount Type</span>,
    cell: ({ row }) => {
      return (
        <div className={`text-xs text-white font-medium line-clamp-2`}>
          {row.original.discountType}
        </div>
      );
    },
  },
  {
    accessorKey: "discountValue",
    size: 280,
    header: () => <span>Discount Value</span>,
    cell: ({ row }) => {
      return (
        <div className={`text-xs text-white font-medium line-clamp-2`}>
          {row.original.discountValue}
        </div>
      );
    },
  },
  {
    accessorKey: "public_name",
    size: 280,
    header: () => <span>Public Name</span>,
    cell: ({ row }) => {
      return (
        <div className={`text-xs text-white font-medium line-clamp-2`}>
          {row.original.public_name}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",

    cell: ({ row }) => <DiscountCodeAction row={row} />,
  },
];

const DiscountCodePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetProducts();
  const columns = useMemo(() => discountTableColumns, []);
  const columnData = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <>
        <PageHeader
          title="Discount Code"
          breadcrumbs={[
            { label: "Discounts", href: "/discounts" },
            { label: "Discount Code" },
          ]}
          actions={
            <Button key="create" type="button" onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />{" "}
              <span>Create Discount Code</span>
            </Button>
          }
        />
        <DataTable columns={columns} data={columnData} />
        <CreateDiscountCodeModal
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(!isOpen)}
        />
      </>
    </>
  );
};

export default DiscountCodePage;
