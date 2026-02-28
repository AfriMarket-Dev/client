import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader4Line,
} from "@remixicon/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/auth/verify-email" });
  const [status, setStep] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStep("error");
        return;
      }

      try {
        console.log("Initiating verification with token:", token);
        const response = await fetch(
          `${API_BASE}/api/auth/verify-email?token=${token}&callbackURL=http://localhost:4000/auth/signin`,
          {
            method: "GET",
            redirect: "manual",
          },
        );

        console.log("Verification Response Status:", response.status);
        console.log("Verification Response Type:", response.type);

        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        console.log("Verification Response Headers:", headers);

        if (response.type === "opaqueredirect" || response.status === 0) {
          console.log(
            "Caught manual redirect. Protocol successful or pending.",
          );
          setStep("success");
          return;
        }

        try {
          const data = await response.json();
          console.log("Verification Response Data:", data);
        } catch (e) {
          console.log("Response body not JSON or empty");
        }

        if (response.ok || response.status === 302) {
          setStep("success");
          toast.success("Email verified! You can now access your account.");
        } else {
          setStep("error");
        }
      } catch (err) {
        console.error("Verification error occurred:", err);
        setStep("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="space-y-8 text-center py-12 px-6 border border-border/40 rounded-none bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10">
        {status === "verifying" && (
          <div className="space-y-6">
            <RiLoader4Line className="w-16 h-16 text-primary mx-auto animate-spin" />
            <div className="space-y-2">
              <h2 className="text-xl font-display font-black uppercase tracking-[0.3em]">
                Verifying_Protocol
              </h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Syncing verification nodes / Please wait...
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center rounded-none rotate-45 mb-8">
              <RiCheckboxCircleLine className="w-8 h-8 -rotate-45" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-display font-black uppercase tracking-[0.3em] text-emerald-500">
                Protocol_Activated
              </h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-xs mx-auto">
                Email successfully verified. Your account is now fully
                integrated into the registry.
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: "/auth/signin" })}
              className="rounded-none font-black uppercase tracking-[0.3em] text-[10px] h-14 px-10 shadow-2xl shadow-primary/20"
            >
              Return_To_Terminal
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-destructive/10 text-destructive mx-auto flex items-center justify-center rounded-none rotate-45 mb-8">
              <RiErrorWarningLine className="w-8 h-8 -rotate-45" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-display font-black uppercase tracking-[0.3em] text-destructive">
                Link_Expired
              </h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-xs mx-auto">
                Verification token invalid or timeout occurred. Please request a
                new verification protocol.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/auth/signin" })}
              className="rounded-none font-black uppercase tracking-[0.3em] text-[10px] h-14 px-10 border-border/40"
            >
              Restart_Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
