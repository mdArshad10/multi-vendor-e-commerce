import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/shoppingCart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/shoppingCart"!</div>
}
