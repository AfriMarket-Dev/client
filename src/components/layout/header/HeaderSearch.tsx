import React from "react";
import { Input } from "@/components/ui/Input";

interface HeaderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ value, onChange }) => (
  <div className="hidden md:flex flex-1 max-w-md mx-8">
    <div className="relative w-full">
      <Input
        placeholder="Search materials, equipment..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 text-sm border-2 border-border bg-muted/20 focus:bg-background focus:border-primary transition-all duration-200 rounded-sm placeholder:text-muted-foreground/70 placeholder:font-medium placeholder:uppercase placeholder:text-xs placeholder:tracking-wide font-medium"
      />
    </div>
  </div>
);
