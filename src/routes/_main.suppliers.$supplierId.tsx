import { createFileRoute } from '@tanstack/react-router'
import SupplierDetailsPage from '@/pages/supplier-details-page'

export const Route = createFileRoute('/_main/suppliers/$supplierId')({
  component: SupplierDetailsPage,
})
