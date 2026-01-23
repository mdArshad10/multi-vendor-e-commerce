import { create } from "zustand"
import { persist } from 'zustand/middleware'

type Product = {
    id: string,
    title: string,
    price: number,
    image: string,
    quantity?: number,
    sellerId: string,
}

type ProductStore = {
    carts: Product[],
    wishlist: Product[],
    addToCart: (product: Product, user: any, location: string, deviceInfo: string) => void,
    addToWishlist: (product: Product, user: any, location: string, deviceInfo: string) => void,
    removeFromCart: (id: string, user: any, location: string, deviceInfo: string) => void,
    removeFromWishlist: (id: string, user: any, location: string, deviceInfo: string) => void,
}

export const useProductStore = create<ProductStore>()(
    persist((set, get) => ({
        carts: [],
        wishlist: [],
        addToCart: (product: Product, user: any, location: string, deviceInfo: string) => {
            set((state) => {
                const existingProduct = state.carts.find((item) => item.id === product.id)
                if (existingProduct) {
                    return {
                        carts: state.carts.map((item) => item.id === product.id ? { ...item, quantity: (item?.quantity || 0) + 1 } : item)
                    }
                } else {
                    return {
                        carts: [...state.carts, { ...product, quantity: 1 }]
                    }
                }
            })


        },
        addToWishlist: (product: Product, user: any, location: string, deviceInfo: string) => {
            set((state) => {
                const existingProduct = state.carts.find((item) => item.id === product.id)
                if (existingProduct) {
                    return state;
                }
                return {
                    wishlist: [...state.wishlist, product]
                }
            })
        },
        removeFromCart: (id: string, user: any, location: string, deviceInfo: string) => {
            const existingProduct = get().carts.find((item) => item.id === id)
            set((state) => ({
                carts: state.carts?.filter((item) => item.id !== id),
            }));
        },
        removeFromWishlist: (id: string, user: any, location: string, deviceInfo: string) => {
            const existingProduct = get().wishlist.find((item) => item.id === id)
            set((state) => ({
                wishlist: state.wishlist?.filter((item) => item.id !== id)
            }))
        },
    }), {
        name: 'product-store',
    }))