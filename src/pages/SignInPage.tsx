import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignIn from "@/components/SignIn";
import { useSignInMutation } from "@/app/api/auth";
import { setUser, setToken } from "@/app/features/authSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname;

  const handleSignInComplete = async (
    _type: "customer" | "supplier",
    phone: string,
    otp?: string,
  ) => {
    try {
      const result = await signIn({ phone, otp }).unwrap();
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
      const isSupplier = result.user.role === "supplier" || result.user.role === "provider";

      if (from) {
        navigate(from, { replace: true });
      } else if (isAdmin) {
        navigate("/admin", { replace: true });
      } else if (isSupplier) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch {}
  };

  const serverError =
    error && "data" in error
      ? (error.data as { message?: string })?.message || "Sign in failed"
      : error
        ? "Network error. Please try again."
        : undefined;

  return (
    <SignIn
      onBack={() => navigate("/")}
      onSignInComplete={handleSignInComplete}
      onSwitchToSignUp={() => navigate("/auth/signup")}
      isLoading={isLoading}
      serverError={serverError}
    />
  );
};

export default SignInPage;
