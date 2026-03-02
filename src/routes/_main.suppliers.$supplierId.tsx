import { createFileRoute } from "@tanstack/react-router";
import SupplierDetailsPage from "@/pages/supplier-details-page";
import { store } from "@/app/store";
import { companiesApi } from "@/app/api/companies";

export const Route = createFileRoute("/_main/suppliers/$supplierId")({
  component: SupplierDetailsPage,
  loader: ({ params }) => {
    store.dispatch(
      companiesApi.endpoints.getCompanyById.initiate(params.supplierId),
    );
  },
});
