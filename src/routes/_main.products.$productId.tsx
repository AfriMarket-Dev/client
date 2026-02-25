import { createFileRoute } from '@tanstack/react-router'
import ProductPage from '@/pages/marketplace/product-page'

export const Route = createFileRoute('/_main/products/$productId')({
  component: ProductPage,
})
