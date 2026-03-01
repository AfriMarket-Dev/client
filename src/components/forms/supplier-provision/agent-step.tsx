import { RiArrowLeftLine, RiSaveLine } from "@remixicon/react";
import type React from "react";
import { AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AgentStepProps {
	form: any;
	mode: "add" | "edit";
	onBack: () => void;
}

export const AgentStep: React.FC<AgentStepProps> = ({ form, mode, onBack }) => {
	return (
		<AdminCard
			title={mode === "add" ? "Authorized Agent" : "Agent Protocol"}
			subtitle={
				mode === "add"
					? "Entity contact protocol"
					: "Update authorization details"
			}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			  <form.Field name="fullName">
			    {(field: any) => (
			      <div className="space-y-2">
			        <label
			          htmlFor="fullName"
			          className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2"
			        >
			          Full Name <span className="text-primary">*</span>
			        </label>
			        <Input
			          id="fullName"
			          name={field.name}
			          value={field.state.value}
			          onBlur={field.handleBlur}
			          onChange={(e) => field.handleChange(e.target.value)}
			          className="h-12 text-sm bg-background font-bold uppercase tracking-wider shadow-none"
			          placeholder="LEGAL FULL NAME..."
			          required
			        />
			      </div>
			    )}
			  </form.Field>

			  <form.Field name="email">
			    {(field: any) => (
			      <div className="space-y-2">
			        <label
			          htmlFor="email"
			          className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2"
			        >
			          Email Address <span className="text-primary">*</span>
			        </label>
			        <Input
			          id="email"
			          name={field.name}
			          value={field.state.value}
			          onBlur={field.handleBlur}
			          onChange={(e) => field.handleChange(e.target.value)}
			          type="email"
			          className="h-12 text-sm bg-background font-mono font-bold uppercase tracking-widest shadow-none"
			          placeholder="AGENT@COMPANY.RW"
			          required
			        />
			      </div>
			    )}
			  </form.Field>

			  <form.Field name="phoneNumber">
			    {(field: any) => (
			      <div className="space-y-2">
			        <label
			          htmlFor="phoneNumber"
			          className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2"
			        >
			          Secure Phone <span className="text-primary">*</span>
			        </label>
			        <Input
			          id="phoneNumber"
			          name={field.name}
			          value={field.state.value}
			          onBlur={field.handleBlur}
			          onChange={(e) => field.handleChange(e.target.value)}
			          type="tel"
			          className="h-12 text-sm bg-background font-mono font-bold uppercase tracking-widest shadow-none"
			          placeholder="+250 7XX XXX XXX"
			          required
			        />
			      </div>
			    )}
			  </form.Field>

			  <form.Field name="position">
			    {(field: any) => (
			      <div className="space-y-2">
			        <label
			          htmlFor="position"
			          className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2"
			        >
			          Corporate Position
			        </label>
			        <Input
			          id="position"
			          name={field.name}
			          value={field.state.value}
			          onBlur={field.handleBlur}
			          onChange={(e) => field.handleChange(e.target.value)}
			          className="h-12 text-sm bg-background font-bold uppercase tracking-wider shadow-none"
			          placeholder="E.G. DIRECTOR..."
			        />
			      </div>
			    )}
			  </form.Field>

			  <form.Field name="nationalId">
			    {(field: any) => (
			      <div className="space-y-2">
			        <label
			          htmlFor="nationalId"
			          className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2"
			        >
			          National ID (NID)
			        </label>
			        <Input
			          id="nationalId"
			          name={field.name}
			          value={field.state.value}
			          onBlur={field.handleBlur}
			          onChange={(e) => field.handleChange(e.target.value)}
			          className="h-12 text-sm bg-background font-mono font-bold shadow-none"
			          placeholder="1 199X X XXXXXXX X XX"
			        />
			      </div>
			    )}
			  </form.Field>
			</div>
			{mode === "edit" && (
				<div className="flex justify-between pt-6 border-t-2 border-border mt-4">
					<Button
						type="button"
						variant="outline"
						onClick={onBack}
						className="rounded-sm h-12 px-6 border border-border font-heading font-bold uppercase text-xs tracking-widest shadow-none"
					>
						<RiArrowLeftLine size={16} className="mr-2" />
						Back
					</Button>
					<Button
						type="submit"
						className="rounded-sm h-12 px-8 font-heading font-bold uppercase text-xs tracking-widest shadow-none bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<RiSaveLine size={16} className="mr-2" />
						Synchronize Changes
					</Button>
				</div>
			)}
		</AdminCard>
	);
};
