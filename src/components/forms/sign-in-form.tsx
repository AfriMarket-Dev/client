import React from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-sm text-sm flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {serverError}
        </div>
      )}

      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className="pl-10 h-12 shadow-none"
                required
              />
            </div>
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Password
              </label>
              <a
                href="#"
                className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 shadow-none"
                required
              />
            </div>
          </div>
        )}
      />

      <Button
        type="submit"
        className="w-full h-12 text-xs font-bold uppercase tracking-widest shadow-none"
        disabled={isLoading}
      >
        {isLoading ? "Authenticating..." : "Initialize Session"}
        {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
      </Button>
    </form>
  );
};
