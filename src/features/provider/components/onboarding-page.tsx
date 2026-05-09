import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { CompanySetupForm } from "@/features/forms/components/company-setup-form";
import { getErrorFromRtkQuery } from "@/lib/utils";
import { useCreateCompanyMutation } from "@/services/api/companies";
import { useGetCompanyCategoriesQuery } from "@/services/api/company-categories";
import { setNeedsOnboarding } from "@/store/slices/auth-slice";
import type { CreateCompanyInput } from "@/types";

export function OnboardingPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [createCompany, { isLoading, error }] = useCreateCompanyMutation();
	const { data: categoriesData } = useGetCompanyCategoriesQuery({ limit: 100 });

	const handleCompanySubmit = async (values: CreateCompanyInput) => {
		try {
			const payload = {
				name: values.name,
				category: values.category,
				type: values.type,
				slug: values.slug,
				province: values.province,
				district: values.district,
				sector: values.sector,
				cell: values.cell,
				village: values.village,
				description: values.description || "",
			};

			await createCompany(payload as CreateCompanyInput).unwrap();

			// CLEAR THE FLAG IMMEDIATELY
			dispatch(setNeedsOnboarding(false));

			toast.success("Business profile created successfully!");
			navigate({ to: "/dashboard", replace: true });
		} catch (err) {
			console.error("Onboarding submission failed:", err);
			toast.error(
				"Failed to create business profile. Please check your information.",
			);
		}
	};

	const serverError = getErrorFromRtkQuery(error);

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8 industrial-grain">
			<div className="w-full max-w-2xl bg-card border border-border p-8 md:p-12 relative overflow-hidden">
				<div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
				<div className="relative z-10 space-y-10">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-px bg-primary" />
							<span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
								Step 1: Profile Setup
							</span>
						</div>
						<h1 className="text-3xl md:text-4xl font-display font-black uppercase text-foreground tracking-tighter leading-none">
							Company Setup
						</h1>
						<p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
							Complete your business profile to start receiving inquiries.
						</p>
					</div>

					<CompanySetupForm
						onSubmit={handleCompanySubmit}
						isLoading={isLoading}
						categories={categoriesData?.data}
						onSkip={() => navigate({ to: "/" })}
						serverError={serverError}
					/>
				</div>
			</div>
		</div>
	);
}
