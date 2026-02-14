import React from "react";
import { cn } from "@/lib/utils";

interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  headers,
  children,
  className,
}) => {
  return (
    <div className={cn("bg-background border-2 border-border rounded-sm overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-border bg-muted">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
};
