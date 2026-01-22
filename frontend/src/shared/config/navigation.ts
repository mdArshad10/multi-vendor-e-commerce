// src/shared/config/navigation.ts

// Main navigation items
export const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'Categories', href: '/categories' },
    { title: 'Deals', href: '/deals' },
] as const

export type NavItem = (typeof navItems)[number]

// Department categories for dropdown
export const departments = [
    {
        title: 'Electronics',
        href: '/categories/electronics',
        subcategories: [
            { title: 'Smartphones', href: '/categories/electronics/smartphones' },
            { title: 'Laptops', href: '/categories/electronics/laptops' },
            { title: 'Tablets', href: '/categories/electronics/tablets' },
            { title: 'Accessories', href: '/categories/electronics/accessories' },
        ],
    },
    {
        title: 'Fashion',
        href: '/categories/fashion',
        subcategories: [
            { title: "Men's Clothing", href: '/categories/fashion/mens' },
            { title: "Women's Clothing", href: '/categories/fashion/womens' },
            { title: 'Kids', href: '/categories/fashion/kids' },
            { title: 'Shoes', href: '/categories/fashion/shoes' },
        ],
    },
    {
        title: 'Home & Garden',
        href: '/categories/home-garden',
        subcategories: [
            { title: 'Furniture', href: '/categories/home-garden/furniture' },
            { title: 'Kitchen', href: '/categories/home-garden/kitchen' },
            { title: 'Decor', href: '/categories/home-garden/decor' },
        ],
    },
    {
        title: 'Sports & Outdoors',
        href: '/categories/sports',
    },
    {
        title: 'Beauty & Health',
        href: '/categories/beauty',
    },
    {
        title: 'Books & Media',
        href: '/categories/books',
    },
] as const

export type Department = (typeof departments)[number]