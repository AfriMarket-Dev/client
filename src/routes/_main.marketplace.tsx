import { createFileRoute } from '@tanstack/react-router'
import MarketplacePage from '@/pages/marketplace/marketplace-page'

type MarketplaceSearch = {
  category?: string
}

export const Route = createFileRoute('/_main/marketplace')({
  component: MarketplacePage,
  validateSearch: (search: Record<string, unknown>): MarketplaceSearch => {
    return {
      category: (search.category as string) || undefined,
    }
  },
})
