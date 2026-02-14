import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ErrorBoundary } from "@/components/layout";
import { TooltipProvider } from "./components/ui/Tooltip";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
