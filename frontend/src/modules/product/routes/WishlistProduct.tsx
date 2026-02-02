import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useDeviceInfo } from "../hook/useDeviceInfo";
import { useLocationTracker } from "../hook/useLocationTracker";
import { useProductStore } from "../store/product.store";

// Type definition for wishlist item
interface WishlistItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

// Props type for components that receive row
interface WishlistRowProps {
  row: Row<WishlistItem>;
}

// Product quantity control component
const ProductQuantityComp = ({ row }: WishlistRowProps) => {
  const deviceInfo = useDeviceInfo();
  const locationTracker = useLocationTracker();
  const productStore = useProductStore();
  const [quantity, setQuantity] = useState(row.original.quantity);

  const increaseQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
    // TODO: Update quantity in backend/state
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    // TODO: Update quantity in backend/state
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="text-xs text-white font-medium w-8 text-center">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={increaseQuantity}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

// Wishlist action component (Remove & Add to Cart)
const WishlistProductAction = ({ row }: WishlistRowProps) => {
  const handleRemoveFromWishlist = useCallback(() => {
    // TODO: Implement remove from wishlist API call
    console.log("Remove from wishlist:", row.original.id);
  }, [row.original.id]);

  const handleAddToCart = useCallback(() => {
    // TODO: Implement add to cart API call
    console.log("Add to cart:", row.original.id);
  }, [row.original.id]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-8 w-8"
        onClick={handleRemoveFromWishlist}
        aria-label="Remove from wishlist"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const wishlistProductTableColumns: ColumnDef<WishlistItem>[] = [
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
    accessorKey: "title",
    size: 280,
    header: () => <span>Product</span>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          {row.original.image && (
            <img
              src={row.original.image}
              alt={row.original.title}
              className="h-10 w-10 rounded-md object-cover"
            />
          )}
          <span className="text-xs text-white font-medium line-clamp-2">
            {row.original.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    size: 120,
    header: () => <span>Price</span>,
    cell: ({ row }) => {
      return (
        <div className="text-xs text-white font-medium">
          ${row.original.price.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    size: 150,
    header: () => <span>Quantity</span>,
    cell: ({ row }) => <ProductQuantityComp row={row} />,
  },
  {
    id: "actions",
    size: 120,
    header: () => <span>Actions</span>,
    cell: ({ row }) => <WishlistProductAction row={row} />,
  },
];

const WishlistProduct = () => {
  const columns = useMemo(() => wishlistProductTableColumns, []);

  // TODO: Replace with actual data from API
  const wishlistData: WishlistItem[] = [
    {
      id: "1",
      title: "Wireless Bluetooth Headphones with Noise Cancellation",
      price: 149.99,
      quantity: 1,
      image: "https://picsum.photos/seed/headphones/100/100",
    },
    {
      id: "2",
      title: "Mechanical Gaming Keyboard RGB Backlit",
      price: 89.99,
      quantity: 2,
      image: "https://picsum.photos/seed/keyboard/100/100",
    },
    {
      id: "3",
      title: "Ultra HD 4K Smart TV 55 inch",
      price: 599.99,
      quantity: 1,
      image: "https://picsum.photos/seed/tv/100/100",
    },
    {
      id: "4",
      title: "Portable Power Bank 20000mAh Fast Charging",
      price: 39.99,
      quantity: 3,
      image: "https://picsum.photos/seed/powerbank/100/100",
    },
    {
      id: "5",
      title: "Ergonomic Office Chair with Lumbar Support",
      price: 299.99,
      quantity: 1,
      image: "https://picsum.photos/seed/chair/100/100",
    },
  ];

  return (
    <>
      <PageHeader
        title="Wishlist"
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Wishlist" },
        ]}
      />
      <DataTable columns={columns} data={wishlistData} />
    </>
  );
};

export default WishlistProduct;
