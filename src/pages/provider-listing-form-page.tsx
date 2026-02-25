import { useNavigate } from "@tanstack/react-router";
import { useGetMyCompanyQuery } from "@/app/api/companies";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { useCreateListingMutation } from "@/app/api/listings";
import { ListingForm } from "@/components/forms/listing-form";

export default function ProviderListingFormPage() {
  const navigate = useNavigate();
  const { data: company } = useGetMyCompanyQuery();
  const { data: catData } = useGetListingCategoriesQuery({ limit: 100 });
  const [createListing, { isLoading }] = useCreateListingMutation();

  const companyId = (company as { id?: string })?.id ?? "";
  const categories = catData?.data ?? [];

  if (!companyId) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading company...</p>
      </div>
    );
  }

  const handleSubmit = async (values: Parameters<typeof createListing>[0]) => {
    try {
      await createListing(values).unwrap();
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-heading font-bold uppercase text-foreground mb-6">
        Add Listing
      </h1>
      <ListingForm
        categories={categories}
        companyId={companyId}
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/dashboard" })}
        isLoading={isLoading}
      />
    </div>
  );
}
