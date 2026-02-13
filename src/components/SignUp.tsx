import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building,
  Check,
  ShieldCheck,
  MapPin,
  Smartphone,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface SignUpProps {
  onBack: () => void;
  onSignUpComplete: (type: "buyer" | "provider", data: any) => void;
  isLoading?: boolean;
  serverError?: string;
}

const SignUp: React.FC<SignUpProps> = ({
  onBack,
  onSignUpComplete,
  isLoading,
  serverError,
}) => {
  const [role, setRole] = useState<"buyer" | "provider" | null>(null);
  const [step, setStep] = useState<"role" | "details" | "otp">("role");
  const [lang, setLang] = useState<"en" | "rw">("en");
  
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    district: "Kigali",
    otp: "",
  });

  const t = {
    en: {
      title: "Join AfrikaMarket",
      subtitle: "Choose your role to get started",
      buyer: "Buyer",
      buyerDesc: "Find materials and services for your project.",
      provider: "Provider",
      providerDesc: "List your inventory and grow your business.",
      details: "Almost There",
      detailsSub: "Tell us a bit about yourself",
      phone: "Phone Number",
      fullName: "Full Name or Company Name",
      district: "District",
      create: "Create Account",
      verify: "Verify Phone",
      otpSent: "OTP sent to",
      finish: "Complete Registration",
    },
    rw: {
      title: "Iyandikishe kuri AfrikaMarket",
      subtitle: "Hitamo icyiciro urimo utangire",
      buyer: "Ubuguzi",
      buyerDesc: "Shaka ibikoresho n'abakozi b'umwuga.",
      provider: "Umucuruzi",
      providerDesc: "Garagaza ibyo ucuruza ubashe kwaguka.",
      details: "Hasigaye gato",
      detailsSub: "Tubwire bike kuri wowe",
      phone: "Numero ya Telefone",
      fullName: "Izina ryawe cyane ry'ubucuruzi",
      district: "Akarere",
      create: "Fungura Konti",
      verify: "Emeza Telefone",
      otpSent: "Imibare yoherejwe kuri",
      finish: "Emeza kwiyandikisha",
    }
  }[lang];

  const districts = [
    "Kigali", "Gasabo", "Kicukiro", "Nyarugenge", "Musanze", "Rubavu", "Huye", "Rwamagana", "Kayonza", "Nyagatare", "Bugesera", "Gicumbi", "Gakenke", "Burera", "Rulindo", "Muhanga", "Kamonyi", "Ruhango", "Nyanza", "Nyamagabe", "Nyaruguru", "Karongi", "Rutsiro", "Rubavu", "Nyabihu", "Ngororero", "Rusizi", "Nyamasheke"
  ];

  if (step === "role") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-8 right-8 flex items-center gap-2">
          <Button variant="ghost" size="sm" className={`rounded-lg font-black text-[10px] ${lang === 'rw' ? 'bg-primary/10 text-primary' : 'text-stone-400'}`} onClick={() => setLang('rw')}>KINYARWANDA</Button>
          <Button variant="ghost" size="sm" className={`rounded-lg font-black text-[10px] ${lang === 'en' ? 'bg-primary/10 text-primary' : 'text-stone-400'}`} onClick={() => setLang('en')}>ENGLISH</Button>
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center">
          <Button variant="ghost" onClick={onBack} className="mb-12 text-stone-500 font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 font-display mb-4 tracking-tight">{t.title}</h1>
            <p className="text-xl text-stone-500 font-medium">{t.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            {/* Buyer Card */}
            <Card 
              className={`group cursor-pointer rounded-[2.5rem] border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${role === 'buyer' ? 'border-primary bg-primary/5' : 'border-stone-200 bg-white'}`}
              onClick={() => {
                setRole('buyer');
                setTimeout(() => setStep('details'), 300);
              }}
            >
              <CardContent className="p-10 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 ${role === 'buyer' ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-stone-100 text-stone-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-stone-900 mb-4">{t.buyer}</h3>
                <p className="text-stone-500 font-medium leading-relaxed mb-8">{t.buyerDesc}</p>
                <div className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest ${role === 'buyer' ? 'text-primary' : 'text-stone-300'}`}>
                  Select Role <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            {/* Provider Card */}
            <Card 
              className={`group cursor-pointer rounded-[2.5rem] border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${role === 'provider' ? 'border-primary bg-primary/5' : 'border-stone-200 bg-white'}`}
              onClick={() => {
                setRole('provider');
                setTimeout(() => setStep('details'), 300);
              }}
            >
              <CardContent className="p-10 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 ${role === 'provider' ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-stone-100 text-stone-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                  <Building className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-stone-900 mb-4">{t.provider}</h3>
                <p className="text-stone-500 font-medium leading-relaxed mb-8">{t.providerDesc}</p>
                <div className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest ${role === 'provider' ? 'text-primary' : 'text-stone-300'}`}>
                  Select Role <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/3 bg-stone-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 african-pattern opacity-10 invert" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-12">
            <BadgeCheck className="w-4 h-4" /> 100% Rwandan Focus
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-8">
            Building the <br />
            <span className="text-primary italic text-6xl">Future of Rwanda</span>
          </h2>
          <div className="space-y-4">
            {['No hidden listing fees', 'Direct customer interaction', 'District-based logistics', 'Verified business badge'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-stone-400 font-bold">
                <Check className="w-5 h-5 text-emerald-500" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 relative">
        <div className="w-full max-w-md">
          <Button variant="ghost" onClick={() => setStep('role')} className="mb-8 -ml-2 text-stone-500 font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            Change Role
          </Button>

          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-black text-stone-900 font-display mb-2">
                {step === 'details' ? t.details : t.verify}
              </h3>
              <p className="text-stone-500 font-medium">
                {step === 'details' ? t.detailsSub : `${t.otpSent} +250 ${formData.phone}`}
              </p>
            </div>
            <Badge className="bg-stone-900 text-white border-none h-10 px-4 rounded-xl font-black text-[10px] uppercase">
              {role}
            </Badge>
          </div>

          <Card className="border-stone-200 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 bg-white overflow-hidden">
            <CardContent className="p-8 md:p-10">
              {step === 'details' ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep('otp'); }} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">{t.fullName}</label>
                    <Input 
                      placeholder={role === 'buyer' ? "e.g. Jean-Paul Habimana" : "e.g. Kigali Steel Ltd"} 
                      className="h-14 rounded-2xl border-stone-200 bg-stone-50 font-bold text-lg focus:ring-primary/10"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">{t.phone}</label>
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
                        className="font-bold text-lg"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </InputGroup>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">{t.district}</label>
                    <Select value={formData.district} onValueChange={(val) => setFormData({...formData, district: val})}>
                      <SelectTrigger className="h-14 rounded-2xl border-stone-200 bg-stone-50 font-bold text-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <SelectValue placeholder="Select District" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-2xl border-stone-100 max-h-60">
                        {districts.map(d => (
                          <SelectItem key={d} value={d} className="rounded-lg h-11 font-bold">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" size="xl" className="w-full h-16 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 group">
                    {t.create}
                    <ArrowRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); onSignUpComplete(role as any, formData); }} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1 text-center block">Enter 6-Digit Code</label>
                    <Input 
                      type="text"
                      placeholder="· · · · · ·"
                      className="h-16 rounded-2xl border-stone-200 bg-stone-50 font-black text-3xl text-center tracking-[0.5em] focus:ring-primary/10"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" size="xl" className="w-full h-16 rounded-2xl font-black text-xl shadow-xl shadow-primary/20" disabled={isLoading}>
                    {isLoading ? "..." : t.finish}
                  </Button>

                  <p className="text-center text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Didn't get the code? <button type="button" className="text-primary hover:underline">Resend</button>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          <p className="mt-12 text-center text-xs text-stone-400 font-medium leading-relaxed px-8">
            By registering, you agree to AfrikaMarket's <a href="#" className="text-stone-900 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-stone-900 font-bold hover:underline">Community Accountability Guidelines</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
