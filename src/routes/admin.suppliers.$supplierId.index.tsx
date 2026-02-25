import { createFileRoute } from '@tanstack/react-router'
import AdminSupplierDetailsPage from '@/pages/admin-supplier-details-page'

export const Route = createFileRoute('/admin/suppliers/$supplierId/')({
  component: AdminSupplierDetailsPage,
})
