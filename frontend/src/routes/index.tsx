/**
 * index.tsx - Home Page Route
 * 
 * The landing page at /
 */

import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { ProductCard, type ProductCardProps } from '@/components/common/ProductCard'
import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: HomePage,
})

const sampleProducts: ProductCardProps[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with 30h battery life',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviewCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    inStock: true,
    discount: 20,
  },
  {
    id: '2',
    title: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 299.99,
    rating: 4.8,
    reviewCount: 256,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Wearables',
    inStock: true,
  },
  {
    id: '3',
    title: 'Laptop Backpack',
    description: 'Durable water-resistant backpack with USB charging port',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Accessories',
    inStock: true,
    discount: 20,
  },
  {
    id: '4',
    title: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    rating: 4.6,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
    category: 'Home',
    inStock: false,
  },
  {
    id: '5',
    title: 'Running Shoes',
    description: 'Lightweight breathable athletic shoes for all terrains',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 456,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Sports',
    inStock: true,
    discount: 28,
  },
  {
    id: '6',
    title: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    price: 49.99,
    rating: 4.4,
    reviewCount: 167,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    category: 'Office',
    inStock: true,
  },
  {
    id: '7',
    title: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 523,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    category: 'Fitness',
    inStock: true,
    discount: 33,
  },
  {
    id: '8',
    title: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360° sound',
    price: 79.99,
    rating: 4.6,
    reviewCount: 234,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Audio',
    inStock: true,
  },
]

function HomePage() {
  return (
    <>
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">Ship 10x Faster with NS</h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">Highly customizable components for building modern websites and applications that look and feel the way you mean it.</p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="px-5 text-base">
                    <Link to={"#" as "/"}>
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base">
                    <Link to={"#" as "/"}>
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                className="-z-10 order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                base64="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Abstract Object"
                height="4000"
                width="3000"
                mediaType='image/jpg'
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Our Products</h1>
            <p className="mt-2 text-white">Check out our latest products</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log('Add to cart:', product.title)}
                onViewDetails={() => console.log('View details:', product.title)}
                onAddToWishlist={() => console.log('Add to wishlist:', product.title)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
