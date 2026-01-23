import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components/ui/image"
import { ShoppingCart, Star, Heart, Eye } from "lucide-react"
import { useState } from "react"

export interface ProductCardProps {
    id?: string
    title: string
    description?: string
    price: number
    originalPrice?: number
    rating?: number
    reviewCount?: number
    imageUrl: string
    category?: string
    inStock?: boolean
    discount?: number
    onAddToCart?: () => void
    onViewDetails?: () => void
    onAddToWishlist?: () => void
}

export const ProductCard = ({
    title,
    description,
    price,
    originalPrice,
    rating = 0,
    reviewCount = 0,
    imageUrl,
    category,
    inStock = true,
    discount,
    onAddToCart,
    onViewDetails,
    onAddToWishlist,
}: ProductCardProps) => {
    const hasDiscount = discount && discount > 0
    const [isInWishlist, setIsInWishlist] = useState(false)

    const handleWishlistToggle = () => {
        setIsInWishlist(!isInWishlist)
        onAddToWishlist?.()
    }

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
            {/* Image Section */}
            <div className="relative overflow-hidden bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={title}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {hasDiscount && (
                        <Badge variant="destructive" className="font-semibold">
                            -{discount}%
                        </Badge>
                    )}
                    {!inStock && (
                        <Badge variant="secondary" className="bg-gray-800 text-white">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {category && (
                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3 bg-white/90 text-gray-900"
                    >
                        {category}
                    </Badge>
                )}

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 shadow-md transition-all hover:scale-110 hover:bg-white"
                    onClick={handleWishlistToggle}
                >
                    <Heart
                        className={`h-5 w-5 transition-colors ${isInWishlist
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                            }`}
                    />
                </Button>
            </div>

            {/* Content Section */}
            <CardHeader className="pb-3">
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
                    {title}
                </h3>

                {/* Rating */}
                {rating > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
                        {reviewCount > 0 && (
                            <span className="text-gray-500">({reviewCount})</span>
                        )}
                    </div>
                )}
            </CardHeader>

            <CardContent className="pb-3">
                {description && (
                    <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
                )}
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="flex flex-col gap-3">
                {/* Price */}
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                            ${price.toFixed(2)}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm text-gray-500 line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex w-full flex-col gap-2">
                    <Button
                        size="sm"
                        className="w-full gap-2"
                        onClick={onAddToCart}
                        disabled={!inStock}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={onViewDetails}
                    >
                        <Eye className="h-4 w-4" />
                        View Details
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
