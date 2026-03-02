import { RiLoader4Line } from "@remixicon/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "@/services/api/auth";

export function VerifyEmailPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth/verify-email" }) as {
		token?: string;
	};
	const [verifyEmail] = useVerifyEmailMutation();

	useEffect(() => {
		const handleVerify = async () => {
			if (!search.token) {
				toast.error("Invalid verification token.");
				navigate({ to: "/auth/signin" });
				return;
			}

			try {
				await verifyEmail({ token: search.token }).unwrap();
				toast.success("Email verified successfully! You can now sign in.");
				navigate({ to: "/auth/signin" });
			} catch (err) {
				console.error("Verification failed", err);
				toast.error("Email verification failed. The link may have expired.");
				navigate({ to: "/auth/signin" });
			}
		};

		handleVerify();
	}, [search.token, verifyEmail, navigate]);

	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<RiLoader4Line className="w-12 h-12 text-primary animate-spin mb-6" />
			<h2 className="text-2xl font-heading font-bold uppercase mb-2">
				Verifying Your Email
			</h2>
			<p className="text-muted-foreground">
				Please wait while we activate your account.
			</p>
		</div>
	);
}
