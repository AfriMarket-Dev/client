import { setupListeners } from "@reduxjs/toolkit/query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import { ErrorBoundary } from "@/components/layout/error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persistor, store } from "@/store";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./index.css";
import { Toaster } from "./components/ui/sonner";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPreloadDelay: 150,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	setupListeners(store.dispatch);
	root.render(
		<StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthBootstrap>
						<ErrorBoundary>
							<TooltipProvider>
								<RouterProvider router={router} />
								<Analytics />
								<Toaster />
							</TooltipProvider>
						</ErrorBoundary>
					</AuthBootstrap>
				</PersistGate>
			</Provider>
		</StrictMode>,
	);
}
