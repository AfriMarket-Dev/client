import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useCreateCompanyMutation } from "@/app/api/companies";
import { useGetCompanyCategoriesQuery } from "@/app/api/company-categories";
import { useGetProfileQuery } from "@/app/api/users";
import { setUser } from "@/app/features/auth-slice";
import { CompanySetupForm } from "@/components/forms/company-setup-form";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const { data: categoriesData } = useGetCompanyCategoriesQuery({ limit: 100 });
  const { refetch: refetchProfile } = useGetProfileQuery();

  const handleCompanySubmit = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        category: values.categoryId,
        type: values.companyType,
        province: values.province,
        district: values.district,
        sector: values.sector,
        cell: values.cell,
        village: values.village,
        description: values.description,
      };

      await createCompany(payload).unwrap();

      const updatedProfile = await refetchProfile().unwrap();
      dispatch(
        setUser({
          id: updatedProfile.id,
          email: updatedProfile.email,
          name: updatedProfile.name,
          role: updatedProfile.role,
          needsOnboarding: false,
        }),
      );

      toast.success(
        "Business profile created! Please ensure your email is verified to manage listings.",
      );
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      console.error("Onboarding failed", err);
      toast.error("Failed to complete business profile setup.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8 industrial-grain">
      <div className="w-full max-w-2xl bg-card border border-border/40 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Step 1: Profile Setup
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black uppercase text-foreground tracking-tighter leading-none">
              Company Setup
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
              Complete your business profile to start receiving inquiries.
            </p>
          </div>

          <CompanySetupForm
            onSubmit={handleCompanySubmit}
            isLoading={isLoading}
            categories={categoriesData?.data}
            onSkip={() => navigate({ to: "/" })}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
