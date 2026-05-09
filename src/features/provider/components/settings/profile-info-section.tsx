import { useForm } from "@tanstack/react-form";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFormFieldErrors } from "@/lib/utils";
import { useUpdateProfileMutation } from "@/services/api/users";
import { FormField } from "@/shared/components/form-field";
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
			<div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-muted/5 border border-border border-dashed rounded-none shadow-none">
				<div className="relative shrink-0">
					<div className="w-28 h-28 rounded-none bg-muted border border-border overflow-hidden flex items-center justify-center text-3xl font-bold text-foreground/20">
						{user.image ? (
							<img
								src={user.image}
								alt={user.name}
								className="w-full h-full object-cover"
							/>
						) : (
							user.name?.charAt(0) || "U"
						)}
					</div>
					<button
						type="button"
						className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-none hover:scale-110 transition-transform shadow-none border border-background"
					>
						<Camera className="w-4 h-4" />
					</button>
				</div>
				<div className="text-center sm:text-left flex-1">
					<h4 className="font-bold text-foreground text-sm uppercase tracking-tight mb-1">
						Profile Identity
					</h4>
					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
						Human identification for system audits
					</p>
					<Button
						variant="outline"
						size="sm"
						className="font-bold text-[10px] uppercase tracking-widest h-9 px-4 border border-border hover:bg-muted shadow-none rounded-none"
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
								className="h-11 bg-background font-medium rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
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
								className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
								placeholder="+250..."
							/>
						</FormField>
					)}
				/>

				<div className="space-y-2">
					<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
						Verified Email
					</label>
					<Input
						value={user.email}
						disabled
						className="h-11 bg-muted/20 font-medium text-sm rounded-none border-border shadow-none"
					/>
				</div>

				<div className="flex items-end pb-1">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting || isLoading}
								className="w-full h-11 rounded-none font-bold uppercase text-xs tracking-widest shadow-none"
							>
								{isSubmitting || isLoading
									? "Saving Identity..."
									: "Update Profile"}
							</Button>
						)}
					/>
				</div>
			</form>
		</div>
	);
}
