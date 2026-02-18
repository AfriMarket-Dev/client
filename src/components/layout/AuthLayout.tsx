import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Building, Star } from "lucide-react";
import { HeaderLogo } from "./header/HeaderLogo";

export const AuthLayout = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  if (isAuthenticated) {
    const isAdmin = user?.role === "admin" || user?.role === "agent";
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-foreground text-background overflow-hidden border-r border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Construction Site"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/50 to-foreground/30" />
        </div>

        {/* Brand */}
        <div className="relative z-10">
         <HeaderLogo/>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg mt-auto mb-20">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold uppercase mb-6 leading-tight tracking-tight">
            Build with <br />{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
              Confidence
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join the largest network of verified suppliers and contractors.
            Streamline your procurement and grow your business.
          </p>

          <div className="space-y-6 mt-10">
            {/* Testimonial Card */}
            <div className="bg-background/5 backdrop-blur-md border border-background/10 p-6 rounded-sm relative">
              <div className="flex items-center gap-1 text-primary mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-primary" />
                ))}
              </div>
              <p className="text-background italic mb-4 font-light opacity-90">
                "AfrikaMarket has completely transformed how we source
                materials. The reliability and speed are unmatched."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted/20 border border-background/20 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-background uppercase tracking-wider">
                    Jean-Paul M.
                  </div>
                  <div className="text-xs text-background/60 uppercase tracking-widest">
                    Lead Contractor
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] uppercase tracking-widest text-background/40 font-bold flex justify-between items-center">
          <span>© 2024 AfrikaMarket Systems</span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            System Operational
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 lg:p-24 bg-background">
        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
