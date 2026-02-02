import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const ShippingProductTableColumns: ColumnDef<any>[] = [
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

const ShippingProduct = () => {
  const columns = useMemo(() => ShippingProductTableColumns, []);
  return (
    <>
      <PageHeader
        title="Shipping Products"
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Shipping Products" },
        ]}
      />
      <DataTable columns={columns} data={[]} />
    </>
  );
};

export default ShippingProduct;
