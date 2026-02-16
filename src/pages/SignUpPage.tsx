import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Briefcase, Store, ArrowLeft } from "lucide-react";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { useSignUpMutation } from "@/app/api/auth";
import { setUser, setToken } from "@/app/features/authSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [step, setStep] = useState<"role" | "details">("role");
  const [role, setRole] = useState<"buyer" | "provider">("buyer");

  const handleSignUp = async (data: {
    name: string;
    email: string;
    password?: string;
    role: "buyer" | "provider";
  }) => {
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      }).unwrap();

      dispatch(setToken(result.token));
      dispatch(
        setUser({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        }),
      );

      const isAdmin =
        result.user.role === "admin" || result.user.role === "agent";
      const isSupplier =
        result.user.role === "supplier" || result.user.role === "provider";

      if (isAdmin) {
        navigate("/admin", { replace: true });
      } else if (isSupplier) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("SignUp failed", err);
    }
  };

  const handleRoleSelect = (selectedRole: "buyer" | "provider") => {
    setRole(selectedRole);
    setStep("details");
  };

  return (
    <>
      {step === "details" ? (
        <button
          onClick={() => setStep("role")}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider">
            Back to Role Selection
          </span>
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider">
            Return Home
          </span>
        </button>
      )}

      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold uppercase mb-2 text-foreground">
          {step === "role" ? "Select Account Type" : "Account Details"}
        </h2>
        <p className="text-muted-foreground">
          {step === "role"
            ? "Choose how you want to use AfrikaMarket."
            : `Completing registration as a ${role === "buyer" ? "Builder/Contractor" : "Supplier"}.`}
        </p>
      </div>

      {step === "role" ? (
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect("buyer")}
            className="w-full p-6 border border-muted hover:border-primary/50 bg-muted/10 hover:bg-muted/20 rounded-sm transition-all text-left group flex items-start space-x-4"
          >
            <div className="p-3 bg-background rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold uppercase mb-1">
                Buyer
              </h3>
              <p className="text-sm text-muted-foreground">
                I want to source materials and manage projects.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect("provider")}
            className="w-full p-6 border border-muted hover:border-primary/50 bg-muted/10 hover:bg-muted/20 rounded-sm transition-all text-left group flex items-start space-x-4"
          >
            <div className="p-3 bg-background rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold uppercase mb-1">
                Provider
              </h3>
              <p className="text-sm text-muted-foreground">
                I want to sell construction materials and reach buyers.
              </p>
            </div>
          </button>
        </div>
      ) : (
        <SignUpForm role={role} onSubmit={handleSignUp} isLoading={isLoading} />
      )}

      <div className="mt-8 text-center">
        <span className="text-muted-foreground">Already have an account? </span>
        <button
          type="button"
          onClick={() => navigate("/auth/signin")}
          className="text-primary font-bold hover:underline"
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default SignUpPage;
