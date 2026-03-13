import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CategoriesPage from "@/features/marketplace/components/categories-page";
import { categorySearchSchema } from "@/features/marketplace/schemas";
import { productCategoriesApi } from "@/services/api/product-categories";
import { NotFound } from "@/shared/components/not-found";
import { RouteError } from "@/shared/components/route-error";
import { createSeoMeta } from "@/shared/utils/seo";
import { store } from "@/store";

export const Route = createFileRoute("/_main/categories")({
  validateSearch: categorySearchSchema,
  loaderDeps: ({ search }) => ({
    searchQuery: search.searchQuery || "",
    page: search.page || 1,
  }),
  // biome-ignore lint/suspicious/noExplicitAny: TanStack Router shouldReload context is complex to type manually
  shouldReload: (ctx: any) =>
    !ctx.prev || ctx.next.pathname !== ctx.prev.pathname,
  staleTime: 300_000, // 5 minutes
  component: CategoriesPageWrapper,
  errorComponent: RouteError,
  notFoundComponent: NotFound,
  loader: ({ deps }) => {
    const params = {
      page: deps.page,
      limit: 12,
      query: deps.searchQuery,
    };
    return store.dispatch(
      productCategoriesApi.endpoints.getProductCategories.initiate(params),
    );
  },
  head: () =>
    createSeoMeta({
      title: "Product Categories",
      description:
        "Explore wholesale product categories on Karibu. From electronics to agriculture, find the best African providers in every industry.",
    }),
});

function CategoriesPageWrapper() {
	const navigate = useNavigate();

	return (
		<CategoriesPage
			onBack={() => navigate({ to: "/" })}
			onProviderClick={(providerId: string) =>
				navigate({
					to: "/providers/$providerId",
					params: { providerId },
				})
			}
		/>
	);
}
