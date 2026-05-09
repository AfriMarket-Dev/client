import {
	RiArrowLeftSLine,
	RiBuildingLine,
	RiCheckboxCircleLine,
	RiUserLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProviderProvisionForm } from "@/features/forms/components/provider-provision-form";
import { useCreateCompanyMutation } from "@/services/api/companies";
import { Card } from "@/shared/components/admin/card";
import { PageHeader } from "@/shared/components/admin/page-header";
import type { ProviderProvisionValues } from "@/shared/schemas/business";

export function AdminAddProviderPage() {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [createCompany, { isLoading }] = useCreateCompanyMutation();

	const handleSubmit = async (values: ProviderProvisionValues) => {
		try {
			const created = await createCompany({
				name: values.companyName,
				type: values.industry || "SUPPLIER_RETAILER",
				category: values.industry || "General", // Admin doesn't have category select yet, using industry as fallback
				slug: values.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				description: values.position || undefined,
				province: values.location || undefined,
				district: values.district || undefined,
				sector: values.sectorAddress || undefined,
				isActive: true,
				isVerified: false,
			}).unwrap();
			navigate({
				to: "/admin/providers/$providerId",
				params: { providerId: created.id },
			});
		} catch (error) {
			console.error(error);
		}
	};

	const steps = [
		{ step: 1, label: "Company", icon: RiBuildingLine },
		{ step: 2, label: "Contact", icon: RiUserLine },
		{ step: 3, label: "Confirm", icon: RiCheckboxCircleLine },
	];

	return (
		<div className="p-8 max-w-[1800px] mx-auto space-y-10 pb-20">
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={() => navigate({ to: "/admin/providers" })}
					className="group flex items-center gap-2 rounded-md px-3 h-9 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
				>
					<RiArrowLeftSLine
						size={16}
						className="transition-transform group-hover:-translate-x-1"
					/>
					Back to Providers
				</Button>
			</div>

			<PageHeader
				title="Provider Onboarding"
				subtitle="Register and verify a new provider entity"
				badge="Admin Control"
			/>

			<div className="max-w-4xl">
				<Card
					noPadding
					className="border-border shadow-sm rounded-md mb-10 overflow-hidden"
				>
					<div className="relative z-10 flex items-center justify-between px-12 py-10 bg-muted/5">
						{steps.map((item, index) => (
							<div
								key={item.step}
								className="relative z-10 flex flex-col items-center"
							>
								<div className="relative flex items-center justify-center">
									<div
										className={`z-10 flex h-12 w-12 items-center justify-center rounded-md border transition-all duration-300 ${
											currentStep >= item.step
												? "scale-110 border-primary bg-primary text-primary-foreground shadow-md"
												: "border-border bg-background text-muted-foreground shadow-none"
										}`}
									>
										<item.icon size={20} />
									</div>
									{index < 2 && (
										<div
											className={`absolute top-1/2 left-1/2 -z-10 h-[1px] w-[200px] -translate-y-1/2 translate-x-1 border-t border-dashed ${
												currentStep > item.step
													? "border-primary"
													: "border-border"
											}`}
										/>
									)}
								</div>

								<span
									className={`mt-4 text-xs font-semibold transition-colors duration-300 ${
										currentStep >= item.step
											? "text-primary"
											: "text-muted-foreground/60"
									}`}
								>
									{item.label}
								</span>
							</div>
						))}
					</div>
				</Card>

				<div className="max-w-3xl">
					<ProviderProvisionForm
						currentStep={currentStep}
						onStepChange={setCurrentStep}
						onSubmit={handleSubmit}
						onCancel={() => navigate({ to: "/admin/providers" })}
					/>
				</div>
			</div>

			{isLoading && (
				<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
					<div className="flex flex-col items-center gap-4">
						<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
						<p className="text-sm font-semibold text-primary">
							Creating provider entity...
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
