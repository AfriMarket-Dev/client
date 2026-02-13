import React, { useState } from "react";
import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";

interface SignInProps {
  onBack: () => void;
  onSignInComplete: (
    type: "customer" | "supplier",
    phone: string,
    otp?: string,
  ) => void;
  onSwitchToSignUp: () => void;
  isLoading?: boolean;
  serverError?: string;
}

const SignIn: React.FC<SignInProps> = ({
  onBack,
  onSignInComplete,
  onSwitchToSignUp,
  isLoading,
  serverError,
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [lang, setLang] = useState<"en" | "rw">("en");

  const t = {
    en: {
      welcome: "Welcome Back",
      subtitle: "Sign in with your phone number",
      phoneLabel: "Phone Number",
      otpLabel: "OTP Code",
      sendOtp: "Send OTP Code",
      verify: "Verify & Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      changePhone: "Change phone number",
      resend: "Resend Code",
      otpSent: "We sent a code to",
    },
    rw: {
      welcome: "Murakaza Neza",
      subtitle: "Yinjira ukoresheje numero ya telefone",
      phoneLabel: "Numero ya Telefone",
      otpLabel: "Imibare y'ibanga (OTP)",
      sendOtp: "Ohereza OTP",
      verify: "Emeza ubone kwinjira",
      noAccount: "Ntabwo urafungura konti?",
      signUp: "Yifungure hano",
      changePhone: "Hindura numero ya telefone",
      resend: "Ohereza indi mibare",
      otpSent: "Twohereje imibare kuri",
    }
  }[lang];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep("otp");
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onSignInComplete("customer", phone, otp);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden md:flex md:w-1/2 bg-stone-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 african-pattern opacity-10 invert" />
        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-white font-display mb-2">AfrikaMarket</h1>
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Rwanda's Construction Hub</p>
          </div>
          
          <h2 className="text-5xl font-black text-white mb-8 leading-tight">
            Connecting Rwanda's <br />
            <span className="text-primary italic">Building Industry</span>
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold">Secure OTP Login</p>
                <p className="text-stone-400 text-sm">Fast and safe access with your phone number.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold">Mobile First</p>
                <p className="text-stone-400 text-sm">Optimized for search and chat on the go.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-8 right-8 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-lg font-black text-[10px] ${lang === 'rw' ? 'bg-primary/10 text-primary' : 'text-stone-400'}`}
            onClick={() => setLang('rw')}
          >
            KINYARWANDA
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-lg font-black text-[10px] ${lang === 'en' ? 'bg-primary/10 text-primary' : 'text-stone-400'}`}
            onClick={() => setLang('en')}
          >
            ENGLISH
          </Button>
        </div>

        <div className="w-full max-w-md">
          <Button variant="ghost" onClick={onBack} className="mb-8 -ml-2 text-stone-500 font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="mb-10">
            <h3 className="text-4xl font-black text-stone-900 font-display mb-2">{t.welcome}</h3>
            <p className="text-stone-500 font-medium">{t.subtitle}</p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {serverError}
            </div>
          )}

          <Card className="border-stone-200 rounded-[2rem] shadow-xl shadow-stone-200/50 overflow-hidden bg-white">
            <CardContent className="p-8 md:p-10">
              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">
                      {t.phoneLabel}
                    </label>
                    <InputGroup className="h-14 rounded-2xl border-stone-200 bg-stone-50 shadow-none focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                      <InputGroupAddon className="ps-4">
                        <div className="flex items-center gap-2 border-r border-stone-200 pe-3">
                          <img src="https://flagcdn.com/w20/rw.png" className="w-5 h-3.5 rounded-sm object-cover" alt="RW" />
                          <span className="text-sm font-black text-stone-900">+250</span>
                        </div>
                      </InputGroupAddon>
                      <InputGroupInput 
                        type="tel"
                        placeholder="788 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="font-bold text-lg"
                        required
                      />
                    </InputGroup>
                  </div>

                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 group"
                    disabled={isLoading || phone.length < 9}
                  >
                    {t.sendOtp}
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">
                      {t.otpLabel}
                    </label>
                    <Input 
                      type="text"
                      placeholder="· · · · · ·"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="h-14 rounded-2xl border-stone-200 bg-stone-50 font-black text-2xl text-center tracking-[0.5em] focus:ring-primary/10"
                      maxLength={6}
                      required
                    />
                    <div className="flex flex-col gap-1 pt-2">
                      <p className="text-xs font-bold text-stone-400 text-center">
                        {t.otpSent} <span className="text-stone-900">+250 {phone}</span>
                      </p>
                      <button 
                        type="button" 
                        onClick={() => setStep("phone")}
                        className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                      >
                        {t.changePhone}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                    disabled={isLoading || otp.length < 6}
                  >
                    {isLoading ? "..." : t.verify}
                  </Button>

                  <button 
                    type="button"
                    className="w-full text-center text-xs font-bold text-stone-500 hover:text-primary transition-colors"
                  >
                    {t.resend}
                  </button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-10 text-center">
            <p className="text-stone-500 font-medium">
              {t.noAccount}{" "}
              <button
                onClick={onSwitchToSignUp}
                className="text-primary font-black hover:underline"
              >
                {t.signUp}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
