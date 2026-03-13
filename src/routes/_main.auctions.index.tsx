import { createFileRoute } from "@tanstack/react-router";
import { AuctionsPage } from "@/features/auctions/components/auctions-page";
import { auctionSearchSchema } from "@/features/marketplace/schemas";
import { auctionsApi } from "@/services/api/auctions";
import { NotFound } from "@/shared/components/not-found";
import { RouteError } from "@/shared/components/route-error";
import { createSeoMeta } from "@/shared/utils/seo";
import { store } from "@/store";

export const Route = createFileRoute("/_main/auctions/")({
  validateSearch: auctionSearchSchema,
  loaderDeps: ({ search }) => ({
    q: search.q || "",
    minPrice: search.minPrice || "",
    maxPrice: search.maxPrice || "",
    sortBy: search.sortBy || "createdAt",
    sortOrder: search.sortOrder || "DESC",
    page: search.page || 1,
  }),
  shouldReload: (ctx: any) => !ctx.prev || ctx.next.pathname !== ctx.prev.pathname,
  staleTime: 30_000,
  gcTime: 300_000,
  component: AuctionsPage,
  errorComponent: RouteError,
  notFoundComponent: NotFound,
  loader: ({ deps }) => {
    const params = {
      page: deps.page,
      limit: 50,
      status: "APPROVED" as const,
      searchQuery: deps.q,
      minPrice: deps.minPrice ? Number(deps.minPrice) : undefined,
      maxPrice: deps.maxPrice ? Number(deps.maxPrice) : undefined,
      sortBy: deps.sortBy,
      sortOrder: deps.sortOrder,
    };
    return store.dispatch(auctionsApi.endpoints.getAuctions.initiate(params));
  },
  head: () =>
    createSeoMeta({
      title: "Live Wholesale Auctions",
      description:
        "Participate in live wholesale auctions on Karibu. Bid on quality products from verified African suppliers and get the best prices.",
      keywords: [
        "wholesale auctions Africa",
        "live bidding Africa",
        "B2B auctions",
        "African marketplace auctions",
      ],
    }),
});
