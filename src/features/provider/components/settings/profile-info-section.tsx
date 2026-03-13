import { useForm } from "@tanstack/react-form";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/services/api/users";
import { FormField } from "@/shared/components";
import { getFormFieldErrors } from "@/lib/utils";
import type { UserProfile } from "@/types";

interface ProfileInfoSectionProps {
	user: UserProfile;
}

export function ProfileInfoSection({ user }: ProfileInfoSectionProps) {
	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const form = useForm({
		defaultValues: {
			name: user.name || "",
			phoneNumber: user.phoneNumber || "",
		},
		onSubmit: async ({ value }) => {
			try {
				await updateProfile({
					id: user.id,
					data: value,
				}).unwrap();
				toast.success("Profile updated successfully");
			} catch (error) {
				console.error(error);
				toast.error("Failed to update profile");
			}
		},
	});

	return (
		<div className="space-y-10">
			{/* Avatar */}
			<div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-muted/20 border border-border border-dashed rounded-none">
				<div className="relative shrink-0">
					<div className="w-28 h-28 rounded-none bg-muted border border-border overflow-hidden flex items-center justify-center text-3xl font-display font-black text-foreground/20">
						{user.image ? (
							<img src={user.image} alt={user.name} className="w-full h-full object-cover" />
						) : (
							user.name?.charAt(0) || "U"
						)}
					</div>
					<button
						type="button"
						className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2.5 rounded-none hover:scale-110 transition-transform shadow-lg shadow-primary/20 border border-background"
					>
						<Camera className="w-4 h-4" />
					</button>
				</div>
				<div className="text-center sm:text-left flex-1">
					<h4 className="font-heading font-black text-foreground uppercase tracking-[0.2em] text-[10px] mb-1">
						Profile Identity
					</h4>
					<p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-4">
						Human identification for system audits
					</p>
					<Button
						variant="outline"
						size="sm"
						className="font-heading font-black uppercase text-[9px] tracking-widest h-9 px-4 border border-border hover:bg-muted shadow-none rounded-none"
					>
						<Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Image
					</Button>
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="grid md:grid-cols-2 gap-8"
			>
				<form.Field
					name="name"
					children={(field) => (
						<FormField
							label="Full Legal Name"
							error={getFormFieldErrors(field.state.meta.errors)}
						>
							<Input
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="h-12 bg-background font-bold uppercase tracking-wider rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
							/>
						</FormField>
					)}
				/>

				<form.Field
					name="phoneNumber"
					children={(field) => (
						<FormField
							label="Personal Contact"
							error={getFormFieldErrors(field.state.meta.errors)}
						>
							<Input
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="h-12 bg-background font-mono text-xs font-bold rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
								placeholder="+250..."
							/>
						</FormField>
					)}
				/>

				<div className="space-y-2">
					<label className="text-[9px] font-heading font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
						Verified Email
					</label>
					<Input
						value={user.email}
						disabled
						className="h-12 bg-muted/20 font-mono text-xs font-bold rounded-none border-border/40"
					/>
				</div>

				<div className="flex items-end pb-1">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting || isLoading}
								className="w-full h-12 rounded-none font-heading font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
							>
								{isSubmitting || isLoading ? "Saving Identity..." : "Update Profile"}
							</Button>
						)}
					/>
				</div>
			</form>
		</div>
	);
}
