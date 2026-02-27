import { Outlet, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export const MainLayout = () => {
	const navigate = useNavigate();

	const handleAboutClick = useCallback(() => {
		navigate({ to: "/about" });
	}, [navigate]);

	const handleHelpClick = useCallback(() => {
		navigate({ to: "/help" });
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
