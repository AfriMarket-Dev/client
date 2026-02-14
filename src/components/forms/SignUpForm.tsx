import React from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface SignUpFormProps {
  role: "buyer" | "provider";
  onSubmit: (data: {
    name: string;
    email: string;
    password?: string;
    role: "buyer" | "provider";
  }) => void;
  isLoading?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  role,
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      onSubmit({
        ...value,
        role,
      });
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
      <div className="space-y-4">
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  className="pl-12 h-14 bg-muted/30 border-2 border-transparent focus:border-primary rounded-sm transition-all text-lg shadow-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}
        />

        <form.Field
          name="email"
          children={(field) => (
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  className="pl-12 h-14 bg-muted/30 border-2 border-transparent focus:border-primary rounded-sm transition-all text-lg shadow-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  className="pl-12 h-14 bg-muted/30 border-2 border-transparent focus:border-primary rounded-sm transition-all text-lg shadow-none"
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                />
              </div>
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-lg font-heading font-bold uppercase tracking-widest rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
      >
        {isLoading ? "creating Account..." : "Create Account"}
        {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
    </form>
  );
};
