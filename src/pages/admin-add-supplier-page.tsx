import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Building, User, CheckCircle } from "lucide-react";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { SupplierProvisionForm } from "@/components/forms/supplier-provision-form";

export default function AdminAddSupplierPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (values: any) => {
    console.log("Adding supplier:", values);
    alert("Supplier added successfully!");
    navigate("/admin/suppliers");
  };

  const steps = [
    { step: 1, label: "Identity", icon: Building },
    { step: 2, label: "Authorized", icon: User },
    { step: 3, label: "Confirm", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/suppliers")}
          className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider shadow-none"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Suppliers
        </Button>
      </div>

      <AdminPageHeader
        title="New Provision"
        subtitle="Onboard a new authorized partner entity"
        badge="Entity Management"
      />

      {/* Progress Steps moved to Page */}
      <AdminCard noPadding>
        <div className="flex justify-between items-center max-w-3xl mx-auto px-8 py-6">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="flex flex-col items-center relative z-10 w-1/3"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-sm flex items-center justify-center border transition-all duration-500 z-10 shadow-lg ${
                    currentStep >= item.step
                      ? "bg-primary border-primary text-primary-foreground scale-110 shadow-primary/20"
                      : "bg-background border-border text-muted-foreground shadow-none"
                  }`}
                >
                  <item.icon size={20} />
                </div>
                {index < 2 && (
                  <div
                    className={`absolute left-1/2 top-1/2 w-full h-[2px] -z-10 -translate-y-1/2 translate-x-6 border-t-2 border-dashed ${
                      currentStep > item.step
                        ? "border-primary"
                        : "border-border"
                    }`}
                    style={{ width: "calc(300% - 3rem)" }}
                  />
                )}
              </div>

              <span
                className={`text-[10px] font-heading font-bold uppercase tracking-widest mt-4 transition-colors duration-500 ${
                  currentStep >= item.step
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="max-w-3xl mx-auto w-full">
        <SupplierProvisionForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/suppliers")}
        />
      </div>
    </div>
  );
}
