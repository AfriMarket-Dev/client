import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { SignInForm } from "@/components/forms/SignInForm";
import { useSignInMutation } from "@/app/api/auth";
import { setUser, setToken } from "@/app/features/authSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname;

  const handleSignIn = async (data: { email: string; password?: string }) => {
    try {
      const result = await signIn(data).unwrap();
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
      const isProvider = result.user.role === "provider";

      if (from) {
        navigate(from, { replace: true });
      } else if (isAdmin) {
        navigate("/admin", { replace: true });
      } else if (isProvider) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("SignIn failed", err);
    }
  };

  const serverError =
    error && "data" in error
      ? (error.data as { message?: string })?.message || "Sign in failed"
      : error
        ? "Network error. Please try again."
        : undefined;

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-heading font-bold uppercase tracking-wider">
          Return Home
        </span>
      </button>

      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold uppercase mb-2 text-foreground">
          Sign In
        </h2>
        <p className="text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <SignInForm
        onSubmit={handleSignIn}
        isLoading={isLoading}
        serverError={serverError}
      />

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          New to the platform?{" "}
          <button
            onClick={() => navigate("/auth/signup")}
            className="text-primary font-bold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </>
  );
};

export default SignInPage;
