import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Building, User } from "lucide-react";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { SupplierProvisionForm } from "@/components/forms/SupplierProvisionForm";

export default function AdminEditSupplierPage() {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  // Mock: In real app, fetch supplier data by supplierId
  const initialValues = {
    companyName: "Tech Solutions Ltd",
    industry: "Technology",
    registrationId: "102834756",
    location: "Kigali City",
    district: "Gasabo",
    sectorAddress: "KG 123 St, Tech House",
    fullName: "John Doe",
    email: "john.doe@techsolutions.rw",
    phoneNumber: "+250 788 123 456",
    position: "Managing Director",
    nationalId: "1199080076543210",
  };

  const handleSubmit = (values: any) => {
    console.log("Updating supplier:", values);
    alert("Supplier updated successfully!");
    navigate(`/admin/suppliers/${supplierId}`);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
          className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider shadow-none"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Entity
        </Button>
      </div>

      <AdminPageHeader
        title="Update Profile"
        subtitle={`Modifying ${initialValues.companyName}`}
        badge="Entity Modification"
      />

      {/* Progress Steps moved to Page */}
      <AdminCard noPadding>
        <div className="flex border-b-2 border-border">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 text-xs font-heading font-bold uppercase tracking-widest transition-all border-r-2 border-border ${
              currentStep === 1
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <Building size={16} />
            Corporate Parameters
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 text-xs font-heading font-bold uppercase tracking-widest transition-all ${
              currentStep === 2
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <User size={16} />
            Authorized Agent
          </button>
        </div>
      </AdminCard>

      <div className="max-w-3xl mx-auto w-full mt-2">
        <SupplierProvisionForm
          mode="edit"
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/admin/suppliers/${supplierId}`)}
        />
      </div>
    </div>
  );
}
