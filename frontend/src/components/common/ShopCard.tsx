import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components/ui/image"
import { MapPin, Star, Users, ExternalLink } from "lucide-react"
import { Link } from "@tanstack/react-router"

export interface ShopCardProps {
    id: string
    name: string
    shopImage: string
    backgroundImage: string
    location: string
    rating: number
    reviewCount?: number
    followers: number
    category?: string
    verified?: boolean
}

export const ShopCard = ({
    id,
    name,
    shopImage,
    backgroundImage,
    location,
    rating,
    reviewCount,
    followers,
    category,
    verified = false,
}: ShopCardProps) => {
    const shopUrl = `/shop/${id}` as "/"

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
            {/* Background Image Section */}
            <div className="relative h-32 overflow-hidden">
                <Image
                    src={backgroundImage}
                    alt={`${name} background`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

                {/* Category Badge */}
                {category && (
                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3 bg-white/90 text-gray-900"
                    >
                        {category}
                    </Badge>
                )}
            </div>

            <CardContent className="relative px-4 pb-4 pt-0">
                {/* Shop Avatar - Overlapping */}
                <div className="relative -mt-12 mb-3">
                    <div className="inline-block rounded-full border-4 border-white bg-white shadow-lg">
                        <Image
                            src={shopImage}
                            alt={name}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    </div>

                    {/* Verified Badge */}
                    {verified && (
                        <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Shop Name */}
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {name}
                </h3>

                {/* Location */}
                <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                </div>

                {/* Stats Row */}
                <div className="mb-4 flex items-center gap-4 text-sm">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                            {rating.toFixed(1)}
                        </span>
                        {reviewCount && (
                            <span className="text-gray-500">({reviewCount})</span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-4 w-px bg-gray-300" />

                    {/* Followers */}
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">
                            {followers >= 1000
                                ? `${(followers / 1000).toFixed(1)}k`
                                : followers}{' '}
                            followers
                        </span>
                    </div>
                </div>

                {/* Visit Shop Button */}
                <Button asChild className="w-full gap-2" size="sm">
                    <Link to={shopUrl}>
                        Visit Shop
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
