import { createFileRoute } from '@tanstack/react-router'
import AdminSuppliersPage from '@/pages/admin-suppliers-page'

export const Route = createFileRoute('/admin/suppliers/')({
  component: AdminSuppliersPage,
})
