import { createFileRoute } from '@tanstack/react-router'
import AdminEditSupplierPage from '@/pages/admin-edit-supplier-page'

export const Route = createFileRoute('/admin/suppliers/$supplierId/edit')({
  component: AdminEditSupplierPage,
})
