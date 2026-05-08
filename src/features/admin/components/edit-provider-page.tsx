import { RiArrowLeftSLine, RiBuilding4Line, RiUserLine } from "@remixicon/react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProviderProvisionForm } from "@/features/forms/components/provider-provision-form";
import {
	useGetCompanyByIdQuery,
	useUpdateCompanyMutation,
} from "@/services/api/companies";
import { PageHeader } from "@/shared/components/admin/page-header";
import { AdminPageSkeleton } from "@/shared/components/skeletons";
import { cn } from "@/lib/utils";
import type { ProviderProvisionValues } from "@/shared/schemas/business";

export function AdminEditProviderPage() {
	const navigate = useNavigate();
	const { providerId } = useParams({
		from: "/admin/providers/$providerId/edit",
	});
	const [currentStep, setCurrentStep] = useState(1);
	const { data: company, isLoading } = useGetCompanyByIdQuery(providerId);
	const [updateCompany, { isLoading: saving }] = useUpdateCompanyMutation();

	const initialValues = useMemo(() => {
		return {
			companyName: company?.name ?? "",
			industry: company?.type ?? "",
			registrationId: company?.slug ?? "",
			location: company?.province ?? "",
			district: company?.district ?? "",
			sectorAddress: company?.sector ?? "",
			fullName: company?.phoneNumber || "", // Map existing data if possible
			email: company?.email || "",
			phoneNumber: company?.phoneNumber || "",
			position: company?.description || "",
			nationalId: "",
		};
	}, [company]);

	const handleSubmit = async (values: ProviderProvisionValues) => {
		try {
			await updateCompany({
				id: providerId,
				data: {
					name: values.companyName,
					type: values.industry as any,
					description: values.position || undefined,
					province: values.location || undefined,
					district: values.district || undefined,
					sector: values.sectorAddress || undefined,
					phone: values.phoneNumber,
					email: values.email,
				},
			}).unwrap();
			toast.success("Provider profile updated successfully");
			navigate({
				to: "/admin/providers/$providerId",
				params: { providerId },
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to update provider profile");
		}
	};

	if (isLoading) {
		return <AdminPageSkeleton />;
	}

	if (!company) {
		return (
			<div className="space-y-4 py-20 text-center border border-dashed border-border rounded-md bg-muted/5">
				<p className="text-sm font-medium text-muted-foreground">Provider resource not found</p>
				<Button 
					variant="outline"
					className="rounded-md h-10 px-6 font-semibold text-sm shadow-sm"
					onClick={() => navigate({ to: "/admin/providers" })}
				>
					Return to Directory
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-20">
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={() =>
						navigate({
							to: "/admin/providers/$providerId",
							params: { providerId },
						})
					}
					className="group flex items-center gap-2 rounded-md px-2 h-9 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
				>
					<RiArrowLeftSLine
						size={16}
						className="transition-transform group-hover:-translate-x-1"
					/>
					Back to Profile
				</Button>
			</div>

			<PageHeader
				title="Provision Protocol"
				subtitle={`Enterprise adjustments for ${company.name}`}
				badge="Admin Control"
			/>

			<div className="flex flex-col lg:flex-row gap-10">
				{/* Step Navigation Sidebar */}
				<aside className="w-full lg:w-64 shrink-0">
					<div className="space-y-1 sticky top-24 bg-background border border-border rounded-md p-2 shadow-sm">
						<p className="text-xs font-semibold text-muted-foreground/60 mb-3 px-3 pt-2">Modification Steps</p>
						<button
							type="button"
							onClick={() => setCurrentStep(1)}
							className={cn(
								"w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left rounded-md",
								currentStep === 1
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:bg-muted/50",
							)}
						>
							<RiBuilding4Line size={16} />
							1. Entity Info
						</button>
						<button
							type="button"
							onClick={() => setCurrentStep(2)}
							className={cn(
								"w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left rounded-md",
								currentStep === 2
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:bg-muted/50",
							)}
						>
							<RiUserLine size={16} />
							2. Contact Protocol
						</button>
					</div>
				</aside>

				{/* Form Area */}
				<div className="flex-1 min-w-0">
					<div className="bg-card border border-border rounded-md p-6 sm:p-10 relative overflow-hidden shadow-sm">
						<div className="relative z-10">
							<ProviderProvisionForm
								mode="edit"
								currentStep={currentStep}
								onStepChange={setCurrentStep}
								initialValues={initialValues}
								onSubmit={handleSubmit}
								onCancel={() =>
									navigate({
										to: "/admin/providers/$providerId",
										params: { providerId },
									})
								}
							/>
						</div>
					</div>
					{saving && (
						<div className="mt-4 flex items-center gap-2 px-2">
							<div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
							<p className="text-xs font-medium text-primary">Synchronizing changes with core server...</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
