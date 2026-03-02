import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface SuspenseLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SuspenseLoader: React.FC<SuspenseLoaderProps> = ({
  children,
  fallback,
}) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center min-h-[200px] w-full bg-background/50 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;
