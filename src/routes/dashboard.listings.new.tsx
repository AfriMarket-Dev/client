import { createFileRoute } from '@tanstack/react-router'
import ProviderListingFormPage from '@/pages/provider-listing-form-page'

export const Route = createFileRoute('/dashboard/listings/new')({
  component: ProviderListingFormPage,
})
