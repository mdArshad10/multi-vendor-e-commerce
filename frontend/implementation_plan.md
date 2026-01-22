# Frontend Architecture Plan (Scalable)

Architecture designed for **solo dev simplicity** that scales to **100+ team members** through modular feature domains.

---

## Core Principles

| Principle              | Solo Dev           | 100+ Team                    |
| ---------------------- | ------------------ | ---------------------------- |
| **Feature Isolation**  | Simple folders     | Team ownership per module    |
| **Explicit Contracts** | `index.ts` exports | API boundaries between teams |
| **Minimal Coupling**   | Easy refactoring   | Independent deployments      |
| **Route Composition**  | Quick development  | Clear responsibilities       |

---

## Folder Structure

```
src/
├── app/                        # Application shell (platform team)
│   ├── App.tsx
│   ├── router.tsx              # Route composition
│   └── providers.tsx
│
├── modules/                    # Feature domains (team-owned)
│   ├── auth/                   # Auth Team
│   │   ├── index.ts            # Public API (barrel export)
│   │   ├── routes/             # Auth route components
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── components/         # Internal components
│   │   ├── hooks/              # Internal hooks
│   │   ├── api/                # API layer
│   │   └── types.ts            # Module types
│   │
│   ├── products/               # Catalog Team
│   ├── cart/                   # Cart Team
│   ├── checkout/               # Payments Team
│   ├── vendor/                 # Vendor Platform Team
│   └── admin/                  # Admin Team
│
├── shared/                     # Shared kernel (platform team)
│   ├── components/             # Reusable UI
│   ├── hooks/                  # Universal hooks
│   ├── api/                    # API client
│   ├── config/                 # App configuration
│   ├── types/                  # Global types
│   └── utils/                  # Helpers
│
├── components/                 # Base UI components
│   ├── ui/                     # shadcn components
│   └── common/                 # Common components (Header, Footer)
│
├── routes/                     # Route definitions (thin layer)
│   ├── __root.tsx
│   ├── index.tsx
│   ├── auth/
│   │   ├── login.tsx           # → modules/auth/routes/LoginPage
│   │   └── register.tsx        # → modules/auth/routes/RegisterPage
│   └── products/
│       ├── index.tsx
│       └── $productId.tsx
│
└── main.tsx
```

---

## Module Structure

Each feature module follows this structure:

```
modules/products/
├── index.ts                    # PUBLIC API (barrel exports)
├── routes/                     # Page components
│   ├── ProductListPage.tsx
│   └── ProductDetailPage.tsx
├── components/                 # Internal components
│   ├── ProductCard.tsx
│   └── ProductFilters.tsx
├── hooks/                      # Internal hooks
├── api/                        # API layer (React Query hooks)
│   └── use-products.ts
└── types.ts                    # Module types
```

### Barrel Export Pattern

```tsx
// modules/products/index.ts
export { ProductCard } from "./components/ProductCard";
export { useProducts, useProduct } from "./api/use-products";
export type { Product } from "./types";
```

---

## Routing Pattern

Routes are thin - they just compose modules:

```tsx
// src/routes/auth/login.tsx
import { LoginPage } from "@/modules/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
```

---

## API Layer (TanStack Query)

```tsx
// modules/products/api/use-products.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/api-client";
import type { Product } from "../types";

export const productKeys = {
  all: ["products"] as const,
  list: (filters?: string) => [...productKeys.all, "list", filters],
  detail: (id: string) => [...productKeys.all, id],
};

export function useProducts(filters?: string) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => apiClient<Product[]>(`/products?${filters ?? ""}`),
  });
}
```

---

## Cross-Module Communication

Modules communicate through **barrel exports only**:

```tsx
// ✅ Correct - using public API
import { ProductCard } from "@/modules/products";

// ❌ Wrong - reaching into internals
import { ProductCard } from "@/modules/products/components/ProductCard";
```

---

## Scaling Path

| Team Size          | Structure                               |
| ------------------ | --------------------------------------- |
| **Solo (1)**       | All modules in one repo                 |
| **Small (5-10)**   | Each dev owns 1-2 modules               |
| **Medium (20-50)** | Teams own modules                       |
| **Large (100+)**   | Modules become packages/micro-frontends |

---

## Form Handling

Using `react-hook-form` + `yupResolver`:

```tsx
// Uncontrolled for native inputs
<Input {...register("email")} />

// Controller for custom components
<Controller name="date" control={control} render={({field}) => <DatePicker {...field} />} />
```

---

## Tech Stack

| Category      | Technology                   |
| ------------- | ---------------------------- |
| Framework     | React 19 + Vite              |
| Routing       | TanStack Router (file-based) |
| Data Fetching | TanStack Query               |
| Forms         | react-hook-form + yup        |
| Styling       | Tailwind CSS v4              |
| UI Components | shadcn/ui                    |
