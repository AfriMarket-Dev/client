import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/app/store";
import { ErrorBoundary } from "@/components/layout";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./index.css";
import { Toaster } from "./components/ui/sonner";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
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
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <TooltipProvider>
              <RouterProvider router={router} />
              <Toaster />
            </TooltipProvider>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </StrictMode>,
  );
}
