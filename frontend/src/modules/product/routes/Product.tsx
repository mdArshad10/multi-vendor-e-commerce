import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Image } from "@/components/ui/image"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    ShoppingCart,
    Star,
    Minus,
    Plus,
    Truck,
    Shield,
    RotateCcw,
    Share2
} from "lucide-react"
import { useProductStore } from "../store/product.store"
import { useLocationTracker } from "../hook/useLocationTracker"
import { useDeviceInfo } from "../hook/useDeviceInfo"

// Mock data - replace with actual data from API/props
const mockProduct = {
    id: "1",
    title: "Premium Wireless Headphones Pro Max",
    description: "Experience unparalleled sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and premium comfort for all-day listening.",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 1248,
    images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
    ],
    category: "Electronics",
    brand: "TechPro",
    inStock: true,
    stockCount: 45,
    sellerId: "seller123",
    features: [
        "Active Noise Cancellation",
        "40-Hour Battery Life",
        "Premium Leather Ear Cushions",
        "Bluetooth 5.3",
        "Fast Charging (5 min = 3 hours)",
        "Multi-device Pairing"
    ],
    specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        "Impedance": "32 Ohms",
        "Weight": "250g",
        "Connectivity": "Bluetooth 5.3, 3.5mm Jack",
        "Charging Port": "USB-C"
    }
}

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isInWishlist, setIsInWishlist] = useState(false)

    const { addToCart, addToWishlist, removeFromWishlist } = useProductStore()
    const location = useLocationTracker()
    const deviceInfo = useDeviceInfo()

    const discount = mockProduct.originalPrice
        ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
        : 0

    const handleAddToCart = () => {
        const product = {
            id: mockProduct.id,
            title: mockProduct.title,
            price: mockProduct.price,
            image: mockProduct.images[0],
            sellerId: mockProduct.sellerId,
        }

        // Use actual user data when auth is implemented
        const user = null
        const locationStr = location ? `${location.city}, ${location.contry}` : "Unknown"

        addToCart(product, user, locationStr, deviceInfo)
    }

    const handleWishlistToggle = () => {
        const product = {
            id: mockProduct.id,
            title: mockProduct.title,
            price: mockProduct.price,
            image: mockProduct.images[0],
            sellerId: mockProduct.sellerId,
        }

        const user = null
        const locationStr = location ? `${location.city}, ${location.contry}` : "Unknown"

        if (isInWishlist) {
            removeFromWishlist(mockProduct.id, user, locationStr, deviceInfo)
        } else {
            addToWishlist(product, user, locationStr, deviceInfo)
        }

        setIsInWishlist(!isInWishlist)
    }

    const incrementQuantity = () => {
        if (quantity < mockProduct.stockCount) {
            setQuantity(quantity + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={mockProduct.images[selectedImage]}
                            alt={mockProduct.title}
                            className="h-full w-full object-cover"
                        />

                        {/* Discount Badge */}
                        {discount > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute left-4 top-4 text-lg font-bold"
                            >
                                -{discount}% OFF
                            </Badge>
                        )}

                        {/* Wishlist & Share Buttons */}
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-white/90 shadow-md hover:bg-white"
                                onClick={handleWishlistToggle}
                            >
                                <Heart
                                    className={`h-5 w-5 transition-colors ${isInWishlist
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-600'
                                        }`}
                                />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-white/90 shadow-md hover:bg-white"
                            >
                                <Share2 className="h-5 w-5 text-gray-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-4">
                        {mockProduct.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index
                                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${mockProduct.title} ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Title & Category */}
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Badge variant="secondary">{mockProduct.category}</Badge>
                            <Badge variant="outline">{mockProduct.brand}</Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                            {mockProduct.title}
                        </h1>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(mockProduct.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-200 text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                            {mockProduct.rating}
                        </span>
                        <span className="text-gray-500">
                            ({mockProduct.reviewCount.toLocaleString()} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-gray-900">
                            ${mockProduct.price.toFixed(2)}
                        </span>
                        {mockProduct.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">
                                ${mockProduct.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h3 className="mb-2 text-lg font-semibold">Description</h3>
                        <p className="text-gray-600">{mockProduct.description}</p>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <div
                            className={`h-3 w-3 rounded-full ${mockProduct.inStock ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        />
                        <span className="font-medium">
                            {mockProduct.inStock
                                ? `In Stock (${mockProduct.stockCount} available)`
                                : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity</label>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center text-lg font-medium">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={incrementQuantity}
                                disabled={quantity >= mockProduct.stockCount}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            size="lg"
                            className="flex-1 gap-2 text-base"
                            onClick={handleAddToCart}
                            disabled={!mockProduct.inStock}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline" className="text-base">
                            Buy Now
                        </Button>
                    </div>

                    <Separator />

                    {/* Features */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold">Key Features</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                            {mockProduct.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shipping Info */}
                    <div className="grid gap-3 rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Truck className="h-5 w-5 text-primary" />
                            <span className="font-medium">Free Shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <RotateCcw className="h-5 w-5 text-primary" />
                            <span className="font-medium">30-Day Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-medium">1-Year Warranty Included</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Specifications */}
            <Card className="mt-12">
                <CardContent className="p-6">
                    <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(mockProduct.specifications).map(([key, value]) => (
                            <div key={key} className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-gray-500">{key}</span>
                                <span className="font-medium text-gray-900">{value}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetail
