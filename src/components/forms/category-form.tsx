import React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CategoryFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  initialValues?: {
    name: string;
    description: string;
    icon?: string;
  };
  mode: "add" | "edit";
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = {
    name: "",
    description: "",
    icon: "",
  },
  mode,
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
      className="space-y-6 pt-4"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block ml-1">
              Category Name
            </label>
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="h-12 text-sm bg-background font-bold uppercase tracking-wider"
              placeholder="ENTER NAME..."
              required
            />
          </div>
        )}
      />

      <form.Field
        name="description"
        children={(field) => (
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block ml-1">
              Description
            </label>
            <Textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              className="text-sm resize-none bg-background font-medium uppercase tracking-wider"
              placeholder="ENTER DESCRIPTION..."
              required
            />
          </div>
        )}
      />

      {mode === "add" && (
        <form.Field
          name="icon"
          children={(field) => (
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block ml-1">
                Icon Reference
              </label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-12 text-sm bg-background font-mono"
                placeholder="e.g., Smartphone, Shirt..."
              />
            </div>
          )}
        />
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 rounded-sm border border-border h-11 font-heading font-bold uppercase text-xs tracking-wider shadow-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 rounded-sm h-11 font-heading font-bold uppercase text-xs tracking-wider shadow-none"
        >
          {mode === "add" ? "Create Category" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
