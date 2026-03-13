import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CompanySetupForm } from "@/features/forms/components/company-setup-form";
import { getErrorFromRtkQuery } from "@/lib/utils";
import { useCreateCompanyMutation } from "@/services/api/companies";
import type { ProductCategory } from "@/types";

interface CompanySetupSectionProps {
	categories: ProductCategory[];
}

export function CompanySetupSection({ categories }: CompanySetupSectionProps) {
	const navigate = useNavigate();
	const [createCompany, { isLoading: creatingCompany, error: createError }] = useCreateCompanyMutation();

	const handleCompanySubmit = async (values: any) => {
		try {
			const payload = {
				name: values.name,
				category: values.categoryId || values.category,
				type: values.companyType || values.type,
				slug: values.slug,
				province: values.province,
				district: values.district,
				sector: values.sector,
				cell: values.cell,
				village: values.village,
				description: values.description || "",
			};

			await createCompany(payload as any).unwrap();
			toast.success("Company profile created successfully!");
			
			// Refresh current route to trigger loader
			navigate({ to: ".", replace: true });
		} catch (err) {
			console.error("Company setup failed:", err);
		}
	};

	const serverError = getErrorFromRtkQuery(createError);

	return (
		<div className="mx-auto max-w-3xl py-12 px-4 sm:px-6">
			<div className="mb-10 text-center">
				<h1 className="text-2xl font-heading font-black uppercase tracking-tighter text-foreground mb-3 shadow-sm inline-block px-4 py-2 bg-primary/5 border border-primary/10">
					Setup Your Provider Account
				</h1>
				<p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
					Create your company profile to start listing products and services.
				</p>
			</div>
			<div className="bg-card border border-border/40 p-6 sm:p-10 shadow-sm relative overflow-hidden">
				<div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />

				<div className="relative z-10">
					<CompanySetupForm
						onSubmit={handleCompanySubmit}
						isLoading={creatingCompany}
						categories={categories}
						onSkip={() => navigate({ to: "/" })}
						serverError={serverError}
					/>
				</div>
			</div>
		</div>
	);
}
