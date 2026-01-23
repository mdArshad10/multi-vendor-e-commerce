import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { CreateDiscountCodeModal } from "../compoents/CreateDiscountCode";



const discountTableColumns: ColumnDef<any>[] = [
    {
        id: "select",
        size: 40,
        header: ({ table }) => (
            <div className="w-full flex items-center justify-center">
                <Checkbox
                    className="h-3.5 w-3.5"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <Checkbox
                className="h-3.5 w-3.5"
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
        header: ({ }) => (
            <span>Discount Code</span>
        ),
        cell: ({ row }) => {
            let discountCode = row.original.discountCode;
            let discountType = row.getValue("discountType");

            debugger;
            return (
                <div
                    className={`text-xs text-white font-medium line-clamp-2`}
                >
                    {row.original.discountCode}
                </div>
            );
        },
    },
]

const DiscountCodePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const columns = useMemo(() => discountTableColumns, [])
    const data = useState({ discountCode: "abcd", discountType: "percentage", discountValue: 10, public_name: "abcd" })
    return (
        <>
            <DashboardLayout>
                <PageHeader
                    title="Discount Code"
                    breadcrumbs={[
                        { label: "Discounts", href: "/discounts" },
                        { label: "Discount Code" },
                    ]}
                    actions={
                        <Button key="create" type="button" onClick={() => setIsOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> <span>Create Discount Code</span>
                        </Button>
                    }
                />
                <DataTable columns={columns} data={data} />
                <CreateDiscountCodeModal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} />
            </DashboardLayout>
        </>
    );
};

export default DiscountCodePage;