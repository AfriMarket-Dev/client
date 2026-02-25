import { createFileRoute } from '@tanstack/react-router'
import SupplierListingPage from '@/pages/supplier-listing-page'

export const Route = createFileRoute('/_main/suppliers/')({
  component: SupplierListingPage,
})
