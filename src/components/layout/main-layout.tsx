import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { useCallback } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();

  const handleAboutClick = useCallback(() => {
    navigate("/about");
  }, [navigate]);

  const handleHelpClick = useCallback(() => {
    navigate("/help");
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer onAboutClick={handleAboutClick} onHelpClick={handleHelpClick} />
    </div>
  );
};
