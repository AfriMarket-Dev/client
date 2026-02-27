import { useNavigate, useParams } from "@tanstack/react-router";
import { RiArrowLeftSLine, RiBuildingLine, RiLoader2Line, RiUserLine } from "@remixicon/react";
import { useMemo, useState } from "react";
import { useGetCompanyByIdQuery, useUpdateCompanyMutation } from "@/app/api/companies";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { SupplierProvisionForm } from "@/components/forms/supplier-provision-form";
import { Button } from "@/components/ui/button";

export default function AdminEditSupplierPage() {
	const navigate = useNavigate();
	const { supplierId } = useParams({
		from: "/admin/suppliers/$supplierId/edit",
	});
	const [currentStep, setCurrentStep] = useState(1);
	const { data: company, isLoading } = useGetCompanyByIdQuery(supplierId);
	const [updateCompany, { isLoading: saving }] = useUpdateCompanyMutation();

	const initialValues = useMemo(() => {
		return {
			companyName: company?.name ?? "",
			industry: company?.type ?? "",
			registrationId: company?.slug ?? "",
			location: company?.province ?? "",
			district: company?.district ?? "",
			sectorAddress: company?.sector ?? "",
			fullName: "",
			email: "",
			phoneNumber: "",
			position: "",
			nationalId: "",
		};
	}, [company]);

	const handleSubmit = async (values: any) => {
		try {
			await updateCompany({
				id: supplierId,
				data: {
					name: values.companyName,
					type: values.industry || undefined,
					description: values.position || undefined,
					province: values.location || undefined,
					district: values.district || undefined,
					sector: values.sectorAddress || undefined,
				},
			}).unwrap();
			navigate({ to: `/admin/suppliers/${supplierId}` as any });
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-20">
				<RiLoader2Line className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!company) {
		return (
			<div className="space-y-4 py-20 text-center">
				<p className="text-sm text-muted-foreground">Supplier not found.</p>
				<Button onClick={() => navigate({ to: "/admin/suppliers" })}>
					Back to suppliers
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-5 pb-10">
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={() => navigate({ to: `/admin/suppliers/${supplierId}` as any })}
					className="group flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider text-foreground hover:bg-muted"
				>
					<RiArrowLeftSLine size={16} className="transition-transform group-hover:-translate-x-1" />
					Back to Supplier
				</Button>
			</div>

			<AdminPageHeader
				title="Edit Supplier"
				subtitle={`Update ${company.name}`}
				badge="Supplier Management"
			/>

			<AdminCard noPadding>
				<div className="flex border-b-2 border-border">
					<button
						onClick={() => setCurrentStep(1)}
						className={`flex flex-1 items-center justify-center gap-3 border-r-2 border-border py-5 text-xs font-heading font-bold uppercase tracking-widest transition-all ${
							currentStep === 1
								? "bg-primary text-primary-foreground"
								: "bg-background text-muted-foreground hover:bg-muted"
						}`}
					>
						<RiBuildingLine size={16} />
						Company
					</button>
					<button
						onClick={() => setCurrentStep(2)}
						className={`flex flex-1 items-center justify-center gap-3 py-5 text-xs font-heading font-bold uppercase tracking-widest transition-all ${
							currentStep === 2
								? "bg-primary text-primary-foreground"
								: "bg-background text-muted-foreground hover:bg-muted"
						}`}
					>
						<RiUserLine size={16} />
						Contact
					</button>
				</div>
			</AdminCard>

			<div className="mx-auto mt-2 w-full max-w-3xl">
				<SupplierProvisionForm
					mode="edit"
					currentStep={currentStep}
					onStepChange={setCurrentStep}
					initialValues={initialValues}
					onSubmit={handleSubmit}
					onCancel={() => navigate({ to: `/admin/suppliers/${supplierId}` as any })}
				/>
			</div>

			{saving && <p className="text-sm text-muted-foreground">Saving supplier...</p>}
		</div>
	);
}
