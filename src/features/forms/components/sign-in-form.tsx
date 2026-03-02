import {
	RiAlertLine,
	RiArrowRightLine,
	RiLockLine,
	RiMailLine,
} from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/shared/components";

interface SignInFormProps {
	onSubmit: (data: { email: string; password?: string }) => void;
	isLoading?: boolean;
	serverError?: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({
	onSubmit,
	isLoading = false,
	serverError,
}) => {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			onSubmit(value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="w-full space-y-6"
		>
			{serverError && (
				<div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-none text-sm flex items-center gap-3">
					<RiAlertLine className="w-4 h-4 shrink-0" />
					{serverError}
				</div>
			)}

			<form.Field
				name="email"
				children={(field) => (
					<FormField label="Email Address" required>
						<div className="relative">
							<RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								type="email"
								placeholder="name@company.com"
								className="pl-10 h-12 shadow-none rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
								required
							/>
						</div>
					</FormField>
				)}
			/>

			<form.Field
				name="password"
				children={(field) => (
					<FormField
						label="Password"
						required
						headerActions={
							<a
								href="#"
								className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline"
							>
								Forgot?
							</a>
						}
					>
						<div className="relative">
							<RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								type="password"
								placeholder="••••••••"
								className="pl-10 h-12 shadow-none rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
								required
							/>
						</div>
					</FormField>
				)}
			/>

			<Button
				type="submit"
				className="w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 border-none rounded-none"
				disabled={isLoading}
			>
				{isLoading ? "Authenticating..." : "Initialize Session"}
				{!isLoading && <RiArrowRightLine className="ml-2 w-4 h-4" />}
			</Button>
		</form>
	);
};
