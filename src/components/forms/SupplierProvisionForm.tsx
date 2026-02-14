import React from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, ArrowLeft, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminCard } from "@/components/admin";

interface SupplierProvisionFormProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
  mode?: "add" | "edit";
}

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

export const SupplierProvisionForm: React.FC<SupplierProvisionFormProps> = ({
  currentStep,
  onStepChange,
  onSubmit,
  onCancel,
  initialValues,
  mode = "add",
}) => {
  const form = useForm({
    defaultValues: initialValues || {
      companyName: "",
      industry: "",
      registrationId: "",
      location: "",
      district: "",
      sectorAddress: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      position: "",
      nationalId: "",
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentStep < (mode === "add" ? 3 : 2)) {
      onStepChange(currentStep + 1);
    } else {
      form.handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    } else {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleNext} className="w-full space-y-6">
      {currentStep === 1 && (
        <AdminCard
          title="Identity Parameters"
          subtitle={
            mode === "add"
              ? "Primary company identifiers"
              : "Override corporate data"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form.Field
              name="companyName"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Legal Company Name <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="industry"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Primary Industry <span className="text-primary">*</span>
                  </label>
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-widest"
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
            />

            <form.Field
              name="registrationId"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Registration ID (TIN/RDB){" "}
                    <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="location"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Operational Province <span className="text-primary">*</span>
                  </label>
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-widest"
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
            />

            <form.Field
              name="district"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    District <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="sectorAddress"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Sector & Street Address
                  </label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-12 text-sm bg-background font-medium uppercase tracking-wider shadow-none"
                    placeholder="SECTOR, STREET, BLDG..."
                  />
                </div>
              )}
            />
          </div>

          {mode === "edit" && (
            <div className="flex justify-end pt-6 border-t-2 border-border mt-4">
              <Button
                type="submit"
                className="rounded-sm h-12 px-8 font-heading font-bold uppercase text-xs tracking-widest shadow-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue To Agent
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </AdminCard>
      )}

      {currentStep === 2 && (
        <AdminCard
          title={mode === "add" ? "Authorized Agent" : "Agent Protocol"}
          subtitle={
            mode === "add"
              ? "Entity contact protocol"
              : "Update authorization details"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form.Field
              name="fullName"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="phoneNumber"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Secure Phone <span className="text-primary">*</span>
                  </label>
                  <Input
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
            />

            <form.Field
              name="position"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Corporate Position
                  </label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-12 text-sm bg-background font-bold uppercase tracking-wider shadow-none"
                    placeholder="E.G. DIRECTOR..."
                  />
                </div>
              )}
            />

            <form.Field
              name="nationalId"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    National ID (NID)
                  </label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-12 text-sm bg-background font-mono font-bold shadow-none"
                    placeholder="1 199X X XXXXXXX X XX"
                  />
                </div>
              )}
            />
          </div>

          {mode === "edit" && (
            <div className="flex justify-between pt-6 border-t-2 border-border mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="rounded-sm h-12 px-6 border-2 border-border font-heading font-bold uppercase text-xs tracking-widest shadow-none"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                className="rounded-sm h-12 px-8 font-heading font-bold uppercase text-xs tracking-widest shadow-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save size={16} className="mr-2" />
                Synchronize Changes
              </Button>
            </div>
          )}
        </AdminCard>
      )}

      {currentStep === 3 && mode === "add" && (
        <AdminCard title="Final Review" subtitle="Verify data stream integrity">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted/30 p-6 border-2 border-border border-dashed rounded-sm">
                <h3 className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2">
                  Entity Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Company Name
                    </span>
                    <span className="font-bold text-sm uppercase">
                      {form.getFieldValue("companyName")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Registry TIN
                    </span>
                    <span className="font-mono text-sm font-black">
                      {form.getFieldValue("registrationId")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Location
                    </span>
                    <span className="font-bold text-sm uppercase">
                      {form.getFieldValue("district")},{" "}
                      {form.getFieldValue("location")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 border-2 border-border border-dashed rounded-sm">
                <h3 className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2">
                  Agent Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Primary Contact
                    </span>
                    <span className="font-bold text-sm uppercase">
                      {form.getFieldValue("fullName")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Secure Email
                    </span>
                    <span className="font-mono text-sm font-black lowercase">
                      {form.getFieldValue("email")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[9px] uppercase font-black tracking-widest block mb-1">
                      Authorized Role
                    </span>
                    <span className="font-bold text-sm uppercase">
                      {form.getFieldValue("position") || "DEFAULT AGENT"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-sm flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-sm">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-green-800 uppercase tracking-widest">
                  Stream Validated
                </p>
                <p className="text-[10px] text-green-700 mt-1 uppercase font-bold tracking-wider leading-relaxed">
                  Entity is ready for platform provision. Final authorization
                  will create secure access credentials.
                </p>
              </div>
            </div>
          </div>
        </AdminCard>
      )}

      {mode === "add" && (
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 items-center gap-2 px-6 h-12 border-2 border-border rounded-sm font-heading font-bold uppercase text-xs tracking-widest transition-all shadow-none"
          >
            <ArrowLeft size={16} />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>

          {currentStep < 3 ? (
            <Button
              type="submit"
              className="flex-[2] items-center gap-2 px-6 h-12 rounded-sm shadow-none bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold uppercase text-xs tracking-widest"
            >
              Continue Stream
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-[2] items-center gap-2 px-6 h-12 bg-green-600 hover:bg-green-700 text-white border-none rounded-sm font-heading font-bold uppercase text-xs tracking-widest shadow-none"
            >
              <Save size={16} />
              Confirm Provision
            </Button>
          )}
        </div>
      )}
    </form>
  );
};
