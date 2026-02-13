import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUp from "@/components/SignUp";
import { useSignUpMutation } from "@/app/api/auth";
import { setUser, setToken } from "@/app/features/authSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const handleSignUpComplete = async (
    role: "buyer" | "provider",
    data: { phone: string; name: string; district: string; otp?: string },
  ) => {
    try {
      const result = await signUp({
        phone: data.phone,
        name: data.name,
        district: data.district,
        role: role,
        otp: data.otp,
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

      if (role === "provider") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch {}
  };

  const serverError =
    error && "data" in error
      ? (error.data as { message?: string })?.message || "Sign up failed"
      : error
        ? "Network error. Please try again."
        : undefined;

  return (
    <SignUp
      onBack={() => navigate("/")}
      onSignUpComplete={handleSignUpComplete}
      isLoading={isLoading}
      serverError={serverError}
    />
  );
};

export default SignUpPage;
