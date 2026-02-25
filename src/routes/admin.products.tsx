import { createFileRoute } from '@tanstack/react-router'
import AdminProductsPage from '@/pages/admin-products-page'

export const Route = createFileRoute('/admin/products')({
  component: AdminProductsPage,
})
