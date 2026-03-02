import { Outlet, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { SuspenseLoader } from "../common/suspense-loader";

export const MainLayout = () => {
  const navigate = useNavigate();

  const handleAboutClick = useCallback(() => {
    navigate({ to: "/about" });
  }, [navigate]);

  const handleHelpClick = useCallback(() => {
    navigate({ to: "/help" });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background industrial-grain relative">
      <Header />
      <main className="flex-grow">
        <SuspenseLoader>
          <Outlet />
        </SuspenseLoader>
      </main>
      <Footer onAboutClick={handleAboutClick} onHelpClick={handleHelpClick} />
    </div>
  );
};
