import { RiArrowRightLine } from "@remixicon/react";
import type React from "react";
import { AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const industries = [
	"Electronics",
	"Fashion & Textiles",
	"Home & Garden",
	"Beauty & Health",
	"Automotive",
	"Industrial Equipment",
	"Food & Beverages",
	"Agriculture",
	"Construction",
	"Technology",
	"Healthcare",
	"Education",
	"Other",
];

const rwandaLocations = [
	"Kigali City",
	"Eastern Province",
	"Northern Province",
	"Southern Province",
	"Western Province",
];

interface IdentityStepProps {
	form: any;
	mode: "add" | "edit";
}

export const IdentityStep: React.FC<IdentityStepProps> = ({ form, mode }) => {
	return (
		<AdminCard
			title="Identity Parameters"
			subtitle={
				mode === "add"
					? "Primary company identifiers"
					: "Override corporate data"
			}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<form.Field name="companyName">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="companyName"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        Legal Company Name <span className="text-primary">*</span>
				      </label>
				      <Input
				        id="companyName"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="h-12 text-sm bg-background font-bold uppercase tracking-wider shadow-none"
				        placeholder="OFFICIAL NAME..."
				        required
				      />
				    </div>
				  )}
				</form.Field>

				<form.Field name="industry">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="industry"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        Primary Industry <span className="text-primary">*</span>
				      </label>
				      <select
				        id="industry"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-widest"
				        required
				      >
				        <option value="">SELECT STREAM...</option>
				        {industries.map((ind) => (
				          <option key={ind} value={ind}>
				            {ind.toUpperCase()}
				          </option>
				        ))}
				      </select>
				    </div>
				  )}
				</form.Field>

				<form.Field name="registrationId">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="registrationId"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        Registration ID (TIN/RDB){" "}
				        <span className="text-primary">*</span>
				      </label>
				      <Input
				        id="registrationId"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="h-12 text-sm bg-background font-mono font-bold uppercase tracking-widest shadow-none"
				        placeholder="TIN-000-000-000"
				        required
				      />
				    </div>
				  )}
				</form.Field>

				<form.Field name="location">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="location"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        Operational Province <span className="text-primary">*</span>
				      </label>
				      <select
				        id="location"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-widest"
				        required
				      >
				        <option value="">SELECT REGION...</option>
				        {rwandaLocations.map((loc) => (
				          <option key={loc} value={loc}>
				            {loc.toUpperCase()}
				          </option>
				        ))}
				      </select>
				    </div>
				  )}
				</form.Field>

				<form.Field name="district">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="district"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        District <span className="text-primary">*</span>
				      </label>
				      <Input
				        id="district"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="h-12 text-sm bg-background font-bold uppercase tracking-wider shadow-none"
				        placeholder="DISTRICT NAME..."
				        required
				      />
				    </div>
				  )}
				</form.Field>

				<form.Field name="sectorAddress">
				  {(field: any) => (
				    <div className="space-y-2">
				      <label
				        htmlFor="sectorAddress"
				        className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1"
				      >
				        Sector & Street Address
				      </label>
				      <Input
				        id="sectorAddress"
				        name={field.name}
				        value={field.state.value}
				        onBlur={field.handleBlur}
				        onChange={(e) => field.handleChange(e.target.value)}
				        className="h-12 text-sm bg-background font-medium uppercase tracking-wider shadow-none"
				        placeholder="SECTOR, STREET, BLDG..."
				      />
				    </div>
				  )}
				</form.Field>			</div>

			{mode === "edit" && (
				<div className="flex justify-end pt-6 border-t-2 border-border mt-4">
					<Button
						type="submit"
						className="rounded-sm h-12 px-8 font-heading font-bold uppercase text-xs tracking-widest shadow-none bg-primary text-primary-foreground hover:bg-primary/90"
					>
						Continue To Agent
						<RiArrowRightLine size={16} className="ml-2" />
					</Button>
				</div>
			)}
		</AdminCard>
	);
};
