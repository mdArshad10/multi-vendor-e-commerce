import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/wishlistProduct')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/wishlistProduct"!</div>
}
