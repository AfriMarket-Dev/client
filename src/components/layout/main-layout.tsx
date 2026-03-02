import { Outlet, useNavigate } from "@tanstack/react-router";
import { Suspense, useCallback } from "react";
import { RouteLoading } from "@/shared/components/route-loading";
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
		<div className="min-h-screen flex flex-col bg-background industrial-grain relative">
			<Header />
			<main className="flex-grow">
				<Suspense fallback={<RouteLoading />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer onAboutClick={handleAboutClick} onHelpClick={handleHelpClick} />
		</div>
	);
};
