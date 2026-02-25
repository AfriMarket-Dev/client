import { createFileRoute } from '@tanstack/react-router'
import AdminProductDetailsPage from '@/pages/admin-product-details-page'

export const Route = createFileRoute('/admin/suppliers/$supplierId/product/$productId/')({
  component: AdminProductDetailsPage,
})
