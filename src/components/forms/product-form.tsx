import { useForm } from "@tanstack/react-form";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
	onSubmit: (values: any) => void;
	onCancel: () => void;
	initialValues?: {
		name: string;
		category: string;
		description: string;
	};
}

export const ProductForm: React.FC<ProductFormProps> = ({
	onSubmit,
	onCancel,
	initialValues = {
		name: "",
		category: "",
		description: "",
	},
}) => {
	const form = useForm({
		defaultValues: initialValues,
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
			className="space-y-6"
		>
			<form.Field
				name="name"
				children={(field) => (
					<div>
						<label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
							Product Name
						</label>
						<Input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="h-11 text-sm bg-background uppercase tracking-wider font-medium"
							placeholder="Enter product name"
							required
						/>
					</div>
				)}
			/>

			<form.Field
				name="category"
				children={(field) => (
					<div>
						<label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
							Category
						</label>
						<select
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-11 font-heading font-bold uppercase text-xs tracking-widest bg-background"
							required
						>
							<option value="">Select category</option>
							<option value="Electronics">Electronics</option>
							<option value="Construction">Construction</option>
							<option value="Textiles">Textiles</option>
						</select>
					</div>
				)}
			/>

			<form.Field
				name="description"
				children={(field) => (
					<div>
						<label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
							Description
						</label>
						<Textarea
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							rows={3}
							className="text-sm resize-none bg-background font-medium"
							placeholder="Enter product description"
							required
						/>
					</div>
				)}
			/>

			<div className="flex gap-3 pt-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					className="flex-1 rounded-sm border border-border h-11 font-heading font-bold uppercase text-xs tracking-wider"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					className="flex-1 rounded-sm h-11 font-heading font-bold uppercase text-xs tracking-wider shadow-lg shadow-primary/20"
				>
					Create
				</Button>
			</div>
		</form>
	);
};
