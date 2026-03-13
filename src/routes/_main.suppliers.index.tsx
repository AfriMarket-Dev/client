import { createFileRoute } from "@tanstack/react-router";
import { suppliersSearchSchema } from "@/features/marketplace/schemas";
import { SuppliersPage } from "@/features/supplier/components/suppliers-page";
import { companiesApi } from "@/services/api/companies";
import { NotFound } from "@/shared/components/not-found";
import { RouteError } from "@/shared/components/route-error";
import { createSeoMeta } from "@/shared/utils/seo";
import { store } from "@/store";

export const Route = createFileRoute("/_main/suppliers/")({
  validateSearch: suppliersSearchSchema,
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    categoryId: search.categoryId || "all",
    searchQuery: search.searchQuery || "",
    district: search.district || "",
    type: search.type || "all",
    verified: search.verified || false,
  }),
  shouldReload: (ctx: any) => !ctx.prev || ctx.next.pathname !== ctx.prev.pathname,
  staleTime: 120_000, // suppliers are less volatile
  gcTime: 600_000,
  component: () => <SuppliersPage />,
  errorComponent: RouteError,
  notFoundComponent: NotFound,
  head: () =>
    createSeoMeta({
      title: "Verified African Wholesale Suppliers",
      description:
        "Connect with verified wholesale suppliers and importers across Africa. Expand your business with reliable partners and quality products.",
      keywords: [
        "African wholesale suppliers",
        "African importers",
        "wholesale distributors Africa",
        "verified suppliers Africa",
      ],
    }),
  loader: ({ deps }) => {
    const params = {
      page: deps.page,
      limit: 20,
      categoryId: deps.categoryId === "all" ? undefined : deps.categoryId,
      searchQuery: deps.searchQuery,
      district: deps.district,
      type: deps.type === "all" ? undefined : deps.type,
      verified: deps.verified,
    };
    return store.dispatch(companiesApi.endpoints.getCompanies.initiate(params));
  },
});
