import { useNavigate } from "@tanstack/react-router";
import { useGetMyCompanyQuery } from "@/app/api/companies";
import { useCreateProductMutation } from "@/app/api/products";
import { useCreateServiceMutation } from "@/app/api/services";
import { ProductForm } from "@/components/forms/product-form";
import { ServiceForm } from "@/components/forms/service-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ProviderListingFormPage() {
  const navigate = useNavigate();
  const { data: company } = useGetMyCompanyQuery();
  const [createProduct, { isLoading: isProductLoading }] =
    useCreateProductMutation();
  const [createService, { isLoading: isServiceLoading }] =
    useCreateServiceMutation();

  const companyId = (company as { id?: string })?.id ?? "";

  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground font-heading tracking-widest text-[10px] uppercase font-bold">
          Retrieving Company...
        </div>
      </div>
    );
  }

  const handleProductSubmit = async (values: any) => {
    try {
      const sanitizedValues = {
        name: values.name,
        description: values.description,
        price: values.price ? Number(values.price) : 0,
        stock: values.stock ? Number(values.stock) : 0,
        unit: values.unit || "unit",
        categoryId: values.categoryId,
        companyId,
        priceType: values.priceType || "FIXED",
        images: values.imageUrls || [],
        variants: [
          {
            name: "Default",
            price: values.price ? Number(values.price) : 0,
            stock: values.stock ? Number(values.stock) : 0,
            unit: values.unit || "unit",
            images: values.imageUrls || [],
          },
        ],
      };

      console.log("Submitting product with values:", sanitizedValues);
      await createProduct(sanitizedValues).unwrap();
      toast.success("Product created successfully");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error("Failed to create product");
      console.error("Product creation error:", err);
      if (err.data) {
        console.error("Error data:", JSON.stringify(err.data, null, 2));
      }
    }
  };

  const handleServiceSubmit = async (values: any) => {
    try {
      const sanitizedValues = {
        name: values.name,
        description: values.description,
        price: values.price ? Number(values.price) : 0,
        priceType: values.priceType || "FIXED",
        duration: values.duration,
        discount: values.discount ? Number(values.discount) : 0,
        categoryId: values.categoryId,
        companyId,
        images: values.imageUrls || [],
      };

      await createService(sanitizedValues).unwrap();
      toast.success("Service created successfully");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error("Failed to create service");
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
          New Listing
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Showcase your inventory or expertise on AfriMarket.
        </p>
      </div>

      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="product">Physical Product</TabsTrigger>
          <TabsTrigger value="service">Professional Service</TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="mt-0 outline-none">
          <div className="bg-card border border-border/50 p-6 rounded-sm shadow-sm">
            <ProductForm
              onSubmit={handleProductSubmit}
              onCancel={() => navigate({ to: "/dashboard" })}
              isLoading={isProductLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="service" className="mt-0 outline-none">
          <div className="bg-card border border-border/50 p-6 rounded-sm shadow-sm">
            <ServiceForm
              onSubmit={handleServiceSubmit}
              onCancel={() => navigate({ to: "/dashboard" })}
              isLoading={isServiceLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
